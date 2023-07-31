package com.proStack.vehicleManagement.controller;

import com.proStack.vehicleManagement.dto.Vehicle;
import com.proStack.vehicleManagement.payloads.ApiResponse;
import com.proStack.vehicleManagement.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {

	@Autowired
	VehicleService vehicleService;

	@PostMapping("/addVehicle")
	public ResponseEntity<?> addVehicle(@Valid @RequestBody Vehicle vehicle) {
		if (vehicleService.existsByVehicleNo(vehicle.getVehicleNo())) {
			return new ResponseEntity(new ApiResponse(false, "Vehicle already registered"), HttpStatus.BAD_REQUEST);
		}
		Vehicle vehicle1 = vehicleService.saveVehicle(vehicle);
		if (vehicle1 != null) {
			return ResponseEntity.ok(vehicle1);
		}
		return new ResponseEntity(new ApiResponse(false, "Failed to add"), HttpStatus.BAD_REQUEST);
	}

	@GetMapping("/getVehicles")
	public ResponseEntity<?> getVehicles() {
		return ResponseEntity.ok(vehicleService.getVehicles());
	}
}