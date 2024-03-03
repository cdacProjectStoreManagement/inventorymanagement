package com.app.service;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.app.dto.ProductDto;



public interface ProductService {

	List<ProductDto> getAllProducts();

	ProductDto addProduct(@Valid ProductDto product);
	
	ProductDto getProductById(@NotNull Long productId);

	ProductDto UpdateProduct(Long id, @Valid ProductDto product);

	String removeProduct(Long id);

	
}
