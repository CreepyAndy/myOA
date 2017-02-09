package com.andyxia.myoa.context;

import java.util.Calendar;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.andyxia.myoa.dao.AuthorityRepository;
import com.andyxia.myoa.domain.Authority;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:dispatcher-config.xml"})
public class AuthorityCacheTest {
	@Autowired
	private AuthorityCache authorityCache;
	@Autowired
	private AuthorityRepository adao;
	
	@Test
	public void testCachedAndNoncached(){
		Long timeBefore = System.currentTimeMillis();
		Map<Integer,Authority> authorities = authorityCache.getAuthorityMap();
		Long timeAfter = System.currentTimeMillis();
		Long duration = timeAfter-timeBefore;
		System.out.println("Cached time :"+duration);
		
		timeBefore = System.currentTimeMillis();
		adao.findAll();
		timeAfter = System.currentTimeMillis();
		duration = timeAfter-timeBefore;
		System.out.println("NonCached time :"+duration);

	}
}
