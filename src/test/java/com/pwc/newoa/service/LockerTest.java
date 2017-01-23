package com.pwc.newoa.service;

import java.sql.Types;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Commit;
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
