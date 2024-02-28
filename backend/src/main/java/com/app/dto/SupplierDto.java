package com.app.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SupplierDto {
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
	private String supplierName;
	@Size(min = 50, max = 200, message = "Address SHould be of Min 50 length character to Max 200 charactor!!!")
	private String supplierAddress;
	@Min(value = 10)
	private String supplierContact;
	
	private String company;
}
