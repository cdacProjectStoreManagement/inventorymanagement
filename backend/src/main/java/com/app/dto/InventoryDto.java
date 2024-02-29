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
public class InventoryDto {
	private Long storeId;
	private Long warehouseId;
	private List<InventoryDetailsDto> inventoryDetails;
}
