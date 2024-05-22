// import React from 'react';
// import { Card, Col } from 'react-bootstrap';
// import { Venue as VenueType } from '../utility/type';

// interface VenueCardProps {
//     venue: VenueType;
//     onClick: (id: string) => void;
// }

// const VenueCard: React.FC<VenueCardProps> = ({ venue, onClick }) => {
//     return (
//         <Col key={venue.id}>
//             <Card onClick={() => onClick(venue.id)} style={{ cursor: 'pointer' }}>
//                 {venue.media.length > 0 && (
//                     <img src={venue.media[0].url} alt={`Media`} className='card-img-top' />
//                 )}
//                 <Card.Body>
//                     <Card.Text className='rating'>{venue.rating ? `${venue.rating}/5` : 'Rating: N/A'}</Card.Text>
//                     <Card.Text className='city'>{venue.location && venue.location.city ? venue.location.city : 'City: N/A'}</Card.Text>
//                     <div className='d-flex justify-content-between'>
//                         <Card.Text className='name'>{venue.name ? venue.name : 'Name: N/A'}</Card.Text>
//                         <Card.Text className='price'>{venue.price ? `${venue.price} NOK` : 'Price: N/A'}</Card.Text>
//                     </div>
//                 </Card.Body>
//             </Card>
//         </Col>
//     );
// };

// export default VenueCard;

// src/components/venueCard.tsx
import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Venue as VenueType } from '../utility/type';

interface VenueCardProps {
    venue: VenueType;
    onClick: (id: string) => void;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue, onClick }) => {
    return (
        <Col key={venue.id}>
            <Card onClick={() => onClick(venue.id)} style={{ cursor: 'pointer' }}>
                {venue.media.length > 0 && (
                    <img src={venue.media[0].url} alt={`Media`} className='card-img-top' />
                )}
                <Card.Body>
                    <Card.Text className='rating'>{venue.rating ? `${venue.rating}/5` : 'Rating: N/A'}</Card.Text>
                    <Card.Text className='city'>{venue.location && venue.location.city ? venue.location.city : 'City: N/A'}</Card.Text>
                    <div className='d-flex justify-content-between'>
                        <Card.Text className='name'>{venue.name ? venue.name : 'Name: N/A'}</Card.Text>
                        <Card.Text className='price'>{venue.price ? `${venue.price} NOK` : 'Price: N/A'}</Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default VenueCard;

