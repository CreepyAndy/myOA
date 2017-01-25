package com.andyxia.myoa.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.andyxia.myoa.domain.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer>{
	public Employee findOneByGuid();
}
