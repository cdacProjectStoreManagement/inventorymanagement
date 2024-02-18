package com.app.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product extends BaseEntity {

	
	@Column(nullable=false)
	private Integer productCode;
	@Column(nullable=false,length=100)	
	private String productName;
	@Column(length=2000)
	private String prodcutDescription;
	@Column(nullable=false,length=100)
	private String productCategory;
	@Column(nullable=false)
	private Double costPrice;
	
	@Column(nullable = false)
	private Double sellingPrice;
	
	@Column(nullable=false)
	private Date expiryDate;
	@Column(nullable=false)
	private Date mfgDate;
	
	
	@OneToMany(mappedBy = "product" , cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProductRequest> productRequests = new ArrayList<ProductRequest>();
	
	
	@OneToMany(mappedBy = "product" , cascade = CascadeType.ALL, orphanRemoval = true)
	private List<OrderDetail> orderDetails = new ArrayList<>();
	
	@OneToMany(mappedBy = "product" , cascade = CascadeType.ALL, orphanRemoval = true)
	private List<BillDetails> billDetails = new ArrayList<>();
	
}


//product_id INT PRIMARY KEY AUTO_INCREMENT,
//product_code varchar(100) NOT NULL,
//product_name varchar(100) NOT NULL,
//product_description varchar(2000),
//product_category varchar(100) NOT NULL,
//product_price FLOAT NOT NULL,
//expiry_date varchar(10) NOT NULL,
//mfg_date varchar(10) NO NULL,
//packed_weight DECIMAL(10,2),
//packed_height DECIMAL(10,2),
//packed_width DECIMAL(10,2),
//packed_depth DECIMAL(10,2),
//refrigerated TINYINT DEFAULT 0
//@Column(length=30)
//Integer productId;