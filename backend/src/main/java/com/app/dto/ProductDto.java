package com.app.dto;

import java.time.LocalDate;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductDto {
	
	@JsonProperty( access = Access.READ_ONLY)
	private Long id;
	
	private Integer productCode;
	
	private String productName;
	
	private String prodcutDescription;
	
	private String productCategory;
	
	private Double costPrice;
	
	
	private Double sellingPrice;
	
	
	private Date expiryDate;
	
	private Date mfgDate;

}
