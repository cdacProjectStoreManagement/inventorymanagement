package com.app.entities;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "store_inventory")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class StoreInventory extends BaseEntity{

	@Column(nullable = false)
	private Integer quantity;
	
	@Column(nullable = false)
	private Integer minimumStockLevel;
	@Column(nullable = false)
	private Integer maximumStockLevel;
	@Column(nullable = false)
	private Integer reRequestLimit;
	
	@ManyToOne(cascade = CascadeType.ALL , targetEntity = Store.class)
	@JoinColumn(name = "store_id", nullable = false)
	private Store store;
	
	
	@OneToOne     //(cascade = CascadeType.ALL , targetEntity = Product.class)
	@JoinColumn(name = "product_id", nullable = false)
	@MapsId
	private Product product;
	
	
}
