package com.app.controller;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ProductDto;
import com.app.dto.WarehouseDto;
import com.app.dto.WarehouseInventorydto;
import com.app.service.ProductService;
import com.app.service.WarehouseService;
@RestController
@RequestMapping("/warehouse")
@CrossOrigin
public class WarehouseController {
	
	@Autowired
	private WarehouseService warehouseService;
	
	
	@GetMapping
	public ResponseEntity<?> getAllWarehouse(){
		return ResponseEntity.ok(warehouseService.getAllWarehouse());
		
	}
	@PostMapping
	public ResponseEntity<?> addWarehouse(@RequestBody @Valid WarehouseDto Warehouse ){
		return ResponseEntity.status(201).body(warehouseService.addWarehouse(Warehouse));
	}

	@GetMapping("/{Id}")
	public ResponseEntity<?> getWarehouseById(@PathVariable @NotNull Long Id){
		return ResponseEntity.ok(warehouseService.getWarehouseById(Id));
	}
	
	@PutMapping("/{Id}")
	public ResponseEntity<?> updateWarehouse(@PathVariable Long Id,@RequestBody @Valid WarehouseDto warehouse ){
		return ResponseEntity.status(200).body(warehouseService.UpdateWarehouse(Id, warehouse));
	}
	
	@DeleteMapping("/{Id}")
	public ResponseEntity<?> removeWarehouse(@PathVariable Long Id){
		return ResponseEntity.status(200).body(warehouseService.removeWarehouse(Id));
	}

}
