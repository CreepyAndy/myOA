package com.andyxia.myoa.service;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"file:src/main/resources/dispatcher-config.xml"})
@WebAppConfiguration
public class LockerTest {
	
	@Test
	@Rollback
	@Transactional(readOnly = true)
	public void testLocker(){
		
	}
	@Test
	@Rollback
	public void testQueryApplication(){
		
	}
	

	
}
