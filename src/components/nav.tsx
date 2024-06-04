import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Row, Col } from "react-bootstrap";
import Placeholder from "../imgProfilePlaceholder.png";
import iconX from "../iconX.png";
import logo from "../logo.png";

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [profileImg, setProfileImg] = useState(null);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const userData = sessionStorage.getItem('userData') || localStorage.getItem('userData');
        if (userData) {
            const userDataObj = JSON.parse(userData);

            if (userDataObj.data.avatar && userDataObj.data.avatar.url) {
                setProfileImg(userDataObj.data.avatar.url);
            }
            setUsername(userDataObj.data.name);
        }
    }, []);

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('userData');
        localStorage.removeItem('userData');
        navigate('/login');
    };

    return (
        <Navbar expand="lg" className="navigation">
            <Row className="nav-row">
                {/* <Col md={8} className="d-none d-md-block"> */}
                <Nav className="mr-auto desktop-links">
                    <Nav.Link as={Link} to="/home" onClick={closeDropdown}>Home</Nav.Link>
                    <Nav.Link as={Link} to="/profile" onClick={closeDropdown}>My Profile</Nav.Link>
                    <Nav.Link as={Link} to="/booking" onClick={closeDropdown}>Booking</Nav.Link>
                </Nav>
                {/* </Col> */}
            </Row>
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleDropdown} /> */}
            <Navbar.Collapse id="basic-navbar-nav" className={`dropdown ${isOpen ? "open" : ""}`}>
                <Nav className="mr-auto"></Nav>
                <NavDropdown title={isOpen ? null : <div className="user-info user-info-button">
                    <h2 className="username">{username}</h2>
                    {profileImg ? (
                        <img src={profileImg} alt="Profile" className="img-profile" />
                    ) : (
                        <img src={Placeholder} alt="Profile Placeholder" className="img-profile" />
                    )}
                </div>} id="basic-nav-dropdown">
                    <div className="user-info user-info-dropdown">
                        <h2>{username}</h2>
                        {profileImg ? (
                            <img src={profileImg} alt="Profile" className="img-profile" />
                        ) : (
                            <img src={Placeholder} alt="Profile Placeholder" className="img-profile" />
                        )}
                    </div>
                    <NavDropdown.Item className="btn-primary" as={Link} to="/home" onClick={closeDropdown}>Home</NavDropdown.Item>
                    <NavDropdown.Item className="btn-primary" as={Link} to="/profile" onClick={closeDropdown}>My Profile</NavDropdown.Item>
                    <NavDropdown.Item className="btn-primary" as={Link} to="/booking" onClick={closeDropdown}>Booking</NavDropdown.Item>
                    <NavDropdown.Item className="btn-secondary btn-logout" onClick={handleLogout}>Log out</NavDropdown.Item>
                </NavDropdown>
            </Navbar.Collapse>
        </Navbar>
    );
}
