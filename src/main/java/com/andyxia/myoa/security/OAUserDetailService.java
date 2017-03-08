package com.andyxia.myoa.security;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.andyxia.myoa.domain.Authority;
import com.andyxia.myoa.service.EmployeeService;

@Service("oAUserDetailService")
public class OAUserDetailService implements UserDetailsService {
	@Autowired
	private EmployeeService es;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {		
		//TODO psw = null
		String password = es.getPassword(username);
		System.out.println(password);
		Set<Authority> authorities = es.getAuthority(username);
		UserDetails userDetails = new User(username, password, authorities);
		return userDetails;
	}



}


