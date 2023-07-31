import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import { Switch } from 'react-router-dom'

import Login from './components/Login.component';
import Profile from './components/Profile.component';
import AuthService from "./services/auth-service";


import Drivers from './components/Drivers';
import Vehicles from './components/Vehicles';
import Trips from './components/Trips';
import Booking from './components/Bookings';
import AddDriver from './components/AddDriver';
import AddVehicle from "./components/AddVehicle";
import AddBooking from "./components/AddBooking";
import StartStopTrip from "./components/StartStopTrip";

class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.role === 'Admin' ? true : false,
      });
    }
  }

  logOut() {
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
    AuthService.logout();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={["/", "/login"]} component={Login} />
          <Route exact path="/drivers" component={Drivers} />
          <Route exact path="/vehicles" component={Vehicles} />
          <Route exact path="/trips" component={Trips} />
          <Route exact path="/bookings" component={Booking} />
          <Route exact path="/add-driver" component={AddDriver} />
          <Route exact path="/add-vehicle" component={AddVehicle} />
          <Route exact path="/add-booking" component={AddBooking} />
          <Route exact path="/update-trip-status" component={StartStopTrip} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    );
  }
}

export default App ;


