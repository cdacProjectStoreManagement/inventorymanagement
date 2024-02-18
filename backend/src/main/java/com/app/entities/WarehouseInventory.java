package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class WarehouseInventory extends BaseEntity {

	@Column(nullable = false)
	private Integer quantity;
	@Column(nullable = false)
	private Integer minimumStockLevel;
	@Column(nullable = false)
	private Integer maximumStockLevel;
	@Column(nullable = false)
	private Integer reOrderLimit;
	@OneToOne     //(cascade = CascadeType.ALL , targetEntity = Product.class)
	@JoinColumn(name = "product_id", nullable = false)
	@MapsId
	private Product product;
}
