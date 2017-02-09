package com.andyxia.myoa.service;

import java.util.Set;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.andyxia.myoa.dao.EmployeeRepository;
import com.andyxia.myoa.domain.Authority;
import com.andyxia.myoa.domain.Employee;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:dispatcher-config.xml"})
public class EmployeeServiceTest {
	@Autowired
	private EmployeeRepository eDao;
	@Autowired
	private EmployeeService eService;
	
	@Test
	public void testGetAuthorities(){
		Employee employee = eDao.findOne(1);
		Set<Authority> eAuthorities = eService.getAuthority(employee.getGuid());
		for(Authority authority : eAuthorities){
			System.out.println(authority.getName());
		}
	}
}
