import React, { useState } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";

interface NewVenueModalProps {
    show: boolean;
    handleClose: () => void;
    handleSubmit: (data: any) => void;
}

const NewVenueModal: React.FC<NewVenueModalProps> = ({ show, handleClose, handleSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaAlt, setMediaAlt] = useState('');
    const [price, setPrice] = useState(0);
    const [maxGuests, setMaxGuests] = useState(0);
    const [wifi, setWifi] = useState(false);
    const [parking, setParking] = useState(false);
    const [breakfast, setBreakfast] = useState(false);
    const [pets, setPets] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [continent, setContinent] = useState('');
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newVenueData = {
            name,
            description,
            media: mediaUrl ? [{ url: mediaUrl, alt: mediaAlt }] : [],
            price,
            maxGuests,
            rating: 0,
            meta: {
                wifi,
                parking,
                breakfast,
                pets
            },
            location: {
                address,
                city,
                zip,
                country,
                continent,
                lat,
                lng
            }
        };
        handleSubmit(newVenueData);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create New Venue</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleFormSubmit}>
                    <FloatingLabel controlId="formName" label="Name" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Venue Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="formDescription" label="Description" className="mb-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Venue Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="formMediaUrl" label="Media URL" className="mb-3">
                        <Form.Control
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={mediaUrl}
                            onChange={(e) => setMediaUrl(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="formMediaAlt" label="Media Alt Text" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Image description"
                            value={mediaAlt}
                            onChange={(e) => setMediaAlt(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="formPrice" label="Price" className="mb-3">
                        <Form.Control
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            required
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="formMaxGuests" label="Max Guests" className="mb-3">
                        <Form.Control
                            type="number"
                            placeholder="Max Guests"
                            value={maxGuests}
                            onChange={(e) => setMaxGuests(Number(e.target.value))}
                            required
                        />
                    </FloatingLabel>
                    <Form.Group controlId="formWifi" className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Wifi"
                            checked={wifi}
                            onChange={(e) => setWifi(e.target.checked)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formParking" className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Parking"
                            checked={parking}
                            onChange={(e) => setParking(e.target.checked)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBreakfast" className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Breakfast"
                            checked={breakfast}
                            onChange={(e) => setBreakfast(e.target.checked)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPets" className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Pets"
                            checked={pets}
                            onChange={(e) => setPets(e.target.checked)}
                        />
                    </Form.Group>
                    <FloatingLabel controlId="formAddress" label="Address" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="formCity" label="City" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="formZip" label="Zip" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Zip"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="formCountry" label="Country" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="formContinent" label="Continent" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Continent"
                            value={continent}
                            onChange={(e) => setContinent(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="formLat" label="Latitude" className="mb-3">
                        <Form.Control
                            type="number"
                            placeholder="Latitude"
                            value={lat}
                            onChange={(e) => setLat(Number(e.target.value))}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="formLng" label="Longitude" className="mb-3">
                        <Form.Control
                            type="number"
                            placeholder="Longitude"
                            value={lng}
                            onChange={(e) => setLng(Number(e.target.value))}
                        />
                    </FloatingLabel>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default NewVenueModal;
