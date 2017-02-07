package com.andyxia.myoa.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.andyxia.myoa.domain.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, Integer>{
	@Query("select a from Authority a where a.parent = null")
	List<Authority> queryAllFatherMotions();
	
	@Query("select a from Authority a where a.parent = 1")
	List<Authority> queryAllBrowses();
	
	@Query("select a from Authority a where a.parent = 7")
	List<Authority> queryAllApplies();
	
	@Query("select a from Authority a where a.parent = 11")
	List<Authority> queryAllApproves();
	
	@Query("select a from Authority a where a.parent = 16")
	List<Authority> queryAllSubmits();
	
	@Query("select a from Authority a where a.parent = 18")
	List<Authority> queryAllModifies();
}
