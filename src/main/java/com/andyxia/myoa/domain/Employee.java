package com.andyxia.myoa.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
@Entity
@Table(name = "t_employee")
public class Employee implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1845335610753221569L;
	@Id
    @GeneratedValue
    @Column(name="id", unique = true, nullable = false)
	private int id;
	@Column(name = "guid")
	private String guid;
	@Column(name = "psw")
	private String psw;
	@Column(name = "name")
	private String name;
	@Column(name = "status")
	private String status;
	@Column(name = "email")
	private String email;
	@Column(name = "phone")
	private String phone;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
		name = "jt_employee_role"		
	)
	private Set<Role> roles;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getGuid() {
		return guid;
	}
	public void setGuid(String guid) {
		this.guid = guid;
	}
	public String getPsw() {
		return psw;
	}
	public void setPsw(String psw) {
		this.psw = psw;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Set<Role> getRoles() {
		return roles;
	}
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
}
