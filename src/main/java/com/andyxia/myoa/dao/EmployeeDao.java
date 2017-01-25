package com.andyxia.myoa.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.andyxia.myoa.domain.Employee;


public interface EmployeeDao extends JpaRepository<Employee, Integer>{
	List<Employee> findByGuid(String guid);
}
