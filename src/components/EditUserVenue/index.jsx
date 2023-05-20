import '../EditUserVenue/index.css';
import { Link /*, useNavigate*/ } from 'react-router-dom';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

function EditUserVenue(props) {
    //const navigate = useNavigate();

    // Modal
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    // Buttons enter keypress
    function handleKeyDownOpen(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleOpen();
        }
    }
    function handleKeyDownClose(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleClose();
        }
    }

    // Edit venue states
    const [venueMedia, setVenueMedia] = useState('');
    const [editVenueFormData, setEditVenueFormData] = useState({
        name: props.data.name,
        description: props.data.description,
        media: props.data.media,
        price: props.data.price,
        maxGuests: props.data.maxGuests,
        meta: {
            wifi: props.data.meta.wifi,
            parking: props.data.meta.parking,
            breakfast: props.data.meta.breakfast,
            pets: props.data.meta.pets,
        },
        location: {
            address: props.data.location.address,
            city: props.data.location.city,
            country: props.data.location.country,
        },
    });
    const [venueWifi, setVenueWifi] = useState(!editVenueFormData.meta.wifi);
    const [venueParking, setVenueParking] = useState(
        !editVenueFormData.meta.parking
    );
    const [venueBreakfast, setVenueBreakfast] = useState(
        !editVenueFormData.meta.breakfast
    );
    const [venuePets, setVenuePets] = useState(!editVenueFormData.meta.pets);
    const [editVenueSubmitAlert, setEditVenueSubmitAlert] = useState('');

    const link = (
        <Link to='/' className='linkText'>
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

    // Edit venue function
    const handleEditVenue = async () => {
        if (editVenueFormData.name.trim().length === 0) {
            return setEditVenueSubmitAlert('Title required');
        }
        if (editVenueFormData.description.trim().length === 0) {
            return setEditVenueSubmitAlert('Description required');
        }
        if (editVenueFormData.price <= 0) {
            return setEditVenueSubmitAlert('Price cannot be zero');
        }
        if (editVenueFormData.maxGuests <= 0) {
            return setEditVenueSubmitAlert('Max guests cannot be zero');
        }

        try {
            const response = await fetch(
                `https://api.noroff.dev/api/v1/holidaze/venues/${props.data.id}`,
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
                    body: JSON.stringify(editVenueFormData),
                }
            );
            const editVenueData = await response.json();

            if (editVenueData.errors) {
                if (editVenueData.errors[0].path[0] === 'media') {
                    setEditVenueSubmitAlert('Media must be a valid URL');
                }
            }

            if (editVenueData.id) {
                setEditVenueSubmitAlert();
                //navigate(`/venue/${props.data.id}`);
                window.location.reload(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // On enter trigger edit venue function
    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            handleEditVenue();
        }
    }
    function handleKeyDownMedia(event) {
        if (event.keyCode === 13) {
            setEditVenueFormData({
                ...editVenueFormData,
                media: [...editVenueFormData.media, venueMedia],
            });
            setVenueMedia('');
        }
    }
    function handleKeyDownNumber(event) {
        if (!/[0-9]/.test(event.key)) {
            if (event.keyCode !== 8) {
                if (event.keyCode === 13) {
                    handleEditVenue();
                } else {
                    event.preventDefault();
                }
            }
        }
    }

    // Insert input field values on change
    const handleMediaChange = (e) => {
        setVenueMedia(e.target.value);
    };
    const removeMediaListItem = () => {
        setEditVenueFormData({
            ...editVenueFormData,
            media: [],
        });
    };

    const handleTitleChange = (e) => {
        setEditVenueFormData({
            ...editVenueFormData,
            name: e.target.value,
        });
    };
    const handlePriceChange = (e) => {
        setEditVenueFormData({
            ...editVenueFormData,
            price: Number(e.target.value),
        });
    };
    const handleDescriptionChange = (e) => {
        setEditVenueFormData({
            ...editVenueFormData,
            description: e.target.value,
        });
    };
    const handleGuestsChange = (e) => {
        setEditVenueFormData({
            ...editVenueFormData,
            maxGuests: Number(e.target.value),
        });
    };
    const handleWifiChange = () => {
        if (venueWifi === false) {
            setVenueWifi(true);
        } else {
            setVenueWifi(false);
        }
        setEditVenueFormData({
            ...editVenueFormData,
            meta: {
                ...editVenueFormData.meta,
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
        setEditVenueFormData({
            ...editVenueFormData,
            meta: {
                ...editVenueFormData.meta,
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
        setEditVenueFormData({
            ...editVenueFormData,
            meta: {
                ...editVenueFormData.meta,
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
        setEditVenueFormData({
            ...editVenueFormData,
            meta: {
                ...editVenueFormData.meta,
                pets: venuePets,
            },
        });
    };
    const handleAddressChange = (e) => {
        setEditVenueFormData({
            ...editVenueFormData,
            location: {
                ...editVenueFormData.location,
                address: e.target.value,
            },
        });
    };
    const handleCityChange = (e) => {
        setEditVenueFormData({
            ...editVenueFormData,
            location: {
                ...editVenueFormData.location,
                city: e.target.value,
            },
        });
    };
    const handleCountryChange = (e) => {
        setEditVenueFormData({
            ...editVenueFormData,
            location: {
                ...editVenueFormData.location,
                country: e.target.value,
            },
        });
    };

    return (
        <div>
            <Button
                variant='outline-dark'
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
                className='mt-5'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit venue</Modal.Title>
                </Modal.Header>
                <Modal.Body id='edit-venue-modal' className='scrollBarContent'>
                    <Form className='d-flex flex-column gap-3'>
                        <Form.Group>
                            <Form.Label>Title *</Form.Label>
                            <Form.Control
                                name='title'
                                type='text'
                                value={editVenueFormData.name}
                                placeholder='Enter title'
                                onKeyDown={handleKeyDown}
                                onChange={handleTitleChange}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description *</Form.Label>
                            <Form.Control
                                name='description'
                                as='textarea'
                                rows={4}
                                className='scrollBarContent'
                                value={editVenueFormData.description}
                                placeholder='Enter description'
                                onKeyDown={handleKeyDown}
                                onChange={handleDescriptionChange}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price *</Form.Label>
                            <Form.Control
                                name='price'
                                type='number'
                                min='1'
                                value={editVenueFormData.price}
                                placeholder='Enter price'
                                onKeyDown={handleKeyDownNumber}
                                onChange={handlePriceChange}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Max guests *</Form.Label>
                            <Form.Control
                                name='max guests'
                                type='number'
                                min='1'
                                placeholder='Enter max guests'
                                value={editVenueFormData.maxGuests}
                                onKeyDown={handleKeyDownNumber}
                                onChange={handleGuestsChange}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Media</Form.Label>
                            <Form.Control
                                name='media'
                                type='text'
                                value={venueMedia}
                                placeholder='Enter media URL'
                                onKeyDown={handleKeyDownMedia}
                                onChange={handleMediaChange}
                            ></Form.Control>
                            <ol className='d-flex flex-wrap gap-2 mt-2 ps-3 mb-0'>
                                {editVenueFormData.media.map((media, key) => (
                                    <li key={key}>
                                        <Link
                                            className='venueMediaListItem d-flex align-items-center gap-1 bg-dark text-light px-2 py-1 me-3 rounded'
                                            onClick={() =>
                                                removeMediaListItem(media)
                                            }
                                        >
                                            <p className='d-block text-truncate'>
                                                {media}
                                            </p>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='currentColor'
                                                className='bi bi-x'
                                                viewBox='0 0 16 16'
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
                                <Form.Label>Wi-Fi</Form.Label>
                                <Form.Check
                                    value={venueWifi}
                                    type='checkbox'
                                    checked={venueWifi === false}
                                    onChange={handleWifiChange}
                                />
                            </Form.Group>
                            <Form.Group className='d-flex flex-column align-items-center'>
                                <Form.Label>Parking</Form.Label>
                                <Form.Check
                                    value={venueParking}
                                    type='checkbox'
                                    checked={venueParking === false}
                                    onChange={handleParkingChange}
                                />
                            </Form.Group>
                            <Form.Group className='d-flex flex-column align-items-center'>
                                <Form.Label>Breakfast</Form.Label>
                                <Form.Check
                                    value={venueBreakfast}
                                    type='checkbox'
                                    checked={venueBreakfast === false}
                                    onChange={handleBreakfastChange}
                                />
                            </Form.Group>
                            <Form.Group className='d-flex flex-column align-items-center'>
                                <Form.Label>Pets</Form.Label>
                                <Form.Check
                                    value={venuePets}
                                    type='checkbox'
                                    checked={venuePets === false}
                                    onChange={handlePetsChange}
                                />
                            </Form.Group>
                        </div>
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                name='address'
                                type='text'
                                value={editVenueFormData.location.address}
                                placeholder='Enter address'
                                onKeyDown={handleKeyDown}
                                onChange={handleAddressChange}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                name='city'
                                type='text'
                                value={editVenueFormData.location.city}
                                placeholder='Enter city name'
                                onKeyDown={handleKeyDown}
                                onChange={handleCityChange}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                name='country'
                                type='text'
                                value={editVenueFormData.location.country}
                                placeholder='Enter country name'
                                onKeyDown={handleKeyDown}
                                onChange={handleCountryChange}
                            ></Form.Control>
                        </Form.Group>
                        <p className='text-danger text-center'>
                            <h2>{editVenueSubmitAlert}</h2>
                        </p>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Col>
                        <Button
                            variant='dark rounded-pill'
                            className='px-4 w-100'
                            onClick={handleClose}
                            onKeyDown={handleKeyDownClose}
                        >
                            Cancel
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant='primary rounded-pill'
                            className='px-4 w-100'
                            onClick={handleEditVenue}
                            onKeyDown={handleKeyDown}
                        >
                            Edit
                        </Button>
                    </Col>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditUserVenue;
