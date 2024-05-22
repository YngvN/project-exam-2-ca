import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isSameDay } from 'date-fns';

const VenueBooking = ({ show, handleClose, unavailableDates }: { show: boolean, handleClose: () => void, unavailableDates: Date[] }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);

    const isUnavailable = (date: Date) => {
        return unavailableDates.some(unavailableDate => isSameDay(date, unavailableDate));
    };

    const highlightWithRanges = [
        {
            "react-datepicker__day--highlighted-custom-1": unavailableDates,
        },
    ];

    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        if (start && end && start > end) {
            setEndDate(start);
        } else {
            setEndDate(end);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title className="w-100 text-center">Book Your Stay</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex flex-column align-items-center">
                <div className="text-center">
                    <h5>Select Dates</h5>
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                        highlightDates={highlightWithRanges}
                        dayClassName={date =>
                            isUnavailable(date) ? "unavailable-date" : null
                        }
                    />
                </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
                <Button variant="secondary" onClick={handleClose} className="me-2">
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Confirm Booking
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default VenueBooking;
