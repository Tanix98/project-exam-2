import '../SelectVenueToBook/index.css';
import UseApiGet from '../../api/UseApiGet';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function SelectVenueToBook() {
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

    // Get venue id and venue name when user clicks on search result
    const [venueId, setVenueId] = useState();
    const getVenueId = (id) => {
        setVenueId(id);
    };
    const getVenueName = (name) => {
        setSearchWord(name);
    };

    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    function handleContinue() {
        navigate(`/create-booking/${venueId}`);
    }

    // Buttons enter keypress
    function handleKeyDownClose(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleClose();
        }
    }
    function handleKeyDownContinue(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleContinue();
            handleClose();
        }
    }
    function handleKeyDownOpen(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleShow();
        }
    }

    const { data } = UseApiGet('https://api.noroff.dev/api/v1/holidaze/venues');

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

    return (
        <Col>
            <Link
                className='p-2 d-flex align-items-center justify-content-end gap-2'
                role='menuitem'
                aria-label='Create booking'
                onClick={handleShow}
                onKeyDown={handleKeyDownOpen}
            >
                Create booking
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    className='mediumIcon bi bi-calendar2-week-fill'
                    viewBox='0 0 16 16'
                    alt='Create booking'
                >
                    <path d='M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM8.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM3 10.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z' />
                </svg>
            </Link>

            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                size='sm'
                className='mt-4'
                id='selectVenueModal'
            >
                <Modal.Header>
                    <Modal.Title className='undertitle-p'>
                        Select venue to book
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='position-relative'>
                    <Form.Control
                        id='create-booking-venue-select'
                        type='search'
                        placeholder='Search for venue'
                        className='rounded'
                        aria-label='Search for venue to book'
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
                                                getVenueName(venue.name);
                                            }}
                                        >
                                            {venue.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className='d-flex'>
                    {searchWord ? (
                        <Button
                            variant='primary rounded-pill'
                            className='px-4 w-100 col text-nowrap'
                            onClick={() => {
                                handleContinue();
                                handleClose();
                            }}
                            onKeyDown={handleKeyDownContinue}
                        >
                            Continue
                        </Button>
                    ) : (
                        <Button
                            variant='primary rounded-pill'
                            className='px-4 w-100 col text-nowrap'
                            disabled
                        >
                            Continue
                        </Button>
                    )}
                    <Button
                        variant='dark rounded-pill'
                        className='px-4 w-100 col'
                        onClick={handleClose}
                        onKeyDown={handleKeyDownClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
}

export default SelectVenueToBook;
