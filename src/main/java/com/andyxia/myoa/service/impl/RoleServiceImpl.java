package com.andyxia.myoa.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.andyxia.myoa.context.AuthorityCache;
import com.andyxia.myoa.dao.RoleRepository;
import com.andyxia.myoa.domain.Authority;
import com.andyxia.myoa.domain.Role;
import com.andyxia.myoa.exception.AuthorityException;
import com.andyxia.myoa.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService{
	@Autowired
	private RoleRepository rdao;
	@Autowired
	private AuthorityCache aCache;

	@Override
	public Role addAuthorityToOneRole(Role role,Authority authority) {
		// TODO Auto-generated method stub
		role.getAuthorities().add(authority);
		rdao.save(role);
		return null;
	}

	@Override
	public void deleteAuthority(Role role, Authority authority) throws AuthorityException {
		// TODO Auto-generated method stub
		if(role.getAuthorities().contains(authority)==false)
			throw new AuthorityException("deleting authority doesn't exist in the role.");
		role.getAuthorities().remove(authority);
	}

	@Override
	public void addRole(Role r) throws AuthorityException {
		// TODO Auto-generated method stub
		if(aCache.getAuthorityMap().containsKey(r.getId())==true || aCache.getAuthorityMap().containsValue(r)==true)
			throw new AuthorityException("Role: "+r.getId()+r.getDepartment()+r.getTitle()+" alread exist in database");
		Role savedRole = rdao.save(r);
		aCache.getRoleMap().put(savedRole.getId(), savedRole);
	}

	@Override
	public void addRole(Role r, Set<Authority> authorities) throws AuthorityException {
		// TODO Auto-generated method stub
		if(aCache.getAuthorityMap().containsKey(r.getId())==true || aCache.getAuthorityMap().containsValue(r)==true)
			throw new AuthorityException("Role: "+r.getId()+r.getDepartment()+r.getTitle()+" alread exist in database");
		for(Authority authority : authorities){
			if(aCache.getAuthorityMap().containsKey(authority.getId())==false || aCache.getAuthorityMap().containsValue(authority)==false)
				throw new AuthorityException("authorityName :"+authority.getName()+"authorityName id:"+authority.getId()+" doesn't exist in database");			
		}
		r.setAuthorities(authorities);
		r = rdao.save(r);
		aCache.getRoleMap().put(r.getId(), r);
		
	}

	@Override
	public void deleteRole(Role r) throws AuthorityException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateRole(Role r) {
		// TODO Auto-generated method stub
		
	}
	
}
