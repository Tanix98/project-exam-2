import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function EditUserBooking(props) {
    // Modal
    const [open, setOpen] = useState(false);

    // Edit booking states
    const [editBookingFormData, setEditBookingFormData] = useState({
        dateFrom: '',
        dateTo: '',
        guests: '',
    });
    const [editBookingSubmitAlert, setEditBookingSubmitAlert] = useState('');

    // Booking original data
    const handleClose = () => {
        setOpen(false);
        setEditBookingSubmitAlert('');
    };
    const handleOpen = async () => {
        try {
            const getResponse = await fetch(
                `https://api.noroff.dev/api/v1/holidaze/bookings/${props.id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' +
                            localStorage
                                .getItem('userToken')
                                .replace(/['"]+/g, ''),
                    },
                }
            );
            const getData = await getResponse.json();

            if (getData.errors) {
                setEditBookingSubmitAlert(getData.errors[0].message);
            }

            if (!getData.errors) {
                setOpen(true);
                setEditBookingFormData({
                    ...editBookingFormData,
                    dateFrom: getData.dateFrom.substring(0, 10),
                    dateTo: getData.dateTo.substring(0, 10),
                    guests: getData.guests,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Edit booking
    const handleEditBooking = async () => {
        try {
            const response = await fetch(
                `https://api.noroff.dev/api/v1/holidaze/bookings/${props.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' +
                            localStorage
                                .getItem('userToken')
                                .replace(/['"]+/g, ''),
                    },
                    body: JSON.stringify(editBookingFormData),
                }
            );
            const data = await response.json();

            if (data.errors) {
                setEditBookingSubmitAlert(data.errors[0].message);
                if (
                    data.errors[0].message ===
                        'dateFrom cannot be in the past' ||
                    data.errors[0].message === 'dateTo cannot be in the past'
                ) {
                    setEditBookingSubmitAlert(
                        'Check-in and check-out dates cannot be in the past'
                    );
                }
                if (
                    data.errors[0].message === 'dateFrom cannot be after dateTo'
                ) {
                    setEditBookingSubmitAlert(
                        'Check-in date cannot be after check-out date'
                    );
                }
            }

            if (!data.errors) {
                setEditBookingSubmitAlert();
                window.location.reload(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Buttons enter keypress
    function handleKeyDownOpen(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleOpen();
        }
    }
    function handleKeyDownEdit(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleEditBooking();
        }
    }
    function handleKeyDownClose(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleClose();
        }
    }

    // Edit forms
    function handleCheckinChange(e) {
        setEditBookingFormData({
            ...editBookingFormData,
            dateFrom: e.target.value,
        });
    }
    function handleCheckoutChange(e) {
        setEditBookingFormData({
            ...editBookingFormData,
            dateTo: e.target.value,
        });
    }
    function handleGuestsChange(e) {
        setEditBookingFormData({
            ...editBookingFormData,
            guests: e.target.value,
        });
    }
    function handleKeyDownGuests(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            handleEditBooking();
        }
    }

    return (
        <div>
            <Button
                variant='primary'
                className='rounded-pill w-100'
                onClick={handleOpen}
                onKeyDown={handleKeyDownOpen}
            >
                Edit
            </Button>

            <Modal
                show={open}
                onHide={handleClose}
                animation={false}
                size='sm'
                className='mt-5'
            >
                <Modal.Body>
                    <Form.Label>Guests</Form.Label>
                    <Form.Control
                        type='number'
                        min='1'
                        value={editBookingFormData.guests}
                        onChange={handleGuestsChange}
                        onKeyDown={handleKeyDownGuests}
                        className='mb-2'
                        autoFocus
                    />
                    <Form.Label>Check-in</Form.Label>
                    <Form.Control
                        type='date'
                        placeholder='Enter check-in date'
                        value={editBookingFormData.dateFrom}
                        onChange={handleCheckinChange}
                        onKeyDown={handleKeyDownEdit}
                        className='mb-2'
                    />
                    <Form.Label>Check-out</Form.Label>
                    <Form.Control
                        type='date'
                        placeholder='Enter check-out date'
                        value={editBookingFormData.dateTo}
                        onChange={handleCheckoutChange}
                        onKeyDown={handleKeyDownEdit}
                        className='mb-2'
                    />
                    <Form.Text className='text-danger'>
                        {editBookingSubmitAlert.substring(0, 200)}
                    </Form.Text>
                </Modal.Body>
                <Modal.Footer className='d-flex'>
                    <Button
                        variant='dark rounded-pill'
                        className='px-4 w-100 col'
                        onClick={handleClose}
                        onKeyDown={handleKeyDownClose}
                    >
                        Close
                    </Button>
                    <Button
                        variant='primary rounded-pill'
                        className='px-4 w-100 col text-nowrap'
                        onClick={handleEditBooking}
                        onKeyDown={handleKeyDownEdit}
                    >
                        Edit booking
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditUserBooking;
