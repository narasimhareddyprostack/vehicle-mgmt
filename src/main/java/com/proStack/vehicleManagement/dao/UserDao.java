package com.proStack.vehicleManagement.dao;

import com.proStack.vehicleManagement.dto.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<User, Long> {

	Optional<User> findByMobileNo(String mobileNo);

	boolean existsByMobileNo(String mobileNo);

	@Query("select u from User u where u.role ='Driver'")
	List<User> getAllDrivers();
}