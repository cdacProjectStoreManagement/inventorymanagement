package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.BillDao;
import com.app.dao.OrderDao;
import com.app.dao.ProductDao;
import com.app.dao.StoreDao;
import com.app.dao.SupplierDao;
import com.app.dao.WarehouseDao;
import com.app.dto.BillTotalSumDto;
import com.app.dto.DashboardDto;
import com.app.dto.OrderTotalSumDto;


@Service
@Transactional
public class DashboardServiceImpl implements DashboardService {
	@Autowired
	private ProductDao prodDao;
	
	@Autowired
	private SupplierDao suppDao;
	
	@Autowired
	private StoreDao storeDao;
	
	@Autowired
	private WarehouseDao warehouseDao;
	
	@Autowired
	private BillDao billDao;
	
	@Autowired
	private OrderDao orderDao;
	
	
	@Override
	public Long getCountOfProducts() {
		// TODO Auto-generated method stub
		return prodDao.countProducts();
	}

	@Override
	public Long getCountOfSuppliers() {
		// TODO Auto-generated method stub
		return suppDao.countSuppliers();
	}

	@Override
	public Long getCountOfStores() {
		
		return storeDao.countStores();
	}

	@Override
	public Long getCountOfWarehouses() {
		// TODO Auto-generated method stub
		return warehouseDao.countWarehouses();
	}

	@Override
	public Double getTotalSumOfOrders() {
		
		return orderDao.calculateTotalSum();
	}

	@Override
	public OrderTotalSumDto getTotalSumOfOrdersByWarehouseId(Long warehouseId) {
		
		return orderDao.calculateTotalSumByWarehouseId(warehouseId);
	}

	@Override
	public Double getTotalSumOfBills() {
		
		return billDao.calculateTotalSum();
	}

	@Override
	public BillTotalSumDto getTotalSumOfBillsByStoreId(Long storeId) {
		
		return billDao.calculateTotalSumByStoreId(storeId);
	}

	@Override
	public DashboardDto getDashboard() {
		
		DashboardDto dto = new DashboardDto();
		dto.setNoOfProducts(prodDao.countProducts());
		dto.setNoOfStores(storeDao.countStores());
		dto.setNoOfWarehouses(warehouseDao.countWarehouses());
		dto.setNoOfSuppliers(suppDao.countSuppliers());
		dto.setTotalSumOfBills(billDao.calculateTotalSum());
		dto.setTotalSumOfOrders(orderDao.calculateTotalSum());
		return dto;
	}


}
