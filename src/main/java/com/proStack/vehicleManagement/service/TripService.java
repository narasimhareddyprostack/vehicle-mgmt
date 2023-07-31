package com.proStack.vehicleManagement.service;

import com.proStack.vehicleManagement.dto.Trip;

import java.util.List;

public interface TripService {

	Trip startTrip(Trip trip);

	boolean existsTrip(Long id);

	Trip endTrip(Trip trip);

	List<Trip> getTrips();
}