package com.andyxia.myoa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.andyxia.myoa.common.AjaxResult;
import com.andyxia.myoa.domain.Employee;
import com.andyxia.myoa.service.EmployeeService;

@Controller
@RequestMapping("/user")
public class EmployeeController {
//	@Autowired
	EmployeeService eService;
	@RequestMapping(value="/addOrEditEmployee",method=RequestMethod.POST)
	public AjaxResult addOrEditEmployee(Employee e){
		if(e.getId()==0)
			eService.addNewEmployee(e);
		else{
			eService.updateOneEmployee(e);
		}		
		return AjaxResult.success();		
	}
	

}
