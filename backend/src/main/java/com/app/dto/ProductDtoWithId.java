package com.app.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductDtoWithId {
	private Long id;
	@JsonProperty(access = Access.READ_ONLY)
	private Integer productCode;
	@JsonProperty(access = Access.READ_ONLY)
	private String productName;

}
