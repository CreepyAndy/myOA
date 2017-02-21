package com.andyxia.myoa.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/login")
public class LoginController {
	@RequestMapping(value="",method=RequestMethod.POST)
	public String login(){
		return "/";
	}
}
