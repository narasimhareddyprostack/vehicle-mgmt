import React, { useState } from "react";
import AppContainer from "./AppContainer.component";
import { Link } from "react-router-dom";
import AuthService from '../services/auth-service';
import { useHistory } from "react-router-dom";

const AddVehicle = () => {
    const [vehicleNo, setVehicleNo] = useState('');
    const [expDate, setExpDate] = useState('');
    let history = useHistory();

    const handleAdd = e => {
        e.preventDefault();
        const reqObject = {
            vehicleNo: vehicleNo,
            expDate: expDate,
            status: "Active"
        }
        AuthService.addVehicle(reqObject).then(
            () => {
                history.push("/vehicles");
            },
            error => {
                console.log(error.toString())
            }
        );
    };
    return <>
        <AppContainer />
        <div className="small-container" style={{ marginLeft: '10%', marginRight: '50%' }}>
            <form onSubmit={handleAdd}>
                <h1>Add Vehicle</h1>
                <label htmlFor="vehicleNo">Vehicle No</label>
                <input
                    id="vehicleNo"
                    type="text"
                    name="vehicleNo"
                    className="form-control"
                    value={vehicleNo}
                    required
                    placeholder="Vehicle registartion number"
                    onChange={e => setVehicleNo(e.target.value)}
                />
                <label htmlFor="expDate">Vehicle Exp Date</label>
                <input
                    id="expDate"
                    type="text"
                    name="expDate"
                    className="form-control"
                    value={expDate}
                    placeholder="DD/MM/YYYY"
                    required
                    onChange={e => setExpDate(e.target.value)}
                />
                <br />
                <div style={{ textAlign: 'center' }}>
                    <Link
                        to={"/vehicles"}
                    >
                        <button className="btn btn-outline-dark" style={{ marginRight: '10px' }}>
                            Cancel
                        </button>
                    </Link>
                    <button className="btn btn-success">
                        Submit
                    </button>
                </div>
            </form>
        </div>

    </>
};

export default AddVehicle;
