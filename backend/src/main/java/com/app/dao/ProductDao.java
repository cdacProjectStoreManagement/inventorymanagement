package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Product;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Product;

public interface ProductDao extends JpaRepository<Product, Long>{
	@Query("SELECT COUNT(p) FROM com.app.entities.Product p")
	Long countProducts();

}
