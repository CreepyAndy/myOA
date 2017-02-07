package com.andyxia.myoa.dao;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;

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
		
		List<Authority> alist = new ArrayList<Authority>();
		Authority a1 = new Authority();
		a1.setName("浏览");
		alist.add(a1);
		Authority a11 = new Authority();
		a11.setName("浏览公告");
		a11.setParent(a1);
		alist.add(a11);
		Authority a12 = new Authority();
		a12.setName("浏览本人信息");
		a12.setParent(a1);
		alist.add(a12);
		Authority a2 = new Authority();
		a2.setName("申请");
		alist.add(a2);
		Authority a21 = new Authority();
		a21.setName("申请请假");
		a21.setParent(a2);
		alist.add(a21);
		adao.save(alist);	
	}
	
	@Test
	public void testQuery(){
		System.out.println(adao.findAllFatherMotions().get(1).getName().toString());
	}

}
