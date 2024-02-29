package com.app.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InventoryDetailsDto {
	private ProductDtoWithId produt;
	private Integer quantity;
	

}
