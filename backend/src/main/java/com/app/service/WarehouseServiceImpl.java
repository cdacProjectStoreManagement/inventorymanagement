package com.app.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.ProductDao;
import com.app.dao.WarehouseDao;
import com.app.dao.WarehouseInventoryDao;
import com.app.dto.ProductDto;
import com.app.dto.WarehouseDto;
import com.app.dto.WarehouseInventorydto;
import com.app.entities.Product;
import com.app.entities.Warehouse;
import com.app.entities.WarehouseInventory;
import com.app.exception_handler.custom_exception.ResourceNotFoundException;

@Service
@Transactional
public class WarehouseServiceImpl implements WarehouseService {
	
	
	@Autowired
	private WarehouseDao warehouseDao;
	@Autowired
	private ProductDao productDao;
	@Autowired
	private WarehouseInventoryDao inventoryDao;
	@Autowired
	private ModelMapper mapper;

	@Override
	public List<WarehouseDto> getAllWarehouse() {
		
		return warehouseDao.findAll()
				.stream()
				.map(warehouse -> mapper.map(warehouse, WarehouseDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public WarehouseDto addWarehouse(@Valid WarehouseDto warehouse) {
		Warehouse warehous = warehouseDao.save(mapper.map(warehouse, Warehouse.class));   //  mapper.map(productDao.save(product),Product.class );
		return mapper.map(warehous, WarehouseDto.class);
	}

	@Override
	public WarehouseDto getWarehouseById(@NotNull Long warehouseId) {
		return mapper.map(warehouseDao.getReferenceById(warehouseId), WarehouseDto.class);
	}

	@Override
	public WarehouseDto UpdateWarehouse(Long id, @Valid WarehouseDto warehouse) {
		Warehouse warehouseEntity= warehouseDao.getReferenceById(id);
		if(warehouseDao.existsById(warehouseEntity.getId())){
			warehouseEntity = mapper.map(warehouse,Warehouse.class);
			warehouseEntity.setId(id);
			warehouseEntity = warehouseDao.save(warehouseEntity);
		}
		return mapper.map( warehouseEntity, WarehouseDto.class);

	}

	@Override
	public String removeWarehouse(Long id) {
		warehouseDao.deleteById(id);
		return new String("Product Deleted with Id "+id);
	}

	
}
