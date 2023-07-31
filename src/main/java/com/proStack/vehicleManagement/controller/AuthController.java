package com.proStack.vehicleManagement.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.proStack.vehicleManagement.dto.User;
import com.proStack.vehicleManagement.payloads.ApiResponse;
import com.proStack.vehicleManagement.payloads.JwtAuthenticationResponse;
import com.proStack.vehicleManagement.payloads.LoginRequest;
import com.proStack.vehicleManagement.payloads.SignUpRequest;
import com.proStack.vehicleManagement.security.JwtTokenProvider;
import com.proStack.vehicleManagement.security.UserPrincipal;
import com.proStack.vehicleManagement.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserService userService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtTokenProvider tokenProvider;

	@PostMapping("/signin")
	@CrossOrigin
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getMobileNo(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = tokenProvider.generateToken(authentication);
		UserPrincipal userDetails = (UserPrincipal) authentication.getPrincipal();
		List<String> roles = new ArrayList<>();
		roles.add(userDetails.getRole());
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt, userDetails.getId(), userDetails.getName(),
				userDetails.getMobileNo(), userDetails.getEmail(), userDetails.getRole(), userDetails.getLicenceNo(),
				userDetails.getStatus()));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
		if (userService.existsByMobileNo(signUpRequest.getMobileNo())) {
			return new ResponseEntity(new ApiResponse(false, "Mobile no is already taken!"),HttpStatus.BAD_REQUEST);
		}

		// Creating user's account
		User user = new User();
		user.setName(signUpRequest.getName());
		user.setMobileNo(signUpRequest.getMobileNo());
		user.setEmail(signUpRequest.getEmail());
		user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
		user.setRole(signUpRequest.getRole());
		user.setStatus("Active");
		User result = userService.saveUser(user);

		URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/{username}")
				.buildAndExpand(result.getMobileNo()).toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
	}
}