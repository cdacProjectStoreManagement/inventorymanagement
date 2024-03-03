package com.app.service;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.BillDao;
import com.app.dao.BillDetailsDao;
import com.app.dao.ProductDao;
import com.app.dao.StoreDao;
import com.app.dao.StoreInventoryDao;
import com.app.dto.BillDto;
import com.app.entities.Bill;
import com.app.entities.BillDetails;
import com.app.entities.Product;
import com.app.entities.Store;
import com.app.entities.StoreInventory;
import com.app.exception_handler.custom_exception.ResourceNotFoundException;

@Service
@Transactional
public class BillServiceImpl implements BillService {
	@Autowired
	private BillDao billDao;
	
	@Autowired
	private BillDetailsDao billDetailsDao;
	@Autowired
	private StoreInventoryDao inventoryDao;
	
	@Autowired
	private StoreDao storeDao;
	
	@Autowired
	private ProductDao productDao;
	@Autowired
	private ModelMapper mapper;

	@Override
	public List<BillDto> getAllOrders(Long storeId) {
		Store store = storeDao.findById(storeId).orElseThrow(()-> new ResourceNotFoundException("Store not found"));
		List<Bill> orders= store.getBills();
		return orders
				.stream()
				.map(order -> mapper.map(order, BillDto.class))
				.collect(Collectors.toList());
	}
	@Transactional
	@Override
	public BillDto addBill(Long storeId, BillDto billDto) {
	    Store store = storeDao.findById(storeId).orElseThrow(() -> new ResourceNotFoundException("Store not found."));

	    Bill bill = mapper.map(billDto, Bill.class);
	    bill.setStore(store);

	    List<BillDetails> billDetails = billDto.getBillDetails().stream()
	            .map(billDetailDto -> {
	                BillDetails billDetail = mapper.map(billDetailDto, BillDetails.class);
	                billDetail.setProduct(productDao.findById(billDetail.getProduct().getId())
	                        .orElseThrow(() -> new ResourceNotFoundException("Invalid Product.")));
	                billDetail.setBill(bill);
	                return billDetail;
	            })
	            .collect(Collectors.toList());

	    bill.setBillDetails(billDetails);

	    // Create a copy of the list to avoid ConcurrentModificationException
	    List<BillDetails> billDetailsCopy = new CopyOnWriteArrayList<>(billDetails);

	    try {
	        // Save the copy of the list to avoid ConcurrentModificationException
	        List<BillDetails> savedBillDetails = billDetailsDao.saveAll(billDetailsCopy);

	        // Further processing if needed

	        // Update store inventory
	        for (BillDetails savedBillDetail : savedBillDetails) {
	        	StoreInventory storeInventory = inventoryDao.findStoreInventoryByProductAndStore(store, savedBillDetail.getProduct());

	        	if (storeInventory != null) {
	        	    storeInventory.setQuantity(storeInventory.getQuantity() - savedBillDetail.getQuantity());
	        	    inventoryDao.save(storeInventory);
	        	} else {
	        	    // Handle the case where storeInventory is null (e.g., log a warning)
	        	    // Depending on your business logic, you might want to throw an exception or take appropriate action.
	        	    System.out.println("Warning: StoreInventory not found for product: " + savedBillDetail.getProduct().getId());
	        	}

	        }

	        return mapper.map(billDao.save(bill), BillDto.class);

	    } catch (Exception e) {
	        // Handle the exception (e.g., log it, throw a custom exception)
	        e.printStackTrace(); // Use a proper logging mechanism in a production environment
	        throw new RuntimeException("Error adding bill", e);
	    }
	}

}
