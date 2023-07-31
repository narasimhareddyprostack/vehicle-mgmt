package com.proStack.vehicleManagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.proStack.vehicleManagement.dto.Vehicle;

@Repository
public interface VehicleDao extends JpaRepository<Vehicle, Long> {

	boolean existsByVehicleNo(String vehicleNo);
}