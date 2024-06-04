import React from "react";
import VenueList from "./venueList";
// import { useSelector, useDispatch } from 'react-redux';


function Home() {
    return (
        <div>
            <h1>Home</h1>
            <div className="container">
                <h2>H2 Header</h2>
                <p>Some text.</p>
                <button>Button</button>
            </div>
            <VenueList />
        </div>
    );
}

export default Home;

