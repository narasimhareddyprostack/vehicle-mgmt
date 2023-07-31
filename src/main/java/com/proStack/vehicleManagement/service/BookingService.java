package com.proStack.vehicleManagement.service;

import java.util.List;

import com.proStack.vehicleManagement.dto.Booking;

public interface BookingService {

	Booking saveBooking(Booking booking);

	boolean existsBooking(Long id);

	Booking updateBooking(Booking booking);

	Integer getDriverAllocationStatus(Long driverId, String tripDate);

	Integer getVehicleAllocationStatus(Long vehicleId, String tripDate);

	List<Booking> getBookings();

	List<Booking> getBookingsByDriverId(Long driverId);
}