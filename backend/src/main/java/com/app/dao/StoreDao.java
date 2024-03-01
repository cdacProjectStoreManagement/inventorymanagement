package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Store;

public interface StoreDao extends JpaRepository<Store, Long>{
	 @Query("SELECT COUNT(s) FROM Store s")
	    Long countStores();

}
