package com.proStack.vehicleManagement.dto;

import javax.persistence.*;

@Entity
@Table(name = "trips")
public class Trip {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	private Booking booking;
	private Double startPoint;
	private Double endPoint;
	private Double totalDistance;
	private String status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Booking getBooking() {
		return booking;
	}

	public void setBooking(Booking booking) {
		this.booking = booking;
	}

	public Double getStartPoint() {
		return startPoint;
	}

	public void setStartPoint(Double startPoint) {
		this.startPoint = startPoint;
	}

	public Double getEndPoint() {
		return endPoint;
	}

	public void setEndPoint(Double endPoint) {
		this.endPoint = endPoint;
	}

	public Double getTotalDistance() {
		return totalDistance;
	}

	public void setTotalDistance(Double totalDistance) {
		this.totalDistance = totalDistance;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}