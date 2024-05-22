// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Container, Carousel, Button, Row } from 'react-bootstrap';
// import { fetchVenueById } from '../../utility/actions/venues/fetchVenueById';
// import { Venue as VenueType } from '../../utility/type';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
// import icon from "../../iconBack.png";
// import VenueBooking from './venueBooking';

// const Venue = () => {
//     const { id } = useParams<{ id: string }>();
//     const navigate = useNavigate();
//     const [venue, setVenue] = useState<VenueType | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [showModal, setShowModal] = useState(false);

//     useEffect(() => {
//         if (id) {
//             fetchVenueById(id)
//                 .then(data => {
//                     setVenue(data);
//                     setLoading(false);
//                 })
//                 .catch(err => {
//                     setError(err.message);
//                     setLoading(false);
//                 });
//         }
//     }, [id]);

//     const handleButtonClick = () => {
//         const userData = sessionStorage.getItem('userData') || localStorage.getItem('userData');
//         if (userData) {
//             setShowModal(true);
//         } else {
//             navigate('/login');
//         }
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error loading venue: {error}</p>;

//     if (!venue) return <p>Venue not found</p>;

//     const userData = sessionStorage.getItem('userData') || localStorage.getItem('userData');
//     const buttonText = userData ? 'Book Now' : 'Sign In';
//     const lastUpdated = new Date(venue.updated).toLocaleString();

//     return (
//         <Container className='venue-details'>
//             <Row className="venue-top d-flex align-items-center mb-4">
//                 <button onClick={() => navigate(-1)} className="btn btn-back">
//                     <img src={icon} alt="Icon back" className="icon" />
//                     Back
//                 </button>
//                 <h1 className='ms-3'>{venue.name}</h1>
//             </Row>
//             {venue.media && venue.media.length > 0 ? (
//                 <Carousel className='mb-4'>
//                     {venue.media.map((mediaItem, index) => (
//                         <Carousel.Item key={index}>
//                             <img
//                                 src={mediaItem.url}
//                                 alt={mediaItem.alt || 'Media'}
//                                 className='d-block w-100'
//                             />
//                         </Carousel.Item>
//                     ))}
//                 </Carousel>
//             ) : (
//                 <p>No media available</p>
//             )}

//             <Row className='d-flex mb-4'>
//                 <p>{venue.location.city}</p>
//                 <p className='rating'>{venue.rating ? `${venue.rating}/5` : 'Rating: N/A'}</p>
//             </Row>
//             <Row className='d-flex mb-4'>
//                 <p>Address: {venue.location.address}</p>
//                 <p className='maxGuests'>Max Guests: {venue.maxGuests}</p>
//             </Row>

//             <p className='description'>{venue.description || 'Description: N/A'}</p>
//             <p className='price'>
//                 {venue.price ? <><b>{venue.price} NOK</b>  per night</> : 'Price: N/A'}
//             </p>

//             <h2>Location</h2>
//             <p>Address: {venue.location.address || 'N/A'}</p>
//             <p>City: {venue.location.city || 'N/A'}</p>
//             <p>Zip: {venue.location.zip || 'N/A'}</p>
//             <p>Country: {venue.location.country || 'N/A'}</p>
//             <p>Continent: {venue.location.continent || 'N/A'}</p>
//             <p>Latitude: {venue.location.lat}</p>
//             <p>Longitude: {venue.location.lng}</p>
//             <h2>Amenities</h2>
//             <p>Wifi: {venue.meta.wifi ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</p>
//             <p>Parking: {venue.meta.parking ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</p>
//             <p>Breakfast: {venue.meta.breakfast ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</p>
//             <p>Pets: {venue.meta.pets ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</p>
//             <p className='mt-4'><strong>Last updated:</strong> {lastUpdated}</p>
//             <Button onClick={handleButtonClick} className='mt-4'>{buttonText}</Button>

//             <VenueBooking show={showModal} handleClose={handleCloseModal} />
//         </Container>
//     );
// };

