package com.app.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Bill extends BaseEntity {
	@Column(nullable=false)
	private LocalDate billDate;
	
	@ManyToOne(cascade = CascadeType.ALL, targetEntity = Store.class)
	@JoinColumn(name = "store_id",nullable = false)
	private Store store;
	
	@Column(nullable=false)
	private Double totalAmount;
	
	@OneToMany(mappedBy = "bill", orphanRemoval = true, cascade = CascadeType.ALL)
	private List<BillDetails>billDetails  = new ArrayList<>();
	
	
}
