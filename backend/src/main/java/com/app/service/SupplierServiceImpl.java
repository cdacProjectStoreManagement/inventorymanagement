package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.SupplierDao;
import com.app.dto.SupplierDto;
import com.app.entities.Supplier;

@Service
@Transactional
public class SupplierServiceImpl implements SupplierService {

	
	
	@Autowired
	private SupplierDao supplierDao;
	
	@Autowired
	private ModelMapper mapper;

	
	@Override
	public List<SupplierDto> getAllSuppliers() {
		
		
		return supplierDao.findAll()
				.stream()
				.map(supplier -> mapper.map(supplier, SupplierDto.class))
				.collect(Collectors.toList());
	}

	

	@Override
	public SupplierDto addSupplier(SupplierDto supplier) {
		Supplier supp = supplierDao.save(mapper.map(supplier, Supplier.class));
		return mapper.map(supp, SupplierDto.class);
	}
	
	

}
