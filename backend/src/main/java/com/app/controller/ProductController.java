package com.app.controller;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.app.dto.ProductDto;
import com.app.service.ProductService;



@RestController
@RequestMapping("/product")
@CrossOrigin
public class ProductController {
	@Autowired
	private ProductService productService;
	
	
	@GetMapping
	public ResponseEntity<?> getAllProducts(){
		return ResponseEntity.ok(productService.getAllProducts());
		
	}

	
	@PostMapping
	public ResponseEntity<?> addProduct(@RequestBody @Valid ProductDto product ){
		return ResponseEntity.status(201).body(productService.addProduct(product));
	}

	@GetMapping("/{Id}")
	public ResponseEntity<?> getProductById(@PathVariable @NotNull Long Id){
		return ResponseEntity.ok(productService.getProductById(Id));
	}
	
	@PutMapping("/{Id}")
	public ResponseEntity<?> updateProduct(@PathVariable Long Id,@RequestBody @Valid ProductDto product ){
		return ResponseEntity.status(200).body(productService.UpdateProduct(Id, product));
	}
	
	@DeleteMapping("/{Id}")
	public ResponseEntity<?> removeProduct(@PathVariable Long Id){
		return ResponseEntity.status(200).body(productService.removeProduct(Id));
	}
	
}
