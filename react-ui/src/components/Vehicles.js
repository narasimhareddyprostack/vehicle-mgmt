import React, { useState, useEffect } from "react";
import AppContainer from "./AppContainer.component";
import AuthService from '../services/auth-service';
import { Link } from "react-router-dom";

const Vehicles = () => {

    const [vehicles, setVehicles] = useState();

    useEffect(() => {
        getVehicles();
    }, []);

    const getVehicles = () => {
        AuthService.getVehicles().then(
            (res) => {
                if (res.data) {
                    setVehicles(res.data);
                }
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
                    to={"/add-vehicle"}>
                    <button style={{ float: 'right', marginRight: '10px' }}
                        className="btn btn-success"
                        type="button" >
                        Add Vehicle
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
                                    <th scope="col">Id</th>
                                    <th scope="col">Vehicle No</th>
                                    <th scope="col">Vehicle Exp Date</th>
                                    <th scope='col'>Status</th>
                                </tr>
                            </thead>

                            {vehicles ? vehicles.map((vehicle, index) => {
                                return (
                                    <tbody key={index}>
                                        <tr>
                                            <td scope="col">{vehicle?.id}</td>
                                            <td scope="col">{vehicle?.vehicleNo}</td>
                                            <td scope="col">{vehicle?.expDate}</td>
                                            <td scope="col">{vehicle?.status}</td>
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

export default Vehicles;