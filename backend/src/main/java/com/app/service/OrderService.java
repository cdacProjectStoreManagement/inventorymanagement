package com.app.service;

import java.util.List;

import com.app.dto.OrderDto;

public interface OrderService {
	List<OrderDto> getAllOrders(Long warehouseId);
	OrderDto addOrder(Long warehouseId, OrderDto order);
	//OrderWithOrderDetailsDto getOrderAndOrderDetails(Long orderId);

}
