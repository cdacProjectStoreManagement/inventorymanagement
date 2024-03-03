package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.SupplierDto;
import com.app.service.SupplierService;

@RestController
@RequestMapping("/supplier")
@Validated
@CrossOrigin
public class SupplierController {
	
	
	@Autowired
	private SupplierService supplierService;
	

	@GetMapping
	public ResponseEntity<?> getAllSuppliers(){
		return ResponseEntity.ok(supplierService.getAllSuppliers());
		
	}
	
	@PostMapping
	public ResponseEntity<?> addSupplier(@RequestBody SupplierDto supplier){
		return ResponseEntity.status(201).body(supplierService.addSupplier(supplier)); //created(supplierService.getAllSuppliers());
		
	}

}
