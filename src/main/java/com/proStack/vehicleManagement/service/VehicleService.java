package com.proStack.vehicleManagement.service;

import com.proStack.vehicleManagement.dto.Vehicle;

import java.util.List;

public interface VehicleService {

	boolean existsByVehicleNo(String vehicleNo);

	Vehicle saveVehicle(Vehicle vehicle);

	List<Vehicle> getVehicles();
}