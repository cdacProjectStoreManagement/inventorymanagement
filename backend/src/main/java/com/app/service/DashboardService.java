package com.app.service;
import com.app.dto.BillTotalSumDto;
import com.app.dto.DashboardDto;
import com.app.dto.OrderTotalSumDto;


public interface DashboardService {
	Long getCountOfProducts();

	Long getCountOfSuppliers();

	Long getCountOfStores();

	Long getCountOfWarehouses();

	Double getTotalSumOfOrders();

	OrderTotalSumDto getTotalSumOfOrdersByWarehouseId(Long warehouseId);

	Double getTotalSumOfBills();

	BillTotalSumDto getTotalSumOfBillsByStoreId(Long storeId);

	DashboardDto getDashboard();


}
