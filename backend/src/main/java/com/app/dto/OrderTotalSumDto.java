package com.app.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderTotalSumDto {
	private Double totalSum;

    public OrderTotalSumDto(Double totalSum) {
        this.totalSum = totalSum;
    }

}
