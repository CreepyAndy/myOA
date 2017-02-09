package com.andyxia.myoa.dao;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.andyxia.myoa.domain.Authority;
import com.andyxia.myoa.domain.Role;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:dispatcher-config.xml"})
public class RoleTest {
	@Autowired
	private RoleRepository rdao;
	@Autowired
	private AuthorityRepository adao;
	
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
	
	@Test
	public void testAddAuthorities(){
		List<Role> roles = rdao.findByDepartment("Finance");
		Role role = roles.get(0);
		System.out.println(role.getDepartment());
		List<Authority> authorities = adao.queryAllFatherMotions();
		role.setAuthorities(new HashSet<Authority>(authorities));
		rdao.save(role);
	}
	
	@Test
	public void testLoadAuthorities(){
		Role role = rdao.findOne(6);
		Set<Authority> Authorities = role.getAuthorities();
		for(Authority a:Authorities){
			System.out.println(a.getName());
		}
	}
	
	
	

}
