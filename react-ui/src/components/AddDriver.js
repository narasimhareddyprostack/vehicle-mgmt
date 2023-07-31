import React, { useState } from "react";
import AppContainer from "./AppContainer.component";
import { Link } from "react-router-dom";
import AuthService from '../services/auth-service';
import { useHistory } from "react-router-dom";



const AddDriver = () => {
    const [name, setName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [licenseNo, setLicenseNo] = useState('');
    let history = useHistory();

    const handleAdd = e => {
        e.preventDefault();
        const reqObject = {
            name: name,
            mobileNo: mobileNo,
            email: email,
            role: "Driver",
            licenseNo: licenseNo
        }
        AuthService.addDriver(reqObject).then(
            () => {
                history.push("/drivers");
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
                <h1>Add Driver</h1>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    required
                    placeholder="Name"
                    onChange={e => setName(e.target.value)}
                />
                <label htmlFor="mobileNo">Mobile No</label>
                <input
                    id="mobileNo"
                    type="text"
                    name="mobileNo"
                    className="form-control"
                    value={mobileNo}
                    required
                    placeholder="Mobile number"
                    onChange={e => setMobileNo(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    required
                    placeholder="Email address"
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="licenseNo">License No</label>
                <input
                    id="licenseNo"
                    type="text"
                    name="licenseNo"
                    className="form-control"
                    value={licenseNo}
                    required
                    placeholder="License number"
                    onChange={e => setLicenseNo(e.target.value)}
                />
                <br />

                <div style={{ textAlign: 'center' }}>
                    <Link
                        to={"/drivers"}
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

export default AddDriver;
