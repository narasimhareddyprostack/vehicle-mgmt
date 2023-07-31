package com.proStack.vehicleManagement.payloads;

public class JwtAuthenticationResponse {

	private String token;
	private String type = "Bearer";
	private Long id;
	private String name;
	private String mobileNo;
	private String email;
	private String role;
	private String licenceNo;
	private String status;

	public JwtAuthenticationResponse(String accessToken, Long id, String name, String mobileNo, String email,
			String role, String licenceNo, String status) {
		this.token = accessToken;
		this.id = id;
		this.name = name;
		this.mobileNo = mobileNo;
		this.email = email;
		this.role = role;
		this.licenceNo = licenceNo;
		this.status = status;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getLicenceNo() {
		return licenceNo;
	}

	public void setLicenceNo(String licenceNo) {
		this.licenceNo = licenceNo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
