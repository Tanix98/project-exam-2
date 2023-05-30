import '../CreateBooking/index.css';
import UseApiGet from '../../api/UseApiGet';
import LoadingScreen from '../../components/LoadingScreen';
import LoadingError from '../../components/LoadingError';
import { Form, Container, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { StaticDatePicker } from '@mui/x-date-pickers';
const dayjs = require('dayjs');
dayjs().format();

export default function CreateBooking() {
    useEffect(() => {
        document.title = 'Create booking - Holidaze';
    }, []);

    let { id } = useParams();

    // Create booking api call loading state
    const [isLoadingPost, setIsLoadingPost] = useState(false);

    const navigate = useNavigate();

    // Create booking states

    /*const [selectedVenue, setSelectedVenue] = useState('');

    const [bookingStart, setBookingStart] = useState('');
    const [bookingEnd, setBookingEnd] = useState('');
    const [bookingGuests, setBookingGuests] = useState(1);*/
    const [createBookingFormData, setCreateBookingFormData] = useState({
        dateFrom: null,
        dateTo: null,
        guests: '',
        venueId: id,
    });
    const [createBookingSubmitAlert, setCreateBookingSubmitAlert] =
        useState('');

    // Get total amount of days when both dates have been picked
    const [totalDaysAmount, setTotalDaysAmount] = useState('');
    const [startDateRaw, setStartDateRaw] = useState('');
    const [endDateRaw, setEndDateRaw] = useState('');

    useEffect(() => {
        if (createBookingFormData.dateFrom && createBookingFormData.dateTo) {
            const differenceInDays = endDateRaw.diff(startDateRaw, 'days');
            setTotalDaysAmount(differenceInDays);
            console.log('submited dates are ');
            console.log(createBookingFormData.dateFrom);
            console.log(createBookingFormData.dateTo);
        }
    }, [
        createBookingFormData.dateFrom,
        createBookingFormData.dateTo,
        startDateRaw,
        endDateRaw,
    ]);

    const { data, isLoading, isError } = UseApiGet(
        `https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`
    );

    // Return new array without unecessary object parameters
    const [filteredVenueBookings, setFilteredVenueBookings] = useState('');
    const [venueBookingsDates, setVenueBookingsDates] = useState('');
    useEffect(() => {
        if (data.bookings) {
            setFilteredVenueBookings(
                data.bookings.map(function (booking) {
                    delete booking.id;
                    delete booking.guests;
                    delete booking.created;
                    delete booking.updated;
                    return booking;
                })
            );

            //getAllDates(filteredVenueBookings);
        }
    }, [data]);
    useEffect(() => {
        console.log(filteredVenueBookings);
        if (filteredVenueBookings) {
            const datesArray = [];

            filteredVenueBookings.forEach((booking) => {
                // Set dates to dayjs
                console.log('string date: ' + booking.dateFrom);
                const startDate = dayjs(booking.dateFrom);
                const endDate = dayjs(booking.dateTo);
                console.log('dayjs date: ');
                console.log(startDate);

                // Loop through the dates between start and end, and push them into new array
                let current = startDate;
                while (current.isBefore(endDate) || current.isSame(endDate)) {
                    datesArray.push(current.format('YYYY-MM-DD'));
                    current = current.add(1, 'day');
                }
            });

            setVenueBookingsDates(datesArray);
        }
    }, [filteredVenueBookings]);
    useEffect(() => {
        console.log('this is all da dates ');
        console.log(venueBookingsDates);
    }, [venueBookingsDates]);
    const getDisabledDates = (date) => {
        console.log(date.format('YYYY-MM-DD'));
        if (venueBookingsDates.includes(date.format('YYYY-MM-DD'))) {
            return true;
        }
    };
    /*function getAllDates(array) {
        const datesArray = [];

        array.forEach((booking) => {
            // Set dates to dayjs
            const startDate = dayjs(booking.dateFrom);
            const endDate = dayjs(booking.dateTo);

            // Loop through the dates and push them into the array
            let current = startDate;
            while (current.isBefore(endDate) || current.isSame(endDate)) {
                datesArray.push(current.format('YYYY-MM-DD'));
                current = current.add(1, 'day');
            }
        });

        setAllVenueBookingsDates(datesArray);

        return datesArray;
    }*/

    // Increase start date by one day and keep going until reaching end date, and put all the dates in a new array
    /*useEffect(() => {
        filteredDataBookings.map(function(booking) {
            booking.dateFrom.add(1, 'day'); 
        });
    }, [filteredVenueBookings])*/

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isError) {
        return <LoadingError />;
    }

    // Check if user logged in
    const linkLogin = (
        <Link to='/login' className='linkText' aria-label='Log in or sign up'>
            Go to log in page.
        </Link>
    );
    if (!localStorage.getItem('userName')) {
        return (
            <Container className='d-flex justify-content-center'>
                <div>
                    <h1 className='mb-3'>Access denied!</h1>
                    <p>
                        You must be logged in to create a booking. {linkLogin}
                    </p>
                </div>
            </Container>
        );
    }

    // Check if user owns venue
    /*
    const linkHome = (
        <Link to='/login' className='linkText' aria-label='Homepage'>
            Return to homepage.
        </Link>
    );
    if (
        data.owner.name ===
        localStorage.getItem('userName').replace(/['"]+/g, '')
    ) {
        return (
            <Container className='d-flex justify-content-center'>
                <div>
                    <h1 className='mb-3'>Access denied!</h1>
                    <p>
                        You cannot create a booking at a venue you own.{' '}
                        {linkHome}
                    </p>
                </div>
            </Container>
        );
    }
    */

    // Create venue function
    const handleCreateBooking = async () => {
        if (createBookingFormData.dateFrom === '') {
            return setCreateBookingSubmitAlert('Check-in date required');
        }
        if (createBookingFormData.dateTo === '') {
            return setCreateBookingSubmitAlert('Check-out date required');
        }
        if (createBookingFormData.guests <= 0) {
            return setCreateBookingSubmitAlert('Guests cannot be zero');
        }

        try {
            setIsLoadingPost(true);
            const response = await fetch(
                `https://api.noroff.dev/api/v1/holidaze/bookings`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer ' +
                            localStorage
                                .getItem('userToken')
                                .replace(/['"]+/g, ''),
                    },
                    body: JSON.stringify(createBookingFormData),
                }
            );
            const bookingData = await response.json();
            console.log(bookingData);

            if (bookingData.errors) {
                setIsLoadingPost(false);
                setCreateBookingSubmitAlert(bookingData.errors[0].message);
                if (bookingData.errors[0].message === 'dateFrom is required') {
                    setCreateBookingSubmitAlert('Check-in date is required');
                }
                if (bookingData.errors[0].message === 'dateTo is required') {
                    setCreateBookingSubmitAlert('Check-out date is required');
                }
                if (
                    bookingData.errors[0].message === 'Guests must be a number'
                ) {
                    setCreateBookingSubmitAlert('Guests must be a number');
                }
                if (bookingData.errors[0].message === 'venueId is required') {
                    setCreateBookingSubmitAlert('A venue must be selected');
                }
            }

            if (bookingData.id) {
                setIsLoadingPost(false);
                setCreateBookingSubmitAlert();
                navigate(
                    `/profile/${localStorage
                        .getItem('userName')
                        .replace(/['"]+/g, '')}`
                );
            }
            console.log(JSON.stringify(createBookingFormData));
        } catch (error) {
            console.log(error);
        }
    };

    // Do not allow typing in date
    /*function handleKeyDownDate(event) {
        event.preventDefault();
    }*/
    // On enter trigger create venue function
    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            handleCreateBooking();
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
    function handleKeyDownCancel(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            navigate(`/venue/${data.id}`);
        }
    }
    const handleCancel = (event) => {
        event.preventDefault();
        navigate(`/venue/${data.id}`);
    };

    const handleCheckinChange = (newValue) => {
        console.log(newValue);
        setCreateBookingFormData({
            ...createBookingFormData,
            dateFrom: newValue.format('YYYY-MM-DD'),
        });
        setStartDateRaw(newValue);
    };
    const handleCheckoutChange = (newValue) => {
        console.log(newValue);
        setCreateBookingFormData({
            ...createBookingFormData,
            dateTo: newValue.format('YYYY-MM-DD'),
        });
        setEndDateRaw(newValue);
    };
    const handleGuestsChange = (e) => {
        if (Number(e.target.value) === 0) {
            setCreateBookingFormData({
                ...createBookingFormData,
                guests: '',
            });
        } else {
            setCreateBookingFormData({
                ...createBookingFormData,
                guests: Number(e.target.value),
            });
        }
    };

    // Search for venue to book

    /*function handleKeyDownSearch(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            search();
            event.target.blur();
        }
    }*/

    /*function search() {
        navigate(`/Search/${searchWord}`);
    }*/

    /*
    <Form.Group>
        <Form.Label>Venue *</Form.Label>
            <Form.Control
                name='venue'
                type='text'
                alue={createBookingFormData.venueId}
                placeholder='Search for venue'
            ></Form.Control>
        </Form.Group>
    */

    return (
        <div>
            <Container className='formContainerLarge d-block'>
                <h1 className='mb-4'>{`Create booking at ${data.name}`}</h1>
                <Form className='d-flex flex-column gap-3'>
                    <Form.Group>
                        <Form.Label htmlFor='create-booking-guests'>
                            Guests *
                        </Form.Label>
                        <Form.Control
                            id='create-booking-guests'
                            type='number'
                            min={0}
                            value={createBookingFormData.guests}
                            placeholder='Enter guest amount'
                            onKeyDown={handleKeyDownNumber}
                            onChange={handleGuestsChange}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className='d-flex flex-column'>
                        <Form.Label htmlFor='create-booking-check-in'>
                            Check-in *
                        </Form.Label>
                        <StaticDatePicker
                            id='create-booking-check-in'
                            className='rounded'
                            value={createBookingFormData.dateFrom}
                            onChange={(newValue) =>
                                handleCheckinChange(newValue)
                            }
                            maxDate={dayjs(endDateRaw).subtract(1, 'day')}
                            shouldDisableDate={getDisabledDates}
                            disablePast
                            showDaysOutsideCurrentMonth
                        />
                    </Form.Group>
                    <Form.Group className='d-flex flex-column'>
                        <Form.Label htmlFor='create-booking-check-out'>
                            Check-out *
                        </Form.Label>
                        <StaticDatePicker
                            id='create-booking-check-out'
                            className='rounded'
                            value={createBookingFormData.dateTo}
                            onChange={(newValue) =>
                                handleCheckoutChange(newValue)
                            }
                            minDate={dayjs(startDateRaw).add(1, 'day')}
                            shouldDisableDate={getDisabledDates}
                            disablePast
                            showDaysOutsideCurrentMonth
                        />
                    </Form.Group>
                    <h2 className='text-danger'>{createBookingSubmitAlert}</h2>
                    <div className='d-flex gap-1'>
                        <p className='undertitle-p'>Length: </p>
                        {totalDaysAmount && (
                            <p className='undertitle-p'>
                                {totalDaysAmount > 1
                                    ? totalDaysAmount + ' days'
                                    : totalDaysAmount + ' day'}
                            </p>
                        )}
                    </div>
                    {data.price && (
                        <p className='undertitle-p'>
                            Total:{' '}
                            {totalDaysAmount &&
                                totalDaysAmount * data.price + ' kr'}
                        </p>
                    )}
                    <div className='d-flex flex-wrap gap-3 mt-4'>
                        {isLoadingPost && (
                            <div className='text-center vw-100'>
                                <div className='lds-dual-ring'></div>
                                <p>Loading...</p>
                            </div>
                        )}
                        {isLoadingPost ? (
                            <Col>
                                <Button
                                    className='rounded-pill w-100 px-2'
                                    onClick={handleCreateBooking}
                                    onKeyDown={handleKeyDown}
                                    disabled
                                >
                                    Create booking
                                </Button>
                            </Col>
                        ) : (
                            <Col>
                                <Button
                                    className='rounded-pill w-100 px-2'
                                    onClick={handleCreateBooking}
                                    onKeyDown={handleKeyDown}
                                >
                                    Create booking
                                </Button>
                            </Col>
                        )}
                        {isLoadingPost ? (
                            <Col>
                                <Button
                                    variant='dark'
                                    className='rounded-pill w-100 px-2'
                                    onClick={handleCancel}
                                    onKeyDown={handleKeyDownCancel}
                                    disabled
                                >
                                    Cancel
                                </Button>
                            </Col>
                        ) : (
                            <Col>
                                <Button
                                    variant='dark'
                                    className='rounded-pill w-100 px-2'
                                    onClick={handleCancel}
                                    onKeyDown={handleKeyDownCancel}
                                >
                                    Cancel
                                </Button>
                            </Col>
                        )}
                    </div>
                </Form>
            </Container>
        </div>
    );
}

/*

<Form.Control
                            name='check-in'
                            type='date'
                            value={createBookingFormData.dateFrom}
                            placeholder='Enter check-in date'
                            onKeyDown={handleKeyDown}
                            onChange={handleCheckinChange}
                        ></Form.Control>

                        
*/
