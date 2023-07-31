package com.proStack.vehicleManagement.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proStack.vehicleManagement.dao.VehicleDao;
import com.proStack.vehicleManagement.dto.Vehicle;
import com.proStack.vehicleManagement.service.VehicleService;

@Service
public class VehicleServiceImpl implements VehicleService {

	@Autowired
	VehicleDao vehicleDao;

	/*@Override
	public boolean existsByVehicleNo(String vehicleNo) {
		return vehicleDao.existsByVehicleNo(vehicleNo);
	}*/
	@Override
	public boolean existsByVehicleNo(String vehicleNo) {
		return vehicleDao.existsByVehicleNo(vehicleNo);
	}

	@Override
	public Vehicle saveVehicle(Vehicle vehicle) {
		return vehicleDao.save(vehicle);
	}

	@Override
	public List<Vehicle> getVehicles() {
		return vehicleDao.findAll();
	}
}