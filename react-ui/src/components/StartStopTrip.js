import React, { useState, useEffect } from "react";
import AppContainer from "./AppContainer.component";
import { Link } from "react-router-dom";
import AuthService from '../services/auth-service';
import { useHistory } from "react-router-dom";

const StartStopTrip = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const [bookingId, setBookingId] = useState();
    const [type, setType] = useState();
    const [startPoint, setStartPoint] = useState();
    const [endPoint, setEndPoint] = useState();
    let history = useHistory();

    useEffect(() => {
        setBookingId(queryParameters.get("bookingId"));
        setType(queryParameters.get("type"));
    }, []);

    const handleStart = e => {
        e.preventDefault();
        const reqObject = {
            startPoint: startPoint,
            booking: {
                id: bookingId
            }
        }
        AuthService.startTrip(reqObject).then(
            () => {
                history.push("/trips");
            },
            error => {
                console.log(error.toString())
            }
        );
    };

    const handleEndTrip = e => {
        e.preventDefault();
        const reqObject = {
            endPoint: endPoint,
            booking: {
                id: bookingId
            }
        }
        AuthService.endTrip(reqObject).then(
            () => {
                history.push("/trips");
            },
            error => {
                console.log(error.toString())
            }
        );
    };

    return <>
        <AppContainer />
        <div className="small-container" style={{ marginLeft: '10%', marginRight: '50%' }}>
            {type === 'Running' ? <div>
                <form onSubmit={handleEndTrip}>
                    <h1>End Trip</h1>
                    <br />
                    <label htmlFor="endPoint">End point (Meter reading)</label>
                    <input
                        id="endPoint"
                        type="text"
                        name="endPoint"
                        className="form-control"
                        value={endPoint}
                        required
                        placeholder="End point"
                        onChange={e => setEndPoint(e.target.value)}
                    />
                    <br />
                    <div style={{ textAlign: 'center' }}>
                        <Link
                            to={"/trips"}
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
            </div> :
                <form onSubmit={handleStart}>
                    <h1>Start Trip</h1>
                    <br />
                    <label htmlFor="startPoint">Start point (Meter reading)</label>
                    <input
                        id="startPoint"
                        type="text"
                        name="startPoint"
                        className="form-control"
                        value={startPoint}
                        required
                        placeholder="Start point"
                        onChange={e => setStartPoint(e.target.value)}
                    />
                    <br />
                    <div style={{ textAlign: 'center' }}>
                        <Link
                            to={"/trips"}
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
            }
        </div>

    </>
};

export default StartStopTrip;
