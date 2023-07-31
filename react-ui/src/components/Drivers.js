import React, { useState, useEffect } from "react";
import AppContainer from "./AppContainer.component";
import AuthService from '../services/auth-service';
import { Link } from "react-router-dom";

const Drivers = () => {

    const [drivers, setDrivers] = useState();

    useEffect(() => {
        getDrivers();
    }, []);

    const getDrivers = () => {
        AuthService.getDrivers().then(
            (res) => {
                if (res.data) {
                    setDrivers(res.data);
                }
                console.log(drivers);
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
                    to={"/add-driver"}>
                    <button style={{ float: 'right', marginRight: '10px' }}
                        className="btn btn-success"
                        type="button" >
                        Add Driver
                    </button>
                </Link>
            </div>
            <br></br>
            <br></br>
            <div className="col-md-12">
                {/* <h4>Drivers</h4> */}


                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Driver name</th>
                                    <th scope="col">Mobile Number</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">LicenseNo</th>
                                    <th scope='col'>Status</th>
                                </tr>
                            </thead>

                            {drivers ? drivers.map((driver, index) => {
                                return (
                                    <tbody key={index}>
                                        <tr>
                                            <td scope="col">{driver?.id}</td>
                                            <td scope="col">{driver?.name}</td>
                                            <td scope="col">{driver?.mobileNo}</td>
                                            <td scope="col">{driver?.email}</td>
                                            <td scope="col">{driver?.licenseNo}</td>
                                            <td scope="col">{driver?.status}</td>
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

export default Drivers;