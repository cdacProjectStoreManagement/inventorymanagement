package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Product;
import com.app.entities.Warehouse;
import com.app.entities.WarehouseInventory;

public interface WarehouseInventoryDao extends JpaRepository<WarehouseInventory, Long> {
	@Query("SELECT w FROM WarehouseInventory w WHERE w.warehouse = ?1 AND w.product = ?2")
	WarehouseInventory findWarehouseByProductAndStore(Warehouse warehouse, Product product);

}
