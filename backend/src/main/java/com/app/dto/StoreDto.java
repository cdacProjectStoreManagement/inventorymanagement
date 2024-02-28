package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class StoreDto {
	@JsonProperty( access = Access.READ_ONLY)
	private Long id;
	private String storeName;
	private String locationAddress;
	private String locationCity;
	private String locationState;
	private String locationCountry;
	private String locationPincode;
	
}
