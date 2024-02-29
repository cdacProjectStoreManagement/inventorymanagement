package com.app.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BillDetailsDto {

	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
	private ProductDtoWithId product;
	
	private Integer quantity;
	
	private Double amount;
	
//	private BillDtoWithId bill;

}
