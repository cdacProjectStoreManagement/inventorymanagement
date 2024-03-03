package com.app.controller;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.app.dto.BillDto;
import com.app.service.BillService;

@RestController
@RequestMapping("/bill")
@CrossOrigin
public class BillController {
	@Autowired
	private BillService billService;
	
	@GetMapping("/{storeId}")
	public ResponseEntity<?> getAllOrders(@PathVariable Long storeId){
		return ResponseEntity.ok(billService.getAllOrders(storeId));	
	}
	
	@PostMapping("/{storeId}")
	public ResponseEntity<?> addOrder(@PathVariable Long storeId, @RequestBody BillDto bill ){
		System.out.println("Store Id: "+storeId +"bill dto = "+bill);
		bill.setBillDate(LocalDate.now());
		return ResponseEntity.status(201).body(billService.addBill(storeId, bill));
	}

}
