package com.andyxia.myoa.service;

import java.util.Set;

import org.springframework.transaction.annotation.Transactional;

import com.andyxia.myoa.domain.Authority;
import com.andyxia.myoa.domain.Role;
import com.andyxia.myoa.exception.AuthorityException;

public interface RoleService {
	//Authority related functions
	public Role addAuthorityToOneRole(Role role,Authority authority);
	public void deleteAuthority(Role role,Authority authority) throws AuthorityException;
	
	//Role related functions
	public void addRole(Role r) throws AuthorityException;
	@Transactional(readOnly = false, rollbackFor = Throwable.class)
	public void addRole(Role r,Set<Authority> authorities) throws AuthorityException;
	public void deleteRole(Role r) throws AuthorityException;
	public void updateRole(Role r);
	
}
