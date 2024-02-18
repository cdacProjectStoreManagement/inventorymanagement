package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Location extends BaseEntity {
//	CREATE TABLE location{
//	    location_id INT PRIMARY KEY AUTO_INCREMENT,
//	    location_name varchar(100) NOT NULL,
//	    location_address varchar(200) NOT NULL
//	}

	private String locationAddress;
	private String locationCity;
	private String locationState;
	private String locationCountry;
	private String locationPincode;
	@OneToMany(mappedBy = "location" , cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Store> stores = new ArrayList<Store>();
	
	@OneToMany(mappedBy = "location" , cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Warehouse> warehouses = new ArrayList<Warehouse>();
}
