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
public class Supplier extends BaseEntity {
//	CREATE TABLE supplier{
//	    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
//	    supplier_name varchar(100) NOT NULL,
//	    supplier_address varchar(200) NOT NULL,
//		supplier_contact varchar(10) NOT NULL,
//    	company varchar(100);	
//		}
	@Column(nullable=false,length=30)
	private String supplierName;
	@Column(nullable=false,length=100)
	private String supplierAddress;
	@Column(nullable=false,length=10)
	private String supplierContact;
	@Column(length=100)
	private String company;
	
	@OneToMany(mappedBy = "supplier" , cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderEntity> orderList = new ArrayList<>();
	
	
	public void addorder(OrderEntity orederEntity)
	{
		orderList.add(orederEntity);
		orederEntity.setSupplier(this);
	}
	public void removeorder(OrderEntity orederEntity)
	{
		orderList.remove(orederEntity);
		orederEntity.setSupplier(null);
	}
}
