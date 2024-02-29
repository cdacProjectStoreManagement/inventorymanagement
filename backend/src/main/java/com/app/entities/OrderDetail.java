package com.app.entities;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter 
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetail extends BaseEntity {

	@Column(nullable=false)
	private Integer orderQuantity;
	@Column(nullable=false)
	private Double amount;
	
	
	@ManyToOne(cascade = CascadeType.ALL , targetEntity = OrderEntity.class)
	@JoinColumn(name = "order_id", nullable = false)
	private OrderEntity order;
	
	@ManyToOne(cascade = CascadeType.ALL , targetEntity = Product.class)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;
	
	
}

//CREATE TABLE order_detail{
//order_detail_id INT PRIMARY KEY AUTO_INCREMENT,
//order_quantity INT NOT NULL,
//expected_date varchar(10) NO NULL,
//actual_date varchar(10) NO NULL,
//order_id INT NOT NULL,
//product_id INT NOT NULL,
//CONSTRAINT FK_order_id FOREIGN KEY (order_id)
//REFERENCES order(order_id),
//CONSTRAINT FK_product_id FOREIGN KEY (product_id)
//REFERENCES product(product_id)
//}
