import "./Navbar.css";
import React, { Component } from "react";
class Navbar extends Component {
    render () {
    return(
        <nav className="navbar">
            <div className="nav_icon" onClick={this.props.openSidebar}>
                <i className="fa fa-bars"></i>
            </div>
            <div className="navbar__left">
                <a href="/" className="font-bold text-title">
                    Home
                </a>
                <a href="/" className="font-bold text-title">
                    Home
                </a>
                <a href="/" className="font-bold text-title">
                    Home
                </a>
                {/* <a href="#">Subscribers</a>
                <a href="#">Video Management</a>
                <a className="active_link" href="#">Admin</a> */}
            </div>
            <div className="navbar__right">
                <a href="/">
                    <i className="fa fa-search"></i>
                </a>
                <a href="/">
                    <i className="fa fa-clock-o"></i>
                </a>
                <a href="/" data-toggle="tooltip" data-placement="bottom" title="Logout">
                    <i className="fa fa-power-off text-danger"></i>
                </a>
            </div>
        </nav>
    )
            }
}

export default Navbar