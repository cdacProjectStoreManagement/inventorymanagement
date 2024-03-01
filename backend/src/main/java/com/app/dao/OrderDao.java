package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.dto.OrderTotalSumDto;
import com.app.entities.OrderEntity;

public interface OrderDao extends JpaRepository<OrderEntity, Long>{
//	@Query("select o from OrderEntity o left join fetch o.OrderDetail where o.id=?1")
//	OrderEntity getOrderAndOrderDetails(Long orderId);

	@Query("SELECT SUM(o.totalAmount) FROM OrderEntity o")
    Double calculateTotalSum();
	
	 @Query("SELECT new com.app.dto.OrderTotalSumDto(SUM(o.totalAmount)) " +
	           "FROM OrderEntity o " +
	           "WHERE o.warehouse.id = ?1")
	    OrderTotalSumDto calculateTotalSumByWarehouseId( Long warehouseId);
	
}
