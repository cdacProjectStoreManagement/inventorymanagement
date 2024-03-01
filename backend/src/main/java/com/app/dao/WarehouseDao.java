package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Warehouse;

public interface WarehouseDao extends JpaRepository<Warehouse, Long>{

	@Query("SELECT COUNT(w) FROM Warehouse w")
    Long countWarehouses();
}
