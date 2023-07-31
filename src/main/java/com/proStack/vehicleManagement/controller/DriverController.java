package com.proStack.vehicleManagement.controller;

import com.proStack.vehicleManagement.dto.User;
import com.proStack.vehicleManagement.payloads.ApiResponse;
import com.proStack.vehicleManagement.payloads.JwtAuthenticationResponse;
import com.proStack.vehicleManagement.payloads.SignUpRequest;
import com.proStack.vehicleManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/driver")
public class DriverController {

	@Autowired
	UserService userService;

	@Autowired
	PasswordEncoder passwordEncoder;

	@SuppressWarnings("unchecked")
	@PostMapping("/addDriver")
	public ResponseEntity<?> addDriver(@Valid @RequestBody SignUpRequest signUpRequest) {
		if (userService.existsByMobileNo(signUpRequest.getMobileNo())) {
			return new ResponseEntity<Object>(new ApiResponse(false, "Mobile no is already taken!"), HttpStatus.BAD_REQUEST);
		} else if (signUpRequest.getLicenseNo() == null) {
			return new ResponseEntity<Object>(new ApiResponse(false, "License number required!"), HttpStatus.BAD_REQUEST);
		}

		// Creating driver account
		User user = new User();
		user.setName(signUpRequest.getName());
		user.setMobileNo(signUpRequest.getMobileNo());
		user.setEmail(signUpRequest.getEmail());
		user.setPassword(passwordEncoder.encode(signUpRequest.getMobileNo()));
		user.setRole("Driver");
		user.setStatus("Active");
		user.setLicenseNo(signUpRequest.getLicenseNo());
		User result = userService.saveUser(user);

		URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/{username}")
				.buildAndExpand(result.getMobileNo()).toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true, "Driver added successfully"));
	}

	@GetMapping("/getDrivers")
	public ResponseEntity<?> getDrivers() {
		return ResponseEntity.ok(userService.getDrivers());
	}
}