package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Supplier;

public interface SupplierDao extends JpaRepository<Supplier, Long> {

	 @Query("SELECT COUNT(s) FROM Supplier s")
	    Long countSuppliers();
}
