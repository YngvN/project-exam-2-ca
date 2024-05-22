import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Placeholder from "../imgProfilePlaceholder.png";
import iconX from "../iconX.png";
import logo from "../logo.png";
import { Row } from "react-bootstrap";

export function Nav() {
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
        <nav>
            <Row className="links-desktop">
                <ul>
                    <li>
                        <Link to="/home" onClick={closeDropdown}>Home</Link>
                    </li>
                    <li>
                        <Link to="/profile" onClick={closeDropdown}>My profile</Link>
                    </li>
                    <li>
                        <Link to="/booking" onClick={closeDropdown}>Booking</Link>
                    </li>
                </ul>
            </Row>
            <div className={`dropdown ${isOpen ? "open" : ""}`}>
                <button className="dropdown-toggle" onClick={toggleDropdown}>
                    {profileImg ? (
                        <img src={profileImg} alt="Profile" className="img-profile" />
                    ) : (
                        <img src={Placeholder} alt="Profile Placeholder" className="img-profile" />
                    )}
                    {isOpen && <img src={iconX} alt="Close" className="icon" />}
                </button>
                {isOpen && (
                    <ul className="dropdown-menu">
                        <div className="user-info">
                            <h2>{username}</h2>
                            {profileImg ? (
                                <img src={profileImg} alt="Profile" className="img-profile" />
                            ) : (
                                <img src={Placeholder} alt="Profile Placeholder" className="img-profile" />
                            )}
                        </div>
                        <div className="links">
                            <li>
                                <Link to="/home" onClick={closeDropdown}>Home</Link>
                            </li>
                            <li>
                                <Link to="/profile" onClick={closeDropdown}>My profile</Link>
                            </li>
                            <li>
                                <Link to="/booking" onClick={closeDropdown}>Booking</Link>
                            </li>
                        </div>
                        <button className="btn-logout" onClick={handleLogout}>Log out</button>
                        <img src={logo} alt="Holidaze Globe Logo" className="logo-image" />
                    </ul>
                )}
            </div>
        </nav>
    );
}
