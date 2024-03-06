package com.app.exception_handler.custom_exception;

public class ApiException extends RuntimeException{
	public ApiException(String mesg) {
		super(mesg);
	}

}
