package com.app.dto;



import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDto {
	
	@JsonProperty(access = Access.READ_ONLY)
	private Long id;
	
	private String name;
	
	
	private String email;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	
	
	private String role; 
	
	
	private String mobileNo;
	
	private Long bussinessId;

}
