import '../CreateVenue/index.css';
import { Form, Container, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateVenue() {
    useEffect(() => {
        document.title = 'Create venue - Holidaze';
    }, []);

    // Create venue api call loading state
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const handleCancel = () => {
        navigate('/');
    };
    const handleKeyDownCancel = (event) => {
        if (event.keyCode === 13) {
            navigate('/');
        }
    };

    // Create venue states
    const [venueMedia, setVenueMedia] = useState('');
    const [venueWifi, setVenueWifi] = useState(true);
    const [venueParking, setVenueParking] = useState(true);
    const [venueBreakfast, setVenueBreakfast] = useState(true);
    const [venuePets, setVenuePets] = useState(true);
    const [createVenueFormData, setCreateVenueFormData] = useState({
        name: '',
        description: '',
        media: [],
        price: '',
        maxGuests: '',
        meta: {
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false,
        },
        location: {
            address: '',
            city: '',
            country: '',
        },
    });
    const [createVenueSubmitAlert, setCreateVenueSubmitAlert] = useState('');

    const link = (
        <Link to='/' className='linkText' aria-label='Return to homepage'>
            Click here to return to homepage
        </Link>
    );
    if (!localStorage.getItem('userVenueManager')) {
        return (
            <Container className='d-flex justify-content-center'>
                <div>
                    <h1 className='mb-3'>Access denied!</h1>
                    <p>You must be a venue manager to create venues. {link}</p>
                </div>
            </Container>
        );
    }

    // Create venue function
    const handleCreateVenue = async () => {
        if (createVenueFormData.name.trim().length === 0) {
            return setCreateVenueSubmitAlert('Title required');
        }
        if (createVenueFormData.description.trim().length === 0) {
            return setCreateVenueSubmitAlert('Description required');
        }
        if (createVenueFormData.price <= 0) {
            return setCreateVenueSubmitAlert('Price cannot be zero');
        }
        if (createVenueFormData.maxGuests <= 0) {
            return setCreateVenueSubmitAlert('Max guests cannot be zero');
        }

        try {
            setIsLoading(true);
            const response = await fetch(
                `https://api.noroff.dev/api/v1/holidaze/venues`,
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
                    body: JSON.stringify(createVenueFormData),
                }
            );
            const data = await response.json();

            if (data.errors) {
                setIsLoading(false);
                setCreateVenueSubmitAlert(
                    data.errors[0].message.substring(0, 62)
                );
            }

            if (data.id) {
                setIsLoading(false);
                setCreateVenueSubmitAlert();
                navigate(`/venue/${data.id}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // On enter trigger create venue function
    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            handleCreateVenue();
        }
    }
    function handleKeyDownMedia(event) {
        if (event.keyCode === 13) {
            setCreateVenueFormData({
                ...createVenueFormData,
                media: [...createVenueFormData.media, venueMedia],
            });
            setVenueMedia('');
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

    // Insert input field values on change
    const handleMediaChange = (e) => {
        setVenueMedia(e.target.value);
    };
    const removeMediaListItem = () => {
        /*setCreateVenueFormData({
            ...createVenueFormData,
            media: [
                createVenueFormData.media.filter(
                    (mediaItem) => mediaItem.key !== itemKey
                ),
            ],
        });*/
        /* Merges all urls into one
        const updatedData = createVenueFormData.media.filter(
            (item) => item !== itemURL
        );
        setCreateVenueFormData({
            ...createVenueFormData,
            media: [updatedData],
        });*/
        setCreateVenueFormData({
            ...createVenueFormData,
            media: [],
        });
    };

    const handleTitleChange = (e) => {
        setCreateVenueFormData({
            ...createVenueFormData,
            name: e.target.value,
        });
    };
    const handlePriceChange = (e) => {
        if (Number(e.target.value) === 0) {
            setCreateVenueFormData({
                ...createVenueFormData,
                price: '',
            });
        } else {
            setCreateVenueFormData({
                ...createVenueFormData,
                price: Number(e.target.value),
            });
        }
    };
    const handleDescriptionChange = (e) => {
        setCreateVenueFormData({
            ...createVenueFormData,
            description: e.target.value,
        });
    };
    const handleGuestsChange = (e) => {
        if (Number(e.target.value) === 0) {
            setCreateVenueFormData({
                ...createVenueFormData,
                maxGuests: '',
            });
        } else {
            setCreateVenueFormData({
                ...createVenueFormData,
                maxGuests: Number(e.target.value),
            });
        }
    };
    const handleWifiChange = () => {
        if (venueWifi === false) {
            setVenueWifi(true);
        } else {
            setVenueWifi(false);
        }
        setCreateVenueFormData({
            ...createVenueFormData,
            meta: {
                ...createVenueFormData.meta,
                wifi: venueWifi,
            },
        });
    };
    const handleParkingChange = () => {
        if (venueParking === false) {
            setVenueParking(true);
        } else {
            setVenueParking(false);
        }
        setCreateVenueFormData({
            ...createVenueFormData,
            meta: {
                ...createVenueFormData.meta,
                parking: venueParking,
            },
        });
    };
    const handleBreakfastChange = () => {
        if (venueBreakfast === false) {
            setVenueBreakfast(true);
        } else {
            setVenueBreakfast(false);
        }
        setCreateVenueFormData({
            ...createVenueFormData,
            meta: {
                ...createVenueFormData.meta,
                breakfast: venueBreakfast,
            },
        });
    };
    const handlePetsChange = () => {
        if (venuePets === true) {
            setVenuePets(false);
        } else {
            setVenuePets(true);
        }
        setCreateVenueFormData({
            ...createVenueFormData,
            meta: {
                ...createVenueFormData.meta,
                pets: venuePets,
            },
        });
    };
    const handleAddressChange = (e) => {
        setCreateVenueFormData({
            ...createVenueFormData,
            location: {
                ...createVenueFormData.location,
                address: e.target.value,
            },
        });
    };
    const handleCityChange = (e) => {
        setCreateVenueFormData({
            ...createVenueFormData,
            location: {
                ...createVenueFormData.location,
                city: e.target.value,
            },
        });
    };
    const handleCountryChange = (e) => {
        setCreateVenueFormData({
            ...createVenueFormData,
            location: {
                ...createVenueFormData.location,
                country: e.target.value,
            },
        });
    };

    return (
        <div>
            <Container className='formContainerLarge d-block'>
                <h1 className='mb-4'>Create venue</h1>
                <Form className='d-flex flex-column gap-3'>
                    <Form.Group>
                        <Form.Label htmlFor='create-venue-title'>
                            Title *
                        </Form.Label>
                        <Form.Control
                            id='create-venue-title'
                            type='text'
                            value={createVenueFormData.name}
                            placeholder='Enter title'
                            onKeyDown={handleKeyDown}
                            onChange={handleTitleChange}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='create-venue-description'>
                            Description *
                        </Form.Label>
                        <Form.Control
                            id='create-venue-description'
                            as='textarea'
                            rows={4}
                            className='scrollBarContent'
                            value={createVenueFormData.description}
                            placeholder='Enter description'
                            onChange={handleDescriptionChange}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='create-venue-price'>
                            Price *
                        </Form.Label>
                        <Form.Control
                            id='create-venue-price'
                            type='number'
                            min={0}
                            value={createVenueFormData.price}
                            placeholder='Enter price'
                            onKeyDown={handleKeyDownNumber}
                            onChange={handlePriceChange}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='create-venue-max-guests'>
                            Max guests *
                        </Form.Label>
                        <Form.Control
                            id='create-venue-max-guests'
                            type='number'
                            min={0}
                            placeholder='Enter max guests'
                            value={createVenueFormData.maxGuests}
                            onKeyDown={handleKeyDownNumber}
                            onChange={handleGuestsChange}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='create-venue-media-urls'>
                            Media
                        </Form.Label>
                        <Form.Control
                            id='create-venue-media-urls'
                            type='text'
                            value={venueMedia}
                            placeholder='Enter media URL'
                            onKeyDown={handleKeyDownMedia}
                            onChange={handleMediaChange}
                        ></Form.Control>
                        <ol className='d-flex flex-wrap gap-2 mt-2 ps-3 mb-0'>
                            {createVenueFormData.media.map((media, key) => (
                                <li key={key}>
                                    <Link
                                        className='venueMediaListItem d-flex align-items-center gap-1 bg-dark text-light px-2 py-1 me-3 rounded'
                                        onClick={() =>
                                            removeMediaListItem(media)
                                        }
                                        aria-label='Remove media URL'
                                    >
                                        <p className='d-block text-truncate'>
                                            {media}
                                        </p>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='currentColor'
                                            className='bi bi-x'
                                            viewBox='0 0 16 16'
                                            alt='Delete symbol'
                                        >
                                            <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z' />
                                        </svg>
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </Form.Group>
                    <div className='d-flex flex-wrap justify-content-between'>
                        <Form.Group className='d-flex flex-column align-items-center'>
                            <Form.Label htmlFor='create-venue-wifi-included'>
                                Wi-Fi
                            </Form.Label>
                            <Form.Check
                                id='create-venue-wifi-included'
                                value={venueWifi}
                                type='checkbox'
                                checked={venueWifi === false}
                                onChange={handleWifiChange}
                            />
                        </Form.Group>
                        <Form.Group className='d-flex flex-column align-items-center'>
                            <Form.Label htmlFor='create-venue-parking-included'>
                                Parking
                            </Form.Label>
                            <Form.Check
                                id='create-venue-parking-included'
                                value={venueParking}
                                type='checkbox'
                                checked={venueParking === false}
                                onChange={handleParkingChange}
                            />
                        </Form.Group>
                        <Form.Group className='d-flex flex-column align-items-center'>
                            <Form.Label htmlFor='create-venue-breakfast-included'>
                                Breakfast
                            </Form.Label>
                            <Form.Check
                                id='create-venue-breakfast-included'
                                value={venueBreakfast}
                                type='checkbox'
                                checked={venueBreakfast === false}
                                onChange={handleBreakfastChange}
                            />
                        </Form.Group>
                        <Form.Group className='d-flex flex-column align-items-center'>
                            <Form.Label htmlFor='create-venue-pets-allowed'>
                                Pets
                            </Form.Label>
                            <Form.Check
                                id='create-venue-pets-allowed'
                                value={venuePets}
                                type='checkbox'
                                checked={venuePets === false}
                                onChange={handlePetsChange}
                            />
                        </Form.Group>
                    </div>
                    <Form.Group>
                        <Form.Label htmlFor='create-venue-address'>
                            Address
                        </Form.Label>
                        <Form.Control
                            id='create-venue-address'
                            type='text'
                            value={createVenueFormData.location.address}
                            placeholder='Enter address'
                            onKeyDown={handleKeyDown}
                            onChange={handleAddressChange}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor='create-venue-city'>
                            City
                        </Form.Label>
                        <Form.Control
                            id='create-venue-city'
                            type='text'
                            value={createVenueFormData.location.city}
                            placeholder='Enter city name'
                            onKeyDown={handleKeyDown}
                            onChange={handleCityChange}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group htmlFor='create-venue-country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            id='create-venue-country'
                            type='text'
                            value={createVenueFormData.location.country}
                            placeholder='Enter country name'
                            onKeyDown={handleKeyDown}
                            onChange={handleCountryChange}
                        ></Form.Control>
                    </Form.Group>
                    <h2 className='text-danger'>{createVenueSubmitAlert}</h2>
                    <div className='d-flex flex-wrap gap-3 mt-4'>
                        {isLoading && (
                            <div className='text-center vw-100'>
                                <div className='lds-dual-ring'></div>
                                <p>Loading...</p>
                            </div>
                        )}
                        {isLoading ? (
                            <Col>
                                <Button
                                    className='rounded-pill w-100 px-2'
                                    onClick={handleCreateVenue}
                                    onKeyDown={handleKeyDown}
                                    disabled
                                >
                                    Create venue
                                </Button>
                            </Col>
                        ) : (
                            <Col>
                                <Button
                                    className='rounded-pill w-100 px-2'
                                    onClick={handleCreateVenue}
                                    onKeyDown={handleKeyDown}
                                >
                                    Create venue
                                </Button>
                            </Col>
                        )}
                        {isLoading ? (
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
