package com.app.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderDto {

	@JsonProperty(access =Access.READ_ONLY )
	private Long id;
	private LocalDate orderDate;
	private LocalDate arrivedDate;
	private Double totalAmount;
	private SupplierDtoWithId supplier;
	private List<OrderDetailsDto> orderDetails;
}
