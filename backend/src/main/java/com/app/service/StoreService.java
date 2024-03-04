package com.app.service;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.app.dto.StoreDto;
import com.app.dto.StoreInventoryDto;
import com.app.dto.WarehouseDto;

public interface StoreService {
	List<StoreDto> getAllStore();

	StoreDto addStore(@Valid StoreDto store);
	
	
	List<StoreInventoryDto> getAllInventories(Long storeId);
	
	StoreInventoryDto addInventory(Long storeId,StoreInventoryDto stock);
	
	StoreDto getStoreById(@NotNull Long storeId);

	StoreDto UpdateStore(Long id, @Valid StoreDto store);

	String removeStore(Long id);

}
