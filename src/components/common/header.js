import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { authenticationService } from '../../services/authenticationService';

export default class Header extends Component {

    componentDidMount() {
        var elem = document.querySelector('.sidenav');
        new M.Sidenav(elem, { edge: 'right' });
    }

    render() {
        return (
            <header className="menu">
                <nav className="">
                    <div className="nav-wrapper container">
                        <Link to="/feed" className="brand-logo left">
                            <span className='logo-prime-1'>Bit</span>
                            <span className='logo-prime-2'>Book</span></Link>
                        <a href='/' data-target="mobile-demo" className="sidenav-trigger button-collapse right"><i className="material-icons">menu</i></a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><Link to="/feed">Feed</Link></li>
                            <li><Link to="/people">People</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><a onClick={authenticationService.logout}>Logout </a> </li>
                        </ul>
                        <ul id="mobile-demo" className="sidenav">
                            <li><Link to="/feed">Feed</Link></li>
                            <li><Link to="/people">People</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><a onClick={authenticationService.logout}>Logout </a> </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}