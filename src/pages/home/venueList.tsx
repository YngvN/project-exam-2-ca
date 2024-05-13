// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchVenuesStart, fetchVenuesSuccess, fetchVenuesFailure } from '../../utility/redux/redux.venuesSlice';
// import { RootState } from '../../utility/redux/redux.store';
// import VenueComponent from './venueTile';
// import { fetchAllVenues } from '../../utility/actions/venues/fetchVenues';

// const VenueList = () => {
//     const dispatch = useDispatch();
//     const { venues, loading, error } = useSelector((state: RootState) => state.venues);

//     useEffect(() => {
//         dispatch(fetchVenuesStart());
//         fetchAllVenues()
//             .then(data => {
//                 console.log("Fetched venues data:", data); // Log the fetched data
//                 dispatch(fetchVenuesSuccess(data));
//             })
//             .catch(err => {
//                 console.error("Error fetching venues:", err.message);
//                 dispatch(fetchVenuesFailure(err.message));
//             });
//     }, [dispatch]);


//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error loading venues: {error}</p>;
//     console.log(venues);

//     return (
//         <div>
//             {Array.isArray(venues) && venues.map(venue => <VenueComponent key={venue.id} venue={venue} />)}
//         </div>
//     );

// };

// export default VenueList;


import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVenuesStart, fetchVenuesSuccess, fetchVenuesFailure } from '../../utility/redux/redux.venuesSlice';
import { RootState } from '../../utility/redux/redux.store';
import VenueComponent from './venueTile';
import { fetchAllVenues } from '../../utility/actions/venues/fetchVenues';

const VenueList = () => {
    const dispatch = useDispatch();
    const { venues, loading, error } = useSelector((state: RootState) => state.venues);

    useEffect(() => {
        dispatch(fetchVenuesStart());
        fetchAllVenues()
            .then(data => {
                console.log("Fetched venues data:", data);
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
        <div>
            {venues.map(venue => (
                <div key={venue.id}>
                    <h2>{venue.name}</h2>
                    {/* Render other venue details here */}
                </div>
            ))}
        </div>
    );
};

export default VenueList;
