// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchVenuesStart, fetchVenuesSuccess, fetchVenuesFailure } from '../../utility/redux/redux.venuesSlice';
// import { RootState } from '../../utility/redux/redux.store';
// import { fetchAllVenues } from '../../utility/actions/venues/fetchVenues';
// import { Card, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { Venue as VenueType } from '../../utility/type';

// const VenueList = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { venues, loading, error } = useSelector((state: RootState) => state.venues);

//     useEffect(() => {
//         dispatch(fetchVenuesStart());
//         fetchAllVenues()
//             .then(data => {
//                 dispatch(fetchVenuesSuccess(data));
//             })
//             .catch(err => {
//                 console.error("Error fetching venues:", err.message);
//                 dispatch(fetchVenuesFailure(err.message));
//             });
//     }, [dispatch]);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error loading venues: {error}</p>;

//     if (!venues) return null;

//     const handleCardClick = (id: string) => {
//         navigate(`/venue/${id}`);
//     };

//     return (
//         <div className='venue-list'>
//             <Row xs={1} md={3} className="g-4">
//                 {venues.map((venue: VenueType) => (
//                     <Col key={venue.id}>
//                         <Card onClick={() => handleCardClick(venue.id)} style={{ cursor: 'pointer' }}>
//                             {venue.media.length > 0 && (
//                                 <img src={venue.media[0].url} alt={`Media`} className='card-img-top' />
//                             )}
//                             <Card.Body>
//                                 <Card.Text className='rating'>{venue.rating ? `${venue.rating}/5` : 'Rating: N/A'}</Card.Text>
//                                 <Card.Text className='city'>{venue.location && venue.location.city ? venue.location.city : 'City: N/A'}</Card.Text>
//                                 <div className='d-flex justify-content-between'>
//                                     <Card.Text className='name'>{venue.name ? venue.name : 'Name: N/A'}</Card.Text>
//                                     <Card.Text className='price'>{venue.price ? `${venue.price} NOK` : 'Price: N/A'}</Card.Text>
//                                 </div>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>
//         </div>
//     );
// };

// export default VenueList;

// src/pages/home/venueList.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVenuesStart, fetchVenuesSuccess, fetchVenuesFailure } from '../../utility/redux/redux.venuesSlice';
import { RootState } from '../../utility/redux/redux.store';
import { fetchAllVenues } from '../../utility/actions/venues/fetchVenues';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Venue as VenueType } from '../../utility/type';
import VenueCard from '../../components/venueCard';

const VenueList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { venues, loading, error } = useSelector((state: RootState) => state.venues);

    useEffect(() => {
        dispatch(fetchVenuesStart());
        fetchAllVenues()
            .then(data => {
                dispatch(fetchVenuesSuccess(data));
            })
            .catch(err => {
                console.error("Error fetching venues:", err.message);
                dispatch(fetchVenuesFailure(err.message));
            });
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading venues: {error}</p>;

    if (!venues) return null;

    const handleCardClick = (id: string) => {
        navigate(`/venue/${id}`);
    };

    return (
        <div className='venue-list'>
            <Row xs={1} md={3} className="g-4">
                {venues.map((venue: VenueType) => (
                    <VenueCard key={venue.id} venue={venue} onClick={handleCardClick} />
                ))}
            </Row>
        </div>
    );
};

export default VenueList;
