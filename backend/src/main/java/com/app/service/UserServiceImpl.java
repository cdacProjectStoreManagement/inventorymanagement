package com.app.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.SigninDto;
import com.app.dao.UserDao;
import com.app.dto.ResponceDto;
import com.app.dto.SupplierDto;
import com.app.dto.UserDto;
import com.app.entities.User;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public List<UserDto> getAllUsers() {
		
		return userDao.findAll()
				.stream()
				.map(user -> mapper.map(user, UserDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public UserDto addUser(@Valid UserDto userDto) {
		User user = userDao.save(mapper.map(userDto, User.class));
		return mapper.map(user, UserDto.class);
	}

	@Override
	public String deleteUser(@NotNull Long id) {
		
		userDao.deleteById(id);
		
		return new String("User Removed with Id"+ id);
	}

	@Override
	public UserDto updateUser(Long id, UserDto userDto) {
		User user = userDao.getReferenceById(id);
		
		if(userDao.existsById(user.getId())) {
			user = mapper.map(userDto, User.class);
			user.setId(id);
		    user =userDao.save(user);
		}
		return mapper.map(user, UserDto.class);
	}
	
	@Override
	public ResponceDto getUsersByEmail(SigninDto sDto) {
		User user=userDao.findByEmail(sDto.getEmail()).orElse(null);
		System.out.println(user.getName());
		if(user==null || !(user.getPassword().equals(sDto.getPassword()))) {
			System.out.println(sDto.getPassword());
			System.out.println(user.getPassword());
			return null;
		}
		ResponceDto responceDto = new ResponceDto();
		responceDto.setUser( mapper.map(user, UserDto.class));
		return responceDto;
	}
	
	

	
}
