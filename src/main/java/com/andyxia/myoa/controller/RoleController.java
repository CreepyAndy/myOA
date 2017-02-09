package com.andyxia.myoa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import com.andyxia.myoa.domain.Employee;
import com.andyxia.myoa.service.EmployeeService;

@Controller
@RequestMapping("/role")
public class RoleController {

	@RequestMapping("/index")
	public String index(){
		return "/security/role/role_list";
	}

}
