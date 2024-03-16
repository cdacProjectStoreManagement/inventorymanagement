package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.ProductDao;
import com.app.dao.StoreDao;
import com.app.dao.StoreInventoryDao;
import com.app.dto.StoreDto;
import com.app.dto.StoreInventoryDto;
import com.app.dto.WarehouseDto;
import com.app.dto.WarehouseInventorydto;
import com.app.entities.Product;
import com.app.entities.Store;
import com.app.entities.StoreInventory;
import com.app.entities.Warehouse;
import com.app.entities.WarehouseInventory;
import com.app.exception_handler.custom_exception.ResourceNotFoundException;

@Service
@Transactional
public class StoreServiceImpl implements StoreService{
	@Autowired
	private StoreDao storeDao;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private ProductDao productDao;
	@Autowired
	private StoreInventoryDao invnetoryDao;

	@Override
	public List<StoreDto> getAllStore() {
		
		return storeDao.findAll()
				.stream()
				.map(store -> mapper.map(store, StoreDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public StoreDto addStore(@Valid StoreDto store) {
		Store storeEntity = storeDao.save(mapper.map(store, Store.class));   //  mapper.map(productDao.save(product),Product.class );
		return mapper.map(storeEntity, StoreDto.class);
	}

	@Override
	public StoreDto getStoreById(@NotNull Long storeId) {
		return mapper.map(storeDao.getReferenceById(storeId), StoreDto.class);
	}

	@Override
	public StoreDto UpdateStore(Long id, @Valid StoreDto store) {
		Store storeEntity= storeDao.getReferenceById(id);
		if(storeDao.existsById(storeEntity.getId())){
			storeEntity = mapper.map(store, Store.class);
			storeEntity.setId(id);
			storeEntity = storeDao.save(storeEntity);
		}
		return mapper.map( storeEntity, StoreDto.class);
	}

	@Override
	public String removeStore(Long id) {
		storeDao.deleteById(id);
		return new String("Product Deleted with Id "+id);
	}

	@Override
	public StoreInventoryDto addInventory(Long storeId, StoreInventoryDto stock) {
		try {
            System.out.println("stock in service" + stock.toString());
            Product product = productDao.findById(stock.getProduct().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
           
            Store store = storeDao.findById(storeId)
                    .orElseThrow(() -> new ResourceNotFoundException("Store not found"));
           
            StoreInventory storeInventory = mapper.map(stock, StoreInventory.class);
            storeInventory.setStore(store);
            storeInventory.setProduct(product);
            storeInventory =invnetoryDao.save(storeInventory);
            store.addInventory(storeInventory);
            return mapper.map(storeInventory, StoreInventoryDto.class);
        } catch (Exception e) {
            // Log the exception
            throw new ResourceNotFoundException("Error adding inventory:"+e.getMessage());
        }
	}

	@Override
	public List<StoreInventoryDto> getAllInventories(Long storeId) {
		Store store=storeDao.findById(storeId).orElseThrow(()-> new ResourceNotFoundException("store not found."));
		List<StoreInventory> storeInventories= store.getStoreInventory();
		return storeInventories.stream().map(storeInventory -> mapper.map(storeInventory, StoreInventoryDto.class)).collect(Collectors.toList());
	}
	
	
}
