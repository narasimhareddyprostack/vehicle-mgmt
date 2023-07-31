package com.proStack.vehicleManagement.controller;

import java.text.SimpleDateFormat;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proStack.vehicleManagement.dto.Booking;
import com.proStack.vehicleManagement.payloads.ApiResponse;
import com.proStack.vehicleManagement.service.BookingService;

@RestController
@RequestMapping("/booking")
public class BookingController {

	@Autowired
	BookingService bookingService;
	SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

	@PostMapping("/addBooking")
	public ResponseEntity<?> addBooking(@Valid @RequestBody Booking booking,
			@RequestParam("tripDate") String tripDate) {
		if (booking != null && booking.getDriver() != null) {
			if (bookingService.getDriverAllocationStatus(booking.getDriver().getId(), tripDate) == 0) {
				if (bookingService.getVehicleAllocationStatus(booking.getVehicle().getId(), tripDate) == 0) {
					Booking booking1 = bookingService.saveBooking(booking);
					if (booking1 != null) {
						return ResponseEntity.ok(booking1);
					}
				} else {
					return new ResponseEntity(new ApiResponse(false, "Vehicle Unavailable for date - " + tripDate),
							HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity(new ApiResponse(false, "Driver Unavailable for date - " + tripDate),
						HttpStatus.BAD_REQUEST);
			}
		}
		return new ResponseEntity(new ApiResponse(false, "Failed to add"), HttpStatus.BAD_REQUEST);
	}

	@PostMapping("/updateBooking")
	public ResponseEntity<?> updateBooking(@Valid @RequestBody Booking booking) {
		if (bookingService.existsBooking(booking.getId())) {
			Booking booking1 = bookingService.saveBooking(booking);
			if (booking1 != null) {
				return ResponseEntity.ok(booking1);
			}
			return new ResponseEntity(new ApiResponse(false, "Failed to add"), HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity(new ApiResponse(false, "Booking does not exists"), HttpStatus.BAD_REQUEST);
		}
	}

	@GetMapping("/getBookings")
	public ResponseEntity<?> getBookings() {
		return ResponseEntity.ok(bookingService.getBookings());
	}

	@GetMapping("/getBookingsByDriver")
	public ResponseEntity<?> getBookings(@RequestParam("driverId") Long driverId) {
		return ResponseEntity.ok(bookingService.getBookingsByDriverId(driverId));
	}
}