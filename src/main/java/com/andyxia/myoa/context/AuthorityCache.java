package com.andyxia.myoa.context;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.andyxia.myoa.dao.AuthorityRepository;
import com.andyxia.myoa.dao.EmployeeRepository;
import com.andyxia.myoa.dao.RoleRepository;
import com.andyxia.myoa.domain.Authority;
import com.andyxia.myoa.domain.Employee;
import com.andyxia.myoa.domain.Role;
/**
 * for caching authority related info.
 * @author axia021
 *
 */

@Service
public class AuthorityCache {
	private Map<Integer,Authority> authorityMap = new HashMap<>();
	private Map<String,Employee> employeeMap = new HashMap<>();
	private Map<Integer, Role> roleMap = new HashMap<>();
	public boolean isEmployeeModified = false;
	public boolean isAuthorityModified = false;
	public boolean isRoleModified = false;

	@Autowired
	private AuthorityRepository adao;
	@Autowired
	private RoleRepository rdao;
	@Autowired
	private EmployeeRepository edao;
	
	@PostConstruct
	public void init(){
		List<Authority> alist=adao.findAll();
		for(Authority a : alist){
			authorityMap.put(a.getId(), a);
		}
		List<Role> rlist=rdao.findAll();
		for(Role r : rlist){
			roleMap.put(r.getId(), r);
		}	
		List<Employee> elist=edao.findAll();
		for(Employee e : elist){
			employeeMap.put(e.getGuid(),e);
		}
	}
	public Map<Integer,Authority> getAuthorityMap(){
		if(authorityMap.isEmpty())
			this.init();
		return this.authorityMap;
	}
	public Map<Integer, Role> getRoleMap(){
		if(roleMap.isEmpty())
			this.init();
		return this.roleMap;
	}
	public Map<String, Employee> getEmployeeMap(){
		if(employeeMap.isEmpty())
			this.init();
		return this.employeeMap;
	}
}
