package com.app.dto;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BillTotalSumDto {
	private Double totalSum;

    public BillTotalSumDto(Double totalSum) {
        this.totalSum = totalSum;
    }

}
