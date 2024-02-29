package com.app.dto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DashboardDto {
	private long noOfSuppliers = 0;
	private long noOfProducts= 0;
	private long noOfStores = 0;
	private long noOfWarehouses = 0;
	private Double totalSumOfBills = 0.0;
	private Double totalSumOfOrders = 0.0;

}
