package com.andyxia.myoa.dao;

import java.util.HashSet;
import java.util.Set;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.andyxia.myoa.domain.Role;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:dispatcher-config.xml"})
public class RoleTest {
	@Autowired
	private RoleRepository rdao;
	
	@Test
	public void testAdd(){
		Set<Role> rSet = new HashSet<Role>();
		Role r = new Role();
		r.setDepartment("Finance");
		r.setTitle("Manager");
		Role r2 = new Role();
		r2.setDepartment("Finance");
		r2.setTitle("Intern");
		Role r3 = new Role();
		r3.setDepartment("Finance");
		r3.setTitle("Employee");
		rSet.add(r);
		rSet.add(r2);
		rSet.add(r3);
		rdao.save(rSet);
	}

}
