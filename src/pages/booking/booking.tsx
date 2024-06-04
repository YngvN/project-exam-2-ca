

import React, { useEffect, useState } from "react";
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import back from '../../iconBack.png';
import plus from '../../iconPlus.png';
import { UserData } from '../../utility/type';
import NewVenueModal from './newVenue';

function Booking() {
    const navigate = useNavigate();
    const [isManager, setIsManager] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const userDataString = sessionStorage.getItem('userData') || localStorage.getItem('userData');
        if (userDataString) {
            try {
                const userDataObj: UserData = JSON.parse(userDataString);
                setIsManager(userDataObj.data.venueManager);
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    const handleNewVenueSubmit = (data: any) => {
        console.log('New Venue Data:', data);
    };

    return (
        <Container className='bookings'>
            <Row className="d-flex align-items-center mb-4 top-row">
                <button onClick={() => navigate(-1)} className="btn btn-back">
                    <img src={back} alt="Icon back" className="icon icon-back" />
                    Back
                </button>
                {isManager && (
                    <button onClick={() => setShowModal(true)} className="btn btn-back">
                        <img src={plus} alt="Icon plus" className="icon icon-plus" />
                        New Venue
                    </button>
                )}
            </Row>
            <NewVenueModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSubmit={handleNewVenueSubmit}
            />
        </Container>
    );
}

export default Booking;
