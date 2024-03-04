package com.app.service;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.app.dto.ProductDto;
import com.app.dto.WarehouseDto;
import com.app.dto.WarehouseInventorydto;

public interface WarehouseService {
	List<WarehouseDto> getAllWarehouse();
	WarehouseDto addWarehouse(@Valid WarehouseDto warehouse);
	
	WarehouseDto getWarehouseById(@NotNull Long warehouseId);

	WarehouseDto UpdateWarehouse(Long id, @Valid WarehouseDto warehouse);

	String removeWarehouse(Long id);

}
