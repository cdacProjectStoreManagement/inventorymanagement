package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Product;
import com.app.entities.Store;
import com.app.entities.StoreInventory;

public interface StoreInventoryDao extends JpaRepository<StoreInventory, Long> {

	@Query("SELECT w FROM StoreInventory w WHERE w.store = ?1 AND w.product = ?2")
	StoreInventory findStoreInventoryByProductAndStore(Store store, Product product);

}
