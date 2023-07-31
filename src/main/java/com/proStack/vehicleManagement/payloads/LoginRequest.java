package com.proStack.vehicleManagement.payloads;

import com.sun.istack.NotNull;

public class LoginRequest {

	@NotNull
	private String mobileNo;

	@NotNull
	private String password;

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
