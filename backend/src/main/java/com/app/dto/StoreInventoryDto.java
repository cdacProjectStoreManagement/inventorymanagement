package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StoreInventoryDto {
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	private Integer quantity;
	private Integer minimumStockLevel;
	private Integer maximumStockLevel;
	private Integer reRequestLimit;
	private ProductDtoWithId product;

}
