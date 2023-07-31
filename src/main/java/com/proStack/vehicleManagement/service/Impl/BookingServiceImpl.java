package com.proStack.vehicleManagement.service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proStack.vehicleManagement.dao.BookingDao;
import com.proStack.vehicleManagement.dto.Booking;
import com.proStack.vehicleManagement.service.BookingService;

@Service
public class BookingServiceImpl implements BookingService {

	@Autowired
	BookingDao bookingDao;

	@Override
	public Booking saveBooking(Booking booking) {
		return bookingDao.save(booking);
	}

	@Override
	public Booking updateBooking(Booking booking) {
		return bookingDao.save(booking);
	}

	@Override
	public boolean existsBooking(Long id) {
		return bookingDao.existsById(id);
	}

	@Override
	public List<Booking> getBookings() {
		return bookingDao.getBookingsForAdmin();
	}

	@Override
	public List<Booking> getBookingsByDriverId(Long driverId) {
		return bookingDao.getBookingsByDriverId(driverId);
	}

	@Override
	public Integer getDriverAllocationStatus(Long driverId, String tripDate) {
		return bookingDao.getDriverAllocationStatus(driverId, tripDate);
	}

	@Override
	public Integer getVehicleAllocationStatus(Long vehicleId, String tripDate) {
		return bookingDao.getVehicleAllocationStatus(vehicleId, tripDate);
	}
}