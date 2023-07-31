import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import AuthService from '../services/auth-service';
import { Link } from "react-router-dom";

export default class AppContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      showAdminBoard: false
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser) {
      this.setState({
        currentUser: currentUser,
        showAdminBoard: currentUser.role === 'Admin' ? true : false
      })
    } else {
      this.setState({ redirect: "/login" }); //login
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    if (this.state?.redirect != null) {
      return <Redirect to={this.state.redirect} />
    }
    const { currentUser, showAdminBoard } = this.state;
    return (
      <div style={{ marginBottom: '25px' }}>
        <nav className={` ${showAdminBoard ? "navbar navbar-expand navbar-dark bg-dark" : "navbar navbar-expand navbar-dark bg-primary"}`}>
          <Link to={"/"} className="navbar-brand">
            <span style={{ marginLeft: '8px' }}><b>Vehicle Management</b></span>
          </Link>
          <div className="navbar-nav mr-auto">

            {!showAdminBoard ? (
              <li className="nav-item">
                <Link to={"/trips"} className="nav-link">
                  Assigned trips
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to={"/drivers"} className="nav-link">
                    Drivers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/vehicles"} className="nav-link">
                    Vehicles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/bookings"} className="nav-link">
                    Bookings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/trips"} className="nav-link">
                    trips
                  </Link>
                </li>
              </>
            )}
          </div>

          {currentUser && (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.name}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          )}
        </nav>
      </div>
    )
  }
}
