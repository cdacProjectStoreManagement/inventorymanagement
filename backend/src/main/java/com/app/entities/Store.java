package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Store extends BaseEntity {

	@Column(nullable=false,length=100)
	private String storeName;

	@OneToMany(mappedBy = "store" , cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProductRequest> productRequest = new ArrayList<ProductRequest>();
	
	@ManyToOne(cascade = CascadeType.ALL , targetEntity = Location.class)
	@JoinColumn(name = "location_id", nullable = false)
	private Integer location;
	
	@OneToMany(mappedBy = "store" , cascade = CascadeType.ALL, orphanRemoval = true)
	private List<StoreInventory> storeInventory = new ArrayList<StoreInventory>();
	
	
	@ManyToMany
	@JoinTable(name = "store_warehouse", joinColumns = @JoinColumn(name ="store_id"),
		inverseJoinColumns = @JoinColumn(name ="warehouse_id"))
	private List<Warehouse> warehouses = new ArrayList<Warehouse>();
	
	@OneToMany(mappedBy = "store", orphanRemoval = true, cascade = CascadeType.ALL)
	private List<Bill>bills  = new ArrayList<>();
}


//CREATE TABLE store{
//store_id INT PRIMARY KEY AUTO_INCREMENT,
//store_name varchar(100) NOT NULL,
//store_address varchar(200) NOT NULL,
//store_manager varchar(30) NOT NULL,
//is_refrigerated TINYINT DEFAULT 0,
//location_id INT NOT NULL,
//CONSTRAINT FK_location_id FOREIGN KEY (location_id)
//REFERENCES location(location_id) ON UPDATE CASCADE
//}