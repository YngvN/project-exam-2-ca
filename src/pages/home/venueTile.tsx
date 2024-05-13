// import React from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../utility/redux/redux.store';

// const VenueComponent = () => {
//     // Assuming you have a Redux store and the state is typed with `RootState`
//     const venues = useSelector((state: RootState) => state.venues);

//     return (
//         <div>
//             {venues.map(venue => (
//                 <div key={venue.id}>
//                     <h2>{venue.name}</h2>
//                     {/* Other venue details */}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default VenueComponent;

import React from 'react';
import { Venue } from '../../utility/type';

const VenueComponent = ({ venue }: { venue: Venue }) => {
    return (
        <div>
            <h2>{venue.name}</h2>
            {/* Other venue details */}
        </div>
    );
};

export default VenueComponent;

// import React from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../utility/redux/redux.store';
// import { Venue } from '../../utility/type';

// const VenueComponent = () => {
//     // Assuming you have a Redux store and the state is typed with `RootState`
//     const venues = useSelector((state: RootState) => state.venues.venues);

//     return (
//         <div>
//             {venues.map((venue: Venue) => (
//                 <div key={venue.id}>
//                     <h2>{venue.name}</h2>
//                     {/* Other venue details */}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default VenueComponent;
