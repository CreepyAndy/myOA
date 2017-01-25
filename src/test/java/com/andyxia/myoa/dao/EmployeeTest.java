package com.andyxia.myoa.dao;

import javax.persistence.EntityManagerFactory;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.andyxia.myoa.domain.Employee;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:dispatcher-config.xml"})
public class EmployeeTest {
	@Autowired
	private EmployeeRepository eDao;
	@Test
	public void testAdd(){
		Employee e = new Employee();
		e.setGuid("axia021");
		e.setEmail("andyxia49@gmail.com");
		e.setName("Andy Xia");
		e.setPhone("18217265619");
		e.setPsw("1234");
		eDao.save(e);
	}
}