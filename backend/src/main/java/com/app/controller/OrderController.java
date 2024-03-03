package com.app.controller;

import javax.lang.model.util.Elements.Origin;
import javax.validation.Valid;

import org.hibernate.validator.internal.metadata.core.ConstraintOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.OrderDto;
import com.app.dto.ProductDto;
import com.app.service.OrderService;

@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {
	@Autowired
	private OrderService orderService;
	
	@GetMapping("/{warehouseId}")
	public ResponseEntity<?> getAllOrders(@PathVariable Long warehouseId){
		return ResponseEntity.ok(orderService.getAllOrders(warehouseId));
		
	}
	@PostMapping("/{warehouseId}")
	public ResponseEntity<?> addOrder(@PathVariable Long warehouseId, @RequestBody OrderDto order ){
		System.out.println("warehouse Id: "+warehouseId +"order dto = "+order);
		
		return ResponseEntity.status(201).body(orderService.addOrder(warehouseId, order));
	}

}
