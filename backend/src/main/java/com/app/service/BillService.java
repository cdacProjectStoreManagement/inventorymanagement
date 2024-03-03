package com.app.service;
import java.util.List;

import com.app.dto.BillDto;


public interface BillService {
	List<BillDto> getAllOrders(Long storeId);

	BillDto addBill(Long storeId, BillDto bill);

}
