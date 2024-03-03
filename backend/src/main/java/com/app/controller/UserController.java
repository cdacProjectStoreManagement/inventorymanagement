package com.app.controller;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.SigninDto;
import com.app.dto.ResponceDto;
import com.app.dto.UserDto;
import com.app.service.UserService;

@RestController
@RequestMapping("/users")
@Validated
@CrossOrigin
public class UserController {

	@Autowired
	private UserService userservice;
	
	@Autowired
	private ModelMapper mapper;
	
	@GetMapping
	ResponseEntity<?> getAllUsers() {
		
		
		return  ResponseEntity.ok(userservice.getAllUsers());
	
	}
//	@GetMapping("/signin")
//	ResponseEntity<?> getUserByEmail( @RequestBody com.app.dto.SigninDto signInDto ) {
//		
//		
//		return  ResponseEntity.ok(userservice.getUsersByEmail(signInDto));
//	
//	}
	@PostMapping("/signin")
	ResponseEntity<?> getUserByEmail( @RequestBody SigninDto signInDto){
		ResponceDto response=userservice.getUsersByEmail(signInDto);
		if(response!=null)
		return ResponseEntity.status(HttpStatus.OK).body(response);
		else
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid credentials");
	}
	
	
	@PostMapping
	ResponseEntity<?> addUser(@RequestBody @Valid UserDto userDto){
		System.out.println("user: "+userDto.toString());
		
		return ResponseEntity.status(201).body(userservice.addUser(userDto));
	}
	
	@DeleteMapping("/{id}")
	ResponseEntity<?> deleteUser(@PathVariable @NotNull Long id){
		
		return ResponseEntity.status(200).body(userservice.deleteUser(id));
	}
	
	@PostMapping("/{id}")
	ResponseEntity<?> updateUser(@PathVariable Long id , @RequestBody UserDto userDto ){
		return ResponseEntity.status(200).body(userservice.updateUser(id, userDto));
	}}
