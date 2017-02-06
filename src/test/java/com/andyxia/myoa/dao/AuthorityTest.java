package com.andyxia.myoa.dao;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.andyxia.myoa.domain.Authority;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:dispatcher-config.xml"})
public class AuthorityTest {
	@Autowired
	private AuthorityRepository adao;
	@Autowired
	private EntityManagerFactory emFactory;
	@Test
	public void testAdd(){
		EntityManager em = emFactory.createEntityManager();
		
		Set<Authority> aset = new HashSet<Authority>();
		Authority a1 = new Authority();
		a1.setId(1);
		a1.setName("浏览");
		Authority a2 = new Authority();
	}

}
