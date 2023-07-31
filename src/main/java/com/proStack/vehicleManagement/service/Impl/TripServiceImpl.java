package com.proStack.vehicleManagement.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proStack.vehicleManagement.dao.BookingDao;
import com.proStack.vehicleManagement.dao.TripDao;
import com.proStack.vehicleManagement.dto.Booking;
import com.proStack.vehicleManagement.dto.Trip;
import com.proStack.vehicleManagement.service.TripService;

@Service
public class TripServiceImpl implements TripService {

	@Autowired
	TripDao tripDao;

	@Autowired
	BookingDao bookingDao;

	@Override
	public Trip startTrip(Trip trip) {
		trip.setStatus("Running");
		Optional<Booking> booking = bookingDao.findById(trip.getBooking().getId());
		if (booking.isPresent()) {
			booking.get().setStatus("Running");
			bookingDao.save(booking.get());
		}
		return tripDao.save(trip);
	}

	@Override
	public Trip endTrip(Trip trip) {
		Trip trip1 = tripDao.getTripByBookingId(trip.getBooking().getId());
		if (trip1 != null) {
			trip1.setEndPoint(trip.getEndPoint());
			trip1.setTotalDistance(trip.getEndPoint() - trip1.getStartPoint());
			trip1.setStatus("Completed");
			Optional<Booking> booking = bookingDao.findById(trip.getBooking().getId());
			if (booking.isPresent()) {
				booking.get().setStatus("Completed");
				bookingDao.save(booking.get());
			}
			return tripDao.save(trip1);
		} else {
			return null;
		}
	}

	@Override
	public List<Trip> getTrips() {
		return tripDao.findAll();
	}

	@Override
	public boolean existsTrip(Long id) {
		return tripDao.existsById(id);
	}
}