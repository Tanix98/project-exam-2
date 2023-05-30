import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { DatePicker } from '@mui/x-date-pickers';
const dayjs = require('dayjs');
dayjs().format();

function EditUserBooking(props) {
    // Edit booking api call loading state
    const [isLoading, setIsLoading] = useState(false);

    //const navigate = useNavigate();

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
            setIsLoading(true);
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
                setIsLoading(false);
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
                if (data.errors[0].message === 'Guests must be a number') {
                    setEditBookingSubmitAlert('Guests must be a number');
                }
            }

            if (!data.errors) {
                /*setIsLoading(false);
                setEditBookingSubmitAlert();
                navigate(
                    `/profile/${localStorage
                        .getItem('userName')
                        .replace(/['"]+/g, '')}`
                );*/
                window.location.reload(false);
            }
            console.log(JSON.stringify(editBookingFormData));
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
    // Only allow numbers, shift and backspace
    function handleKeyDownNumber(event) {
        if (/[0-9]/.test(event.key)) {
            return;
        }
        if (event.keyCode === 8) {
            return;
        }
        if (event.keyCode === 9) {
            return;
        }
        event.preventDefault();
    }
    function handleKeyDownClose(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleClose();
        }
    }

    // Edit forms
    function handleGuestsChange(e) {
        if (Number(e.target.value) === 0) {
            setEditBookingFormData({
                ...editBookingFormData,
                guests: '',
            });
        } else {
            setEditBookingFormData({
                ...editBookingFormData,
                guests: Number(e.target.value),
            });
        }
    }

    return (
        <Col>
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
                className='mt-5 modal-width'
            >
                <Modal.Body>
                    <Form.Label htmlFor='edit-booking-guest-amount'>
                        Guests
                    </Form.Label>
                    <Form.Control
                        id='edit-booking-guest-amount'
                        type='number'
                        min={0}
                        value={editBookingFormData.guests}
                        onChange={handleGuestsChange}
                        onKeyDown={handleKeyDownNumber}
                        className='mb-2'
                        autoFocus
                    />
                    <div className='d-flex flex-column mt-1'>
                        <Form.Label htmlFor='edit-booking-check-in'>
                            Check-in
                        </Form.Label>
                        <DatePicker
                            id='edit-booking-check-in'
                            value={dayjs(editBookingFormData.dateFrom)}
                            className='mb-2'
                            disabled
                        />
                    </div>
                    <div className='d-flex flex-column mt-1'>
                        <Form.Label htmlFor='edit-booking-check-out'>
                            Check-out
                        </Form.Label>
                        <DatePicker
                            id='edit-booking-check-out'
                            value={dayjs(editBookingFormData.dateTo)}
                            className='mb-2'
                            disabled
                        />
                    </div>
                    <p className='text-danger'>
                        {editBookingSubmitAlert.substring(0, 200)}
                    </p>
                </Modal.Body>
                <Modal.Footer className='d-flex'>
                    {isLoading && (
                        <div className='text-center vw-100'>
                            <div className='lds-dual-ring'></div>
                            <p>Loading...</p>
                        </div>
                    )}
                    <Col>
                        {isLoading ? (
                            <Button
                                variant='primary rounded-pill'
                                className='w-100 text-nowrap'
                                onClick={handleEditBooking}
                                onKeyDown={handleKeyDownEdit}
                                disabled
                            >
                                Edit booking
                            </Button>
                        ) : (
                            <Button
                                variant='primary rounded-pill'
                                className='w-100 text-nowrap'
                                onClick={handleEditBooking}
                                onKeyDown={handleKeyDownEdit}
                            >
                                Edit booking
                            </Button>
                        )}
                    </Col>
                    <Col>
                        {isLoading ? (
                            <Button
                                variant='dark rounded-pill'
                                className='w-100'
                                onClick={handleClose}
                                onKeyDown={handleKeyDownClose}
                                disabled
                            >
                                Close
                            </Button>
                        ) : (
                            <Button
                                variant='dark rounded-pill'
                                className='w-100'
                                onClick={handleClose}
                                onKeyDown={handleKeyDownClose}
                            >
                                Close
                            </Button>
                        )}
                    </Col>
                </Modal.Footer>
            </Modal>
        </Col>
    );
}

export default EditUserBooking;
