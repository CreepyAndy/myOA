package com.andyxia.myoa.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.andyxia.myoa.domain.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, Integer>{
	@Query("select a from Authority a where a.parent = null")
	List<Authority> findAllFatherMotions();
}
