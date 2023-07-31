import React, { useState, useEffect } from "react";
import AppContainer from "./AppContainer.component";
import AuthService from '../services/auth-service';
import { Link } from "react-router-dom";

const Trips = () => {

    const [adminRole, setAdminRole] = useState();
    const [bookings, setBookings] = useState();
    const [trips, setTrips] = useState();

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();

        if (currentUser) {
            setAdminRole(currentUser.role === 'Admin' ? true : false);
            if (currentUser.role === 'Admin') {
                getTrips();
            } else {
                getAssignedBookings(currentUser.id);
            }
        } else {
            this.setState({ redirect: "/login" }); //login
        }
    }, []);

    const getAssignedBookings = (driverId) => {
        AuthService.getAssignedBookingsByDriver(driverId).then(
            (res) => {
                if (res.data) {
                    setBookings(res.data);
                }
            },
            error => {
                console.log(error.toString())
            }
        );
    }

    const getTrips = () => {
        AuthService.getTrips().then(
            (res) => {
                if (res.data) {
                    setTrips(res.data);
                }
            },
            error => {
                console.log(error.toString())
            }
        );
    }

    return <>
        <AppContainer />
        {adminRole ?
            <div>
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Trip Id</th>
                                    <th scope="col">Trip From</th>
                                    <th scope="col">To address</th>
                                    <th scope="col">Driver name</th>
                                    <th scope="col">Vehicle number</th>
                                    <th scope='col'>Trip Date</th>
                                    <th scope='col'>Price</th>
                                    <th scope="col">Start point</th>
                                    <th scope='col'>End point</th>
                                    <th scope='col'>Total distance</th>
                                    <th scope='col'>Trip Status</th>
                                </tr>
                            </thead>

                            {trips ? trips.map((trip, index) => {
                                return (
                                    <tbody key={index}>
                                        <tr>
                                            <td scope="col">{trip.id}</td>
                                            <td scope="col">{trip.booking?.fromAddress}</td>
                                            <td scope="col">{trip.booking?.toAddress}</td>
                                            <td scope="col">{trip.booking?.driver?.name}</td>
                                            <td scope="col">{trip.booking?.vehicle?.vehicleNo}</td>
                                            <td scope="col">{trip.booking?.tripDate}</td>
                                            <td scope="col">{trip.booking?.price}</td>
                                            <td scope="col">{trip?.startPoint}km</td>
                                            <td scope="col">{trip?.endPoint}km</td>
                                            <td scope="col">{trip?.totalDistance}km</td>
                                            <td scope="col">{trip.booking?.status}</td>
                                        </tr>
                                    </tbody>

                                )
                            }) : ''}
                        </table>
                    </div>
                </div>
            </div> :
            <div>
                <div className="row">
                    <div className="col-12">
                        {bookings ? <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Booking Id</th>
                                    <th scope="col">Trip From</th>
                                    <th scope="col">To address</th>
                                    <th scope="col">Driver name</th>
                                    <th scope="col">Vehicle number</th>
                                    <th scope='col'>Trip Date</th>
                                    <th scope='col'>Price</th>
                                    <th scope='col'>Status</th>
                                </tr>
                            </thead>

                            {bookings.map((booking, index) => {
                                return (
                                    <tbody key={index}>
                                        <tr>
                                            <td scope="col">{booking?.id}</td>
                                            <td scope="col">{booking?.fromAddress}</td>
                                            <td scope="col">{booking?.toAddress}</td>
                                            <td scope="col">{booking?.driver?.name}</td>
                                            <td scope="col">{booking?.vehicle?.vehicleNo}</td>
                                            <td scope="col">{booking?.tripDate}</td>
                                            <td scope="col">{booking?.price}</td>
                                            {booking?.status === 'Not started' &&
                                                <td> <Link
                                                    to={"/update-trip-status?bookingId=" + booking?.id + "&type=Not started"}>
                                                    {booking?.status}
                                                </Link></td>}
                                            {booking?.status === 'Running' && <td> <Link
                                                to={"/update-trip-status?bookingId=" + booking?.id + "&type=Running"}>
                                                {booking?.status}
                                            </Link></td>}

                                            {booking?.status === 'Completed' && <td> {booking?.status}</td>}
                                        </tr>
                                    </tbody>

                                )
                            })}
                        </table> : <div> No trips assigned</div>}
                    </div>
                </div>
            </div>}

    </>
};

export default Trips;