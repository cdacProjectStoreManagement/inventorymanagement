package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.app.dao.ProductDao;
import com.app.dto.ProductDto;
import com.app.entities.Product;


@Service
@Transactional
public  class ProductSeviceImpl implements ProductService{
	@Autowired
	private ProductDao productDao;

	@Autowired
	private ModelMapper mapper;
	
	@Override
	public List<ProductDto> getAllProducts() {
		
		return productDao.findAll()
				.stream()
				.map(product -> mapper.map(product, ProductDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public ProductDto addProduct(@Valid ProductDto product) {
		Product prod = productDao.save(mapper.map(product, Product.class));   //  mapper.map(productDao.save(product),Product.class );
		return mapper.map(prod, ProductDto.class);
	}

	@Override
	public ProductDto getProductById(@NotNull Long productId) {
		// TODO Auto-generated method stub
		return mapper.map(productDao.getReferenceById(productId), ProductDto.class);
	}

	

	@Override
	public ProductDto UpdateProduct( Long id, @Valid ProductDto product) {
		Product prod = productDao.getReferenceById(id);
		if(productDao.existsById(prod.getId())){
			prod = mapper.map(product,Product.class);
			prod.setId(id);
		   prod = productDao.save(prod);
		}
		return mapper.map( prod, ProductDto.class);
	}

	@Override
	public String removeProduct(@NotNull Long id) {
		
		productDao.deleteById(id);
		return new String("Product Deleted with Id "+id);
	}

	

	
	
	
	



}
