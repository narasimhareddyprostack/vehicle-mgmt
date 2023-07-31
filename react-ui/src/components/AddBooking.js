import React, { useState, useEffect } from "react";
import AppContainer from "./AppContainer.component";
import { Link } from "react-router-dom";
import AuthService from '../services/auth-service';
import { useHistory } from "react-router-dom";

const AddBooking = () => {
    const [fromAddress, setFromAddress] = useState('');
    const [toAddress, setToAddress] = useState('');
    const [driverId, setDriverId] = useState('');
    const [vehicleId, setVehicleId] = useState('');
    const [price, setPrice] = useState('');
    const [tripDate, setTripDate] = useState('');
    let history = useHistory();
    const [drivers, setDrivers] = useState([]);
    const [vehcles, setVehicles] = useState([]);
    const [unavailableStatus, setUnavailableStatus] = useState(false);

    useEffect(() => {
        getDrivers();
        getVehicles();
    }, []);

    const getDrivers = () => {
        AuthService.getDrivers().then(
            (res) => {
                if (res.data) {
                    setDrivers(res.data);
                    setDriverId(res.data[0].id);
                }
            },
            error => {
                console.log(error.toString())
            }
        );
    }

    const getVehicles = () => {
        AuthService.getVehicles().then(
            (res) => {
                if (res.data) {
                    setVehicles(res.data);
                    setVehicleId(res.data[0].id);
                }
            },
            error => {
                console.log(error.toString())
            }
        );
    }

    const handleAdd = e => {
        setUnavailableStatus(false);
        e.preventDefault();
        const reqObject = {
            fromAddress: fromAddress,
            toAddress: toAddress,
            driver: {
                id: Number(driverId)
            },
            vehicle: {
                id: Number(vehicleId)
            },
            price: price,
            tripDate: tripDate,
            status: "Not started"
        }
        AuthService.addBooking(reqObject, tripDate).then(
            () => {
                history.push("/bookings");
            },
            error => {
                setUnavailableStatus(true);
                console.log("----" + error.toString())
            }
        );
    };

    return <>
        <AppContainer />
        <div className="small-container" style={{ marginLeft: '10%', marginRight: '50%' }}>
            <form onSubmit={handleAdd}>
                <h1>Add Booking</h1>
                <label htmlFor="fromAddress">From address</label>
                <input
                    id="fromAddress"
                    type="text"
                    name="fromAddress"
                    className="form-control"
                    value={fromAddress}
                    required
                    placeholder="From address"
                    onChange={e => setFromAddress(e.target.value)}
                />
                <label htmlFor="toAddress">To address</label>
                <input
                    id="toAddress"
                    type="text"
                    name="toAddress"
                    className="form-control"
                    value={toAddress}
                    placeholder="To address"
                    required
                    onChange={e => setToAddress(e.target.value)}
                />
                <label htmlFor="driverId">Driver</label>
                <select className="form-control" onChange={e => setDriverId(e.target.value)}>
                    {drivers ? drivers.map((item, index) => {
                        return (
                            <option key={index} value={item.id}>{item.name} - {item.mobileNo}</option>
                        )
                    }) : ''}
                </select>

                <label htmlFor="vehicleId">Vehicle</label>
                <select className="form-control" onChange={e => setVehicleId(e.target.value)}>
                    {vehcles ? vehcles.map((item, index) => {
                        return (
                            <option key={index} value={item.id}>{item.vehicleNo}</option>
                        )
                    }) : ''}
                </select>

                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    type="text"
                    name="price"
                    className="form-control"
                    value={price}
                    required
                    placeholder="Trip ammount"
                    onChange={e => setPrice(e.target.value)}
                />
                <label htmlFor="tripDate">Trip Date</label>
                <input
                    id="tripDate"
                    type="text"
                    name="tripDate"
                    className="form-control"
                    value={tripDate}
                    placeholder="DD/MM/YYYY"
                    required
                    onChange={e => setTripDate(e.target.value)}
                />
                <br />
                <div style={{ textAlign: 'center' }}>
                    <Link
                        to={"/bookings"}
                    >
                        <button className="btn btn-outline-dark" style={{ marginRight: '10px' }}>
                            Cancel
                        </button>
                    </Link>
                    <button className="btn btn-success">
                        Submit
                    </button>
                </div>

                {unavailableStatus && <div>
                    <br />
                    <br />
                    <span style={{ color: 'red' }}> Driver/Vehicle unavailable for selected date - {tripDate}</span>
                </div>
                }
            </form>
        </div>

    </>
};

export default AddBooking;
