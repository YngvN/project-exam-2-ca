import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVenuesStart, fetchVenuesSuccess, fetchVenuesFailure } from '../../utility/redux/redux.venuesSlice';
import { RootState } from '../../utility/redux/redux.store';
import VenueComponent from './venueTile';
import { fetchAllVenues } from '../../utility/actions/venues/fetchVenues';
import { Card, Row, Col } from 'react-bootstrap';

const VenueList = () => {
    const dispatch = useDispatch();
    const { venues, loading, error } = useSelector((state: RootState) => state.venues);

    useEffect(() => {
        dispatch(fetchVenuesStart());
        fetchAllVenues()
            .then(data => {
                // console.log("Fetched venues data:", data);
                dispatch(fetchVenuesSuccess(data));
            })
            .catch(err => {
                console.error("Error fetching venues:", err.message);
                dispatch(fetchVenuesFailure(err.message));
            });
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading venues: {error}</p>;

    // Check if venues is not undefined before mapping over it
    if (!venues) return null;


    return (
        <div className='venue-list'>
            <Row xs={1} md={3} className="g-4">
                {venues.map(venue => (
                    <Col key={venue.id}>
                        <Card>
                            <div className='image-gallery'>
                                {venue.media.length > 0 && (
                                    <img src={venue.media[0].url} alt={`Media`} className='card-img-top' />
                                )}
                            </div>
                            <Card.Body>
                                <Card.Title>{venue.name}</Card.Title>
                                <Card.Text className='price'>Price: {venue.price}</Card.Text>
                                <Card.Text className='rating'>Rating: {venue.rating}</Card.Text>
                                <Card.Text className='city'>City: {venue.location.city}</Card.Text>
                                {/* Render other venue details here */}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );

};

export default VenueList;
