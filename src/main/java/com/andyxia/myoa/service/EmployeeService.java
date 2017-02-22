package com.andyxia.myoa.service;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.andyxia.myoa.domain.Authority;
import com.andyxia.myoa.domain.Employee;

public interface EmployeeService {
	public Employee addNewEmployee(Employee e);
	public Employee updateOneEmployee(Employee e);
	public Set<Authority> getAuthority(String guid);
	public boolean verifyUser(String guid,String psw);
	public Employee getEmployee(String guid);
}
