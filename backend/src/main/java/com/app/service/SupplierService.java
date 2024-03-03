package com.app.service;

import java.net.URI;
import java.util.List;

import com.app.dto.SupplierDto;

public interface SupplierService {

	List<SupplierDto> getAllSuppliers();

	SupplierDto addSupplier(SupplierDto supplier);

}
