package com.app.entities;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class User extends BaseEntity{
	@Column(nullable = false , length = 40)
	private String name;
	
	@Column(nullable = false , length = 40)
	private String email;
	
	@Column(nullable = false , length = 40)
	private String password;
	
	@Enumerated(EnumType.STRING)
	private Role role; 
	
	@Column(nullable = false )
	private Long mobileNo;

}
