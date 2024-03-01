package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.dto.BillTotalSumDto;
import com.app.entities.Bill;

public interface BillDao extends JpaRepository<Bill, Long> {
	@Query("SELECT SUM(b.totalAmount) FROM Bill b")
    Double calculateTotalSum();
 @Query("SELECT new com.app.dto.BillTotalSumDto(SUM(b.totalAmount)) " +
           "FROM Bill b " +
           "WHERE b.store.id = ?1")
    BillTotalSumDto calculateTotalSumByStoreId( Long storeId);

}
