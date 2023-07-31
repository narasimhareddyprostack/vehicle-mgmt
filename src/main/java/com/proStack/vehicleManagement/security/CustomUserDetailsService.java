package com.proStack.vehicleManagement.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proStack.vehicleManagement.dao.UserDao;
import com.proStack.vehicleManagement.dto.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	UserDao userRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String mobileNo) throws UsernameNotFoundException {
		// Let people login with either username or email
		User user = userRepository.findByMobileNo(mobileNo)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with mobileNo : " + mobileNo));

		return UserPrincipal.create(user);
	}

	// This method is used by JWTAuthenticationFilter
	@Transactional
	public UserDetails loadUserById(Long id) {
		com.proStack.vehicleManagement.dto.User user = userRepository.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + id));

		return UserPrincipal.create(user);
	}
}
