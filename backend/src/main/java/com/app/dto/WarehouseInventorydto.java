package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class WarehouseInventorydto {
	private Integer quantity;
	private Integer minimumStockLevel;
	private Integer maximumStockLevel;
	private Integer reOrderLimit;
	private ProductDtoWithId product;
}
 	