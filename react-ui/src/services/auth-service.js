import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:8080";

class AuthService {
    login(mobileNo, password) {
        const reqObject = {
            mobileNo: mobileNo,
            password: password
        }
        return axios
            .post(API_URL + "/api/auth/signin", reqObject)
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    localStorage.setItem("role", response.data.role)
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("role");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    getCurrentUserRole() {
        return JSON.parse(localStorage.getItem('role'));
    }

    getDrivers() {
        return axios.get(API_URL + '/driver/getDrivers', { headers: authHeader() });
    }

    addDriver(data) {
        return axios.post(API_URL + '/driver/addDriver', data, { headers: authHeader() });
    }

    getVehicles() {
        return axios.get(API_URL + '/vehicle/getVehicles', { headers: authHeader() });
    }

    addVehicle(data) {
        return axios.post(API_URL + '/vehicle/addVehicle', data, { headers: authHeader() });
    }

    getBookings() {
        return axios.get(API_URL + '/booking/getBookings', { headers: authHeader() });
    }

    addBooking(data, tripDate) {
        return axios.post(API_URL + '/booking/addBooking?tripDate=' + tripDate, data, { headers: authHeader() });
    }

    getAssignedBookingsByDriver(driverId) {
        return axios.get(API_URL + '/booking/getBookingsByDriver?driverId=' + driverId, { headers: authHeader() });
    }

    getTrips() {
        return axios.get(API_URL + '/trip/getTrips', { headers: authHeader() });
    }

    startTrip(data) {
        return axios.post(API_URL + '/trip/startTrip', data, { headers: authHeader() });
    }

    endTrip(data) {
        return axios.post(API_URL + '/trip/endTrip', data, { headers: authHeader() });
    }
}

export default new AuthService();