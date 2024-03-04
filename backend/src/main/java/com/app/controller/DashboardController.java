package com.app.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.DashboardService;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin
public class DashboardController {

	@Autowired
	private DashboardService dashboardService;
	
	@GetMapping
	ResponseEntity<?> getDashboard(){
		return ResponseEntity.ok(dashboardService.getDashboard());
	}
	@GetMapping("/countOfProducts")
	ResponseEntity<?> getCountOfProducts(){
		return ResponseEntity.ok(dashboardService.getCountOfProducts());
	}
	
	@GetMapping("/countOfSuppliers")
	ResponseEntity<?> getCountOfSuppliers(){
		return ResponseEntity.ok(dashboardService.getCountOfSuppliers());
	}
	
	@GetMapping("/countOfStores")
	ResponseEntity<?> getCountOfStores(){
		return ResponseEntity.ok(dashboardService.getCountOfStores());
	}
	
	@GetMapping("/countOfWarehouses")
	ResponseEntity<?> getCountOfWarehouses(){
		return ResponseEntity.ok(dashboardService.getCountOfWarehouses());
	}
	
	@GetMapping("/totalSumOfOrders")
	ResponseEntity<?> getTotalSumOfOrders(){
		return ResponseEntity.ok(dashboardService.getTotalSumOfOrders());
	}
	
	@GetMapping("/totalSumOfOrders/{warehouseId}")
	ResponseEntity<?> getTotalSumOfOrdersByWarehouseId(@PathVariable Long warehouseId){
		return ResponseEntity.ok(dashboardService.getTotalSumOfOrdersByWarehouseId(warehouseId));
	}
	
	@GetMapping("/totalSumOfBills")
	ResponseEntity<?> getTotalSumOfBills(){
		return ResponseEntity.ok(dashboardService.getTotalSumOfBills());
	}
	@GetMapping("/totalSumOfBills/{storeId}")
	ResponseEntity<?> getTotalSumOfBillsByStoreId(@PathVariable Long storeId){
		return ResponseEntity.ok(dashboardService.getTotalSumOfBillsByStoreId(storeId));
	}

}
