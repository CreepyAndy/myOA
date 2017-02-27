package com.andyxia.myoa.controller;

import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.andyxia.myoa.context.AuthorityCache;
import com.andyxia.myoa.domain.Authority;
import com.andyxia.myoa.domain.Employee;
import com.andyxia.myoa.domain.Role;
import com.andyxia.myoa.service.EmployeeService;

@RestController
@RequestMapping(value = "/login")
public class LoginController {
	@Autowired
	private AuthorityCache authorityCache;
	
	@Autowired
	private EmployeeService es;
	
	@RequestMapping(value="",method=RequestMethod.POST, produces = "text/html; charset=utf-8")
	public ModelAndView login(HttpServletRequest request, HttpSession session){
		ModelAndView mv = new ModelAndView();
		Map<String,Employee> employeeMap = authorityCache.getEmployeeMap();
		String guid = request.getParameter("username");
		String password = request.getParameter("password");
		if(guid==null || password==null){
			return new ModelAndView("redirect:welcome.html");
		}
		if(employeeMap.containsKey(guid)==false)
			return new ModelAndView("redirect:welcome.html");
		if(es.verifyUser(guid, password)){
			//TODO
			Employee employee = es.getEmployee(guid);
			Set<Authority> authorities = es.getAuthority(guid);
			return new ModelAndView().addObject("authorities",authorities);
		}
		else
			return new ModelAndView("redirect:welcome.html");
	}
}
