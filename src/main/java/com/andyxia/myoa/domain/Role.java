package com.andyxia.myoa.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
@Entity
@Table(name = "t_role")
public class Role implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -4748728109218701804L;
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id", unique = true, nullable = false)
	private int id;
	@Column(name = "department")
	private String department;
	@Column(name = "title")
	private String title;
	/*@ManyToOne(cascade=CascadeType.ALL,fetch=FetchType.EAGER)
	@JoinColumn(name="parent_id")
	private Role parent;
	@OneToMany(mappedBy="parent",cascade=CascadeType.ALL,fetch=FetchType.EAGER)
	private Set<Role> children = new HashSet<Role>();*/	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "jt_role_authority",
			joinColumns={
					@JoinColumn(name="role_id")
			},
			inverseJoinColumns={
					@JoinColumn(name="authority_id")
			}
		)
	private Set<Authority> authorities;
	@ManyToMany(fetch = FetchType.EAGER,mappedBy="roles")
	private Set<Employee> employees;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
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
