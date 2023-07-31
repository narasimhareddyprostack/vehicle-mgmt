package com.proStack.vehicleManagement.security;

import java.util.Collection;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.proStack.vehicleManagement.dto.User;

public class UserPrincipal implements UserDetails {

	private Long id;

	private String name;

	private String mobileNo;

	@JsonIgnore
	private String email;

	@JsonIgnore
	private String password;

	private String role;

	private String licenceNo;
	private String status;

	private Collection<? extends GrantedAuthority> authorities;

	public UserPrincipal(Long id, String name, String mobileNo, String email, String password, String role,
			String licenceNo, String status) {
		this.id = id;
		this.name = name;
		this.mobileNo = mobileNo;
		this.email = email;
		this.password = password;
		this.role = role;
		this.licenceNo = licenceNo;
		this.status = status;
	}

	public static UserPrincipal create(User user) {
		return new UserPrincipal(user.getId(), user.getName(), user.getMobileNo(), user.getEmail(), user.getPassword(),
				user.getRole(), user.getLicenseNo(), user.getStatus());
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
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

	@Override
	public String getUsername() {
		return mobileNo;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserPrincipal that = (UserPrincipal) o;
		return Objects.equals(id, that.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

}
