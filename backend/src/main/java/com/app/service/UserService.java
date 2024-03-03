package com.app.service;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import com.app.dao.SigninDto;
import com.app.dto.ResponceDto;
import com.app.dto.UserDto;

public interface UserService {

	List<UserDto>getAllUsers();

	UserDto addUser(@Valid UserDto userDto);

	String deleteUser(@NotNull Long id);

	UserDto updateUser(Long id, UserDto userDto);

	ResponceDto getUsersByEmail(SigninDto sDto);

}
