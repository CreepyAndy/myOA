package com.andyxia.myoa.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.andyxia.myoa.domain.Role;

public interface RoleRepository extends JpaRepository<Role, Integer>{
	List<Role> findByDepartment(String department);
}
