package com.app.entities;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BillDetails extends BaseEntity {
	@Column(nullable=false)
	private Integer quantity;
	@Column(nullable=false)
	private Double amount;
	
	@ManyToOne(cascade = CascadeType.ALL, targetEntity = Bill.class)
	@JoinColumn(name = "bill_id",nullable = false)
	private Bill bill;
	
	@ManyToOne(cascade = CascadeType.ALL, targetEntity = Product.class)
	@JoinColumn(name = "product_id",nullable = false)
	private Product product;

}
