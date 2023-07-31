import React, { useState, useEffect } from "react";
import AppContainer from "./AppContainer.component";
import AuthService from '../services/auth-service';
import { Link } from "react-router-dom";

const Bookings = () => {

    const [bookings, setBookings] = useState();

    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = () => {
        AuthService.getBookings().then(
            (res) => {
                if (res.data) {
                    setBookings(res.data);
                }
                console.log(res);
            },
            error => {
                console.log(error.toString())
            }
        );
    }

    return <>
        <AppContainer />
        <div className="list row" style={{ margin: '10px' }}>
            <div className="col-md-6">
            </div>
            <div className="col-md-6">
                <Link
                    to={"/add-booking"}>
                    <button style={{ float: 'right', marginRight: '10px' }}
                        className="btn btn-success"
                        type="button" >
                        Add Booking
                    </button>
                </Link>
            </div>
            <br></br>
            <br></br>
            <div className="col-md-12">

                <div className="row">
                    <div className="col-12">
                        <table className="table">
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

                            {bookings ? bookings.map((booking, index) => {
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
                                            <td scope="col">{booking?.status}</td>
                                        </tr>
                                    </tbody>

                                )
                            }) : ''}
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </>
};

export default Bookings;