// export default Venue;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Carousel, Button, Row } from 'react-bootstrap';
import { fetchVenueById } from '../../utility/actions/venues/fetchVenueById';
import { fetchBookingsByVenueId } from '../../utility/actions/venues/fetchBookingsByVenueId';
import { Venue as VenueType } from '../../utility/type';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import icon from "../../iconBack.png";
import VenueBooking from './venueBooking';

const Venue = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [venue, setVenue] = useState<VenueType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

    useEffect(() => {
        if (id) {
            fetchVenueById(id)
                .then(data => {
                    setVenue(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
            fetchBookingsByVenueId(id)
                .then(data => {
                    const dates = data.map((booking: any) => {
                        const start = new Date(booking.dateFrom);
                        const end = new Date(booking.dateTo);
                        const dateArray = [];
                        let currentDate = start;
                        while (currentDate <= end) {
                            dateArray.push(new Date(currentDate));
                            currentDate.setDate(currentDate.getDate() + 1);
                        }
                        return dateArray;
                    }).flat();
                    setUnavailableDates(dates);
                })
                .catch(err => {
                    console.error("Error fetching bookings:", err);
                });
        }
    }, [id]);

    const handleButtonClick = () => {
        const userData = sessionStorage.getItem('userData') || localStorage.getItem('userData');
        if (userData) {
            setShowModal(true);
        } else {
            navigate('/login');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading venue: {error}</p>;

    if (!venue) return <p>Venue not found</p>;

    const userData = sessionStorage.getItem('userData') || localStorage.getItem('userData');
    const buttonText = userData ? 'Book Now' : 'Sign In';
    const lastUpdated = new Date(venue.updated).toLocaleString();

    return (
        <Container className='venue-details'>
            <Row className="venue-top d-flex align-items-center mb-4">
                <button onClick={() => navigate(-1)} className="btn btn-back">
                    <img src={icon} alt="Icon back" className="icon" />
                    Back
                </button>
                <h1 className='ms-3'>{venue.name}</h1>
            </Row>
            {venue.media && venue.media.length > 0 ? (
                <Carousel className='mb-4'>
                    {venue.media.map((mediaItem, index) => (
                        <Carousel.Item key={index}>
                            <img
                                src={mediaItem.url}
                                alt={mediaItem.alt || 'Media'}
                                className='d-block w-100'
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <p>No media available</p>
            )}

            <Row className='d-flex mb-4'>
                <p>{venue.location.city}</p>
                <p className='rating'>{venue.rating ? `${venue.rating}/5` : 'Rating: N/A'}</p>
            </Row>
            <Row className='d-flex mb-4'>
                <p>Address: {venue.location.address}</p>
                <p className='maxGuests'>Max Guests: {venue.maxGuests}</p>
            </Row>

            <p className='description'>{venue.description || 'Description: N/A'}</p>
            <p className='price'>
                {venue.price ? <><b>{venue.price} NOK</b>  per night</> : 'Price: N/A'}
            </p>

            <h2>Location</h2>
            <p>Address: {venue.location.address || 'N/A'}</p>
            <p>City: {venue.location.city || 'N/A'}</p>
            <p>Zip: {venue.location.zip || 'N/A'}</p>
            <p>Country: {venue.location.country || 'N/A'}</p>
            <p>Continent: {venue.location.continent || 'N/A'}</p>
            <p>Latitude: {venue.location.lat}</p>
            <p>Longitude: {venue.location.lng}</p>
            <h2>Amenities</h2>
            <p>Wifi: {venue.meta.wifi ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</p>
            <p>Parking: {venue.meta.parking ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</p>
            <p>Breakfast: {venue.meta.breakfast ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</p>
            <p>Pets: {venue.meta.pets ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}</p>
            <p className='mt-4'><strong>Last updated:</strong> {lastUpdated}</p>
            <Button onClick={handleButtonClick} className='mt-4'>{buttonText}</Button>

            <VenueBooking show={showModal} handleClose={handleCloseModal} unavailableDates={unavailableDates} />
        </Container>
    );
};

export default Venue;
