package com.proStack.vehicleManagement.dao;

import com.proStack.vehicleManagement.dto.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TripDao extends JpaRepository<Trip, Long> {

	@Query("select t from Trip t where t.booking.id=:id")
	Trip getTripByBookingId(@Param("id") Long id);
}