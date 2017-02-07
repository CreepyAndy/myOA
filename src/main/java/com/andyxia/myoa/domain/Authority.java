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
@Table(name = "t_authority")
public class Authority implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8205326672961136192L;
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id", unique = true, nullable = false)
	private int id;
	@Column(name = "name")
	private String name;
	@Column(name = "description")
	private String description;
	@ManyToOne(cascade=CascadeType.ALL,fetch=FetchType.EAGER)
	@JoinColumn(name="parent_id")
	private Authority parent;
	@OneToMany(mappedBy="parent",fetch=FetchType.EAGER)
	private Set<Authority> children = new HashSet<Authority>();
	@ManyToMany(fetch = FetchType.EAGER,mappedBy="authorities")
	private Set<Role> roles;
	private String url;
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public int getId() {
		return id;
	}
	public Authority getParent() {
		return parent;
	}
	public void setParent(Authority parent) {
		this.parent = parent;
	}
	public Set<Authority> getChildren() {
		return children;
	}
	public void setChildren(Set<Authority> children) {
		this.children = children;
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
