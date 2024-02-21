package com.app.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderEntity extends BaseEntity {

	@Column(nullable=false)
	private LocalDate orderDate;
	private LocalDate arrivedDate;
	@Column(nullable=false)
	private Double totalAmount;
	
	@ManyToOne(cascade = CascadeType.MERGE,targetEntity = Supplier.class)
	@JoinColumn(name = "supplier_id",nullable = false)
	private Supplier supplier;
	
	@OneToMany(mappedBy = "order" , cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderDetail> orderDetails = new ArrayList<>();
	
	@ManyToOne(cascade = CascadeType.MERGE,targetEntity = Warehouse.class)
	@JoinColumn(name = "warehouse_id",nullable = false)
	private Warehouse warehouse;
	
	
	public void addOrderDetails(List<OrderDetail> orderDetails)
	{
		this.orderDetails = orderDetails.stream()
				.peek(orderDetail -> orderDetail.setOrder(this))
	            .collect(Collectors.toList());
	}
	public void removeOrederDetails(OrderDetail oerderDetail)
	{
		orderDetails.remove(oerderDetail);
		oerderDetail.setOrder(null);
	}
}


//CREATE TABLE order{
//order_id INT PRIMARY KEY AUTO_INCREMENT,
//order_date varchar(10) NO NULL,
//supplier_id INT NOT NULL,
//CONSTRAINT FK_supplier_id FOREIGN KEY (supplier_id)
//REFERENCES supplier(supplier_id) 
//}