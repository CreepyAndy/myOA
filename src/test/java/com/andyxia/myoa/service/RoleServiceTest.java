package com.andyxia.myoa.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.andyxia.myoa.context.AuthorityCache;
import com.andyxia.myoa.dao.RoleRepository;
import com.andyxia.myoa.domain.Authority;
import com.andyxia.myoa.domain.Role;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:dispatcher-config.xml"})
public class RoleServiceTest {
	@Autowired
	private RoleService rService;
	@Autowired
	private RoleRepository rDao;
	@Autowired
	private AuthorityCache aCache;
	@Test
	public void testAddAuthorityToRole(){
		Role role = aCache.getRoleMap().get(4);
		Authority authority = aCache.getAuthorityMap().get(2);
		rService.addAuthorityToOneRole(role, authority);
	}

}
