package com.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderDetailsDto {

	private ProductDtoWithId product;
	
	private Integer orderQuantity;
	
	private Double amount;
}
