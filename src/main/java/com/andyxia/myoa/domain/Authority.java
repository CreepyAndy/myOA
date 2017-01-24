package com.andyxia.myoa.domain;

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
@Table(name = "t_authority")
public class Authority {
	@Id
    @GeneratedValue
    @Column(name="id", unique = true, nullable = false)
	private int id;
	@Column(name = "name")
	private String name;
	@Column(name = "description")
	private String description;
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "jt_role_authority"		
		)
	private Set<Role> roles;
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Set<Role> getRoles() {
		return roles;
	}
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
}
