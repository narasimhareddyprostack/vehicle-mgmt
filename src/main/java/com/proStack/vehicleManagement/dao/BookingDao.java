package com.proStack.vehicleManagement.dao;

import com.proStack.vehicleManagement.dto.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingDao extends JpaRepository<Booking, Long> {

	@Query("select b from Booking b where b.driver.id=:id")
	List<Booking> getBookingsByDriverId(@Param("id") Long id);

	@Query("select b from Booking b ORDER BY b.tripDate asc")
	List<Booking> getBookingsForAdmin();

	@Query(nativeQuery = true, value = "SELECT count(b.id) FROM bookings b WHERE b.driver_id =:driverId AND DATE_FORMAT(b.trip_date,'%d/%m/%Y') =:tripDate")
	Integer getDriverAllocationStatus(@Param("driverId") Long driverId, @Param("tripDate") String tripDate);

	@Query(nativeQuery = true, value = "SELECT count(b.id) FROM bookings b WHERE b.vehicle_id =:vehicleId AND DATE_FORMAT(b.trip_date,'%d/%m/%Y') =:tripDate")
	Integer getVehicleAllocationStatus(@Param("vehicleId") Long vehicleId, @Param("tripDate") String tripDate);
}