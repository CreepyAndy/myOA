package com.andyxia.myoa.domain;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
@Entity
@Table(name = "t_role")
public class Role {
	@Id
    @GeneratedValue
    @Column(name="id", unique = true, nullable = false)
	private int id;
	@Column(name = "name")
	private String name;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "jt_role_authority"		
		)
	private Set<Authority> authorities;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "jt_employee_role"		
		)
	private Set<Employee> employees;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public Set<Employee> getEmployees() {
		return employees;
	}
	public void setEmployees(Set<Employee> employees) {
		this.employees = employees;
	}
	public Set<Authority> getAuthorities() {
		return authorities;
	}
	public void setAuthorities(Set<Authority> authorities) {
		this.authorities = authorities;
	}

}
