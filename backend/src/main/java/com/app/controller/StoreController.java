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

import com.app.dto.StoreDto;
import com.app.dto.StoreInventoryDto;
import com.app.dto.WarehouseDto;
import com.app.dto.WarehouseInventorydto;
import com.app.service.StoreService;
import com.app.service.WarehouseService;

@RestController
@RequestMapping("/store")
@CrossOrigin
public class StoreController {
	@Autowired
	private StoreService storeService;
	
	@GetMapping
	public ResponseEntity<?> getAllStores(){
		return ResponseEntity.ok(storeService.getAllStore());
		
	}

	@GetMapping("/inventory/{storeId}")
	public ResponseEntity<?> getAllInventories(@PathVariable Long storeId){
		return ResponseEntity.ok(storeService.getAllInventories(storeId));
	}
	
	@PostMapping
	public ResponseEntity<?> addStore(@RequestBody @Valid StoreDto store ){
		return ResponseEntity.status(201).body(storeService.addStore(store));
	}

	@GetMapping("/{Id}")
	public ResponseEntity<?> getStoreById(@PathVariable @NotNull Long Id){
		return ResponseEntity.ok(storeService.getStoreById(Id));
	}
	
	@PutMapping("/{Id}")
	public ResponseEntity<?> updateStore(@PathVariable Long Id,@RequestBody @Valid StoreDto store ){
		return ResponseEntity.status(200).body(storeService.UpdateStore(Id, store));
	}
	
	@DeleteMapping("/{Id}")
	public ResponseEntity<?> removeStore(@PathVariable Long Id){
		return ResponseEntity.status(200).body(storeService.removeStore(Id));
	}

	@PostMapping("/addinventory/{storeId}")
	public ResponseEntity<?> addWarehouseInventory(@PathVariable Long storeId, @RequestBody @Valid StoreInventoryDto stock)
	{
		return ResponseEntity.status(201).body(storeService.addInventory(storeId, stock));
	}
	
}
