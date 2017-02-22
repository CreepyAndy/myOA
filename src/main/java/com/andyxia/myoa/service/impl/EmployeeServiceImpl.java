package com.andyxia.myoa.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.andyxia.myoa.context.AuthorityCache;
import com.andyxia.myoa.dao.EmployeeRepository;
import com.andyxia.myoa.domain.Authority;
import com.andyxia.myoa.domain.Employee;
import com.andyxia.myoa.domain.Role;
import com.andyxia.myoa.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService{
	@Autowired
	private AuthorityCache acache;
	@Autowired
	private EmployeeRepository edao;

	@Override
	public Employee addNewEmployee(Employee e) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Employee updateOneEmployee(Employee e) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Set<Authority> getAuthority(String guid) {
		// TODO Auto-generated method stub
		Employee e;
		if(acache.getEmployeeMap().containsKey(guid))
			e = acache.getEmployeeMap().get(guid);
		else
			e = edao.findOneByGuid(guid);
		Set<Authority> eAuthorities = new HashSet<>();
		for (Role r : e.getRoles()) {  
			for(Authority a : r.getAuthorities()){
				if(eAuthorities.contains(a)==false)
					eAuthorities.add(a);
			}
		}  
		return eAuthorities;
	}

	@Override
	public boolean verifyUser(String guid, String psw) {
		Employee employee = edao.findOneByGuid(guid);
		if(employee.getPsw().equals(psw)==true)
			return true;
		return false;
	}

	@Override
	public Employee getEmployee(String guid) {	
		return edao.findOneByGuid(guid);
	}

}
