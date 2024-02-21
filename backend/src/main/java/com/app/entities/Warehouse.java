package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
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
@AllArgsConstructor
@NoArgsConstructor
public class Warehouse extends BaseEntity {


	@Column(nullable=false,length=100)
	private String warehouseName;
	@Column
	private String locationAddress;
	@Column
	private String locationCity;
	@Column
	private String locationState;
	@Column
	private String locationCountry;
	@Column
	private String locationPincode;
	
	
	@OneToMany(mappedBy = "warehouse" , cascade = CascadeType.ALL, orphanRemoval = true)
	private List<WarehouseInventory> warehouseInventory = new ArrayList<WarehouseInventory>();

	
	@ManyToMany(mappedBy = "warehouses")
	private List<Store> stores = new ArrayList<Store>();
	
	@OneToMany(mappedBy = "warehouse" , cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderEntity> orderList = new ArrayList<>();
	
	
}



//CREATE TABLE warehouse{
//warehouse_id INT PRIMARY KEY AUTO_INCREMENT,
//warehouse_name varchar(100) NOT NULL,
//is_refrigerated TINYINT DEFAULT 0,
//location_id INT NOT NULL,
//order_detail_id INT NOT NULL,
//CONSTRAINT FK_order_detail_id FOREIGN KEY (order_detail_id)
//REFERENCES order_detail(order_detail_id) ON UPDATE CASCADE
//CONSTRAINT FK_location_id FOREIGN KEY (location_id)
//REFERENCES location(location_id) ON UPDATE CASCADE
//}