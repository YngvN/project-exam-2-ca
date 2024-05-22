import React from "react";
import { Container, Carousel, Button, Row } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import back from '../../iconBack.png';
import plus from '../../iconPlus.png'


function Booking() {
    const navigate = useNavigate();
    return (
        <Container className='bookings'>
            <Row className="d-flex align-items-center mb-4 top-row">
                <button onClick={() => navigate(-1)} className="btn btn-back">
                    <img src={back} alt="Icon back" className="icon icon-back" />
                    Back
                </button>
                <button onClick={() => navigate(-1)} className="btn btn-back">
                    <img src={plus} alt="Icon plus" className="icon icon-plus" />
                    New Venue
                </button>
            </Row>



        </Container>
    );
};


export default Booking;

