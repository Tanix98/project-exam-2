import '../CreateBooking/index.css';
import UseApiGet from '../../api/UseApiGet';
import LoadingScreen from '../../components/LoadingScreen';
import LoadingError from '../../components/LoadingError';
import { Form, Container, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function CreateBooking() {
    useEffect(() => {
        document.title = 'Create booking - Holidaze';
    }, []);

    let { id } = useParams();

    // Create venue api call loading state
    const [isLoadingPost, setIsLoadingPost] = useState(false);

    const navigate = useNavigate();

    // Create booking states

    /*const [selectedVenue, setSelectedVenue] = useState('');

    const [bookingStart, setBookingStart] = useState('');
    const [bookingEnd, setBookingEnd] = useState('');
    const [bookingGuests, setBookingGuests] = useState(1);*/
    const [createBookingFormData, setCreateBookingFormData] = useState({
        dateFrom: '',
        dateTo: '',
        guests: '',
        venueId: id,
    });
    const [createBookingSubmitAlert, setCreateBookingSubmitAlert] =
        useState('');

    // Search states and useEffect
    const [filteredData, setFilteredData] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    // onBlur to hide search autocomplete, is not accessible as shift focus cannot select the autocomplete list
    const [focused, setFocused] = useState(
        'searchResultsBooking d-flex bg-light shadow-sm rounded-bottom'
    );
    const onFocus = () =>
        setFocused(
            'searchResultsBooking d-flex bg-light shadow-sm rounded-bottom'
        );
    const onBlur = () => {
        setTimeout(
            () =>
                setFocused(
                    'searchResultsBooking d-none bg-light shadow-sm rounded-bottom'
                ),
            200
        );
    };

    // Get venue id and name when user clicks on search result
    const [chosenVenueName, setChosenVenueName] = useState('Select a venue');
    const [createBookingPageTitle, setCreateBookingPageTitle] =
        useState('Create booking');
    const getVenueId = (id) => {
        setCreateBookingFormData({
            ...createBookingFormData,
            venueId: id,
        });
    };
    const getVenueName = (name) => {
        setChosenVenueName(name);
        setSearchWord('');
    };
    useEffect(() => {
        if (chosenVenueName !== 'Select a venue') {
            setCreateBookingPageTitle('Create booking at ' + chosenVenueName);
        }
    }, [chosenVenueName]);
    /*
    const [chosenVenueId, setChosenVenueId] = useState("");
    const getVenueId = (id) => {
        setChosenVenueId(id);
    };
    useEffect(() => {
        setCreateBookingFormData({
            ...createBookingFormData,
            venueId: chosenVenueId,
        });
        console.log(createBookingFormData.venueId);
    }, [chosenVenueId]);*/

    /*useEffect(() => {
        onBlur();
        setCreateBookingFormData({
            ...createBookingFormData,
            venueId: selectedVenue,
        });
    }, [selectedVenue]);*/

    let apiCall = 'https://api.noroff.dev/api/v1/holidaze/venues';
    if (id) {
        apiCall = `https://api.noroff.dev/api/v1/holidaze/venues/${id}`;
    }

    const { data, isLoading, isError } = UseApiGet(apiCall);

    // Get total amount of days when both dates have been picked
    const [totalDaysAmount, setTotalDaysAmount] = useState('');

    useEffect(() => {
        if (createBookingFormData.dateFrom && createBookingFormData.dateTo) {
            const bookingStart = new Date(
                createBookingFormData.dateFrom.substring(0, 16)
            );
            const bookingEnd = new Date(
                createBookingFormData.dateTo.substring(0, 16)
            );
            console.log(bookingEnd);
            const differenceInTime =
                bookingEnd.getTime() - bookingStart.getTime();
            const differenceInDays = differenceInTime / (1000 * 3600 * 24);
            setTotalDaysAmount(differenceInDays);
        }
    }, [createBookingFormData.dateFrom, createBookingFormData.dateTo]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isError) {
        return <LoadingError />;
    }

    // Check if user logged in
    const link = (
        <Link to='/login' className='linkText' aria-label='Log in or sign up'>
            Go to log in page.
        </Link>
    );
    if (!localStorage.getItem('userName')) {
        return (
            <Container className='d-flex justify-content-center'>
                <div>
                    <h1 className='mb-3'>Access denied!</h1>
                    <p>You must be logged in to create a booking. {link}</p>
                </div>
            </Container>
        );
    }

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
                if (
                    bookingData.errors[0].message ===
                        'dateFrom cannot be in the past' ||
                    bookingData.errors[0].message ===
                        'dateTo cannot be in the past'
                ) {
                    setCreateBookingSubmitAlert(
                        'Check-in and check-out dates cannot be in the past'
                    );
                }
                if (
                    bookingData.errors[0].message ===
                    'dateFrom cannot be after dateTo'
                ) {
                    setCreateBookingSubmitAlert(
                        'Check-in date cannot be after check-out date'
                    );
                }
                if (
                    bookingData.errors[0].message === 'Guests must be a number'
                ) {
                    setCreateBookingSubmitAlert('Guests must be a number');
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

    // On enter trigger create venue function
    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            handleCreateBooking();
        }
    }
    function handleKeyDownNumber(event) {
        if (!/[0-9]/.test(event.key)) {
            if (event.keyCode !== 8) {
                if (event.keyCode === 13) {
                    handleCreateBooking();
                } else {
                    event.preventDefault();
                }
            }
        }
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

    const handleCheckinChange = (e) => {
        setCreateBookingFormData({
            ...createBookingFormData,
            dateFrom: e.target.value,
        });
    };
    const handleCheckoutChange = (e) => {
        setCreateBookingFormData({
            ...createBookingFormData,
            dateTo: e.target.value,
        });
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

    function handleFilter(event) {
        const searchWord = event.target.value;
        try {
            const newFilter = data.filter((venue) => {
                return venue.name
                    .toLowerCase()
                    .includes(searchWord.toLowerCase());
            });
            if (searchWord.replace(/ /g, '') === '') {
                setFilteredData([]);
            } else {
                setFilteredData(newFilter);
            }
            setSearchWord(searchWord);
        } catch (e) {
            console.log(e);
        }
    }

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
                {id ? (
                    <h1 className='mb-4'>{`Create booking at ${data.name}`}</h1>
                ) : (
                    <h1 className='mb-4'>{createBookingPageTitle}</h1>
                )}
                <Form className='d-flex flex-column gap-3'>
                    {id ? (
                        <Form.Group>
                            <Form.Label>Venue *</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Select a venue'
                                className='rounded'
                                aria-label='Search'
                                value={data.name}
                                disabled
                            />
                        </Form.Group>
                    ) : (
                        <Form.Group className='position-relative'>
                            <Form.Label>Venue *</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder={chosenVenueName}
                                className='rounded'
                                aria-label='Search'
                                value={searchWord}
                                onChange={handleFilter}
                                onFocus={onFocus}
                                onBlur={onBlur}
                            />
                            {filteredData.length > 0 && (
                                <div className={focused}>
                                    <div
                                        id='search-list-booking'
                                        className='scrollBarContent rounded'
                                    >
                                        {filteredData.map((venue, key) => {
                                            return (
                                                <Link
                                                    className='search-list-item-booking text-decoration-none text-dark d-block p-2'
                                                    key={key}
                                                    aria-label='Select venue'
                                                    onClick={() => {
                                                        getVenueId(venue.id);
                                                        getVenueName(
                                                            venue.name
                                                        );
                                                    }}
                                                >
                                                    {venue.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </Form.Group>
                    )}
                    <Form.Group>
                        <Form.Label>Guests *</Form.Label>
                        <Form.Control
                            name='guests'
                            type='number'
                            value={createBookingFormData.guests}
                            placeholder='Enter guest amount'
                            onKeyDown={handleKeyDownNumber}
                            onChange={handleGuestsChange}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Check-in *</Form.Label>
                        <Form.Control
                            name='check-in'
                            type='date'
                            value={createBookingFormData.dateFrom}
                            placeholder='Enter check-in date'
                            onKeyDown={handleKeyDown}
                            onChange={handleCheckinChange}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Check-out *</Form.Label>
                        <Form.Control
                            name='check-out'
                            type='date'
                            value={createBookingFormData.dateTo}
                            placeholder='Enter check-out date'
                            onKeyDown={handleKeyDown}
                            onChange={handleCheckoutChange}
                        ></Form.Control>
                    </Form.Group>
                    <h2 className='text-danger'>{createBookingSubmitAlert}</h2>
                    <div className='d-flex gap-2'>
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
                    </div>
                </Form>
            </Container>
        </div>
    );
}
