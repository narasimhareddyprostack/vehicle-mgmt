package com.proStack.vehicleManagement.service;

import com.proStack.vehicleManagement.dto.User;

import java.util.List;

public interface UserService {


    boolean existsByMobileNo (String email);

    User saveUser(User user);

    List<User> getDrivers();
}