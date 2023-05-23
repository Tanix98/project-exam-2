import '../Header/index.css';
import holidazeLogo from '../../assets/imgs/logo.svg';
import UseApiGet from '../../api/UseApiGet';
import { useRef, useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const { data } = UseApiGet(
        'https://api.noroff.dev/api/v1/holidaze/venues?_owner=true&_bookings=true'
    );

    // useRef hook creates a reference to the dropdown element
    const dropdownMenuRef = useRef(null);
    // Dropdown menu and arrow up icon renders if the isOpen state is set to true
    const [isOpen, setIsOpen] = useState(false);
    // Toggles the isOpen state between true and false
    const handleClick = () => {
        setIsOpen(!isOpen);
    };
    // Button enter keypress
    function handleKeyDown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleClick();
        }
    }
    // useEffect calls handleClickOutside if the user clicks anywhere
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('keydown', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('keydown', handleClickOutside, true);
        };
    }, []);
    // If the user clicks anywhere outside the useRef hook, set isOpen to false
    const handleClickOutside = (event) => {
        if (
            dropdownMenuRef.current &&
            !dropdownMenuRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    // Log out user
    const logOutUser = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userAvatar');
        localStorage.removeItem('userVenueManager');
        localStorage.removeItem('userToken');
        window.location.reload(false);
    };

    // Show regular or venue manager dropdown menu
    const [openMenuClasses, setOpenMenuClasses] = useState();
    useEffect(() => {
        if (localStorage.getItem('userVenueManager')) {
            setOpenMenuClasses(
                'dropdownMenu expandMenuManager flex-column bg-light rounded-bottom shadow-sm'
            );
        } else {
            setOpenMenuClasses(
                'dropdownMenu expandMenuRegular flex-column bg-light rounded-bottom shadow-sm'
            );
        }
    }, []);

    // Search and autocomplete
    const [filteredData, setFilteredData] = useState([]);
    const [searchWord, setSearchWord] = useState('');

    function handleKeyDownSearch(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            search();
            event.target.blur();
        }
    }

    function handleFilter(event) {
        const searchWord = event.target.value;
        const newFilter = data.filter((venue) => {
            return venue.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord.replace(/ /g, '') === '') {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
        setSearchWord(searchWord);
    }

    const navigate = useNavigate();
    function search() {
        navigate(`/Search/${searchWord}`);
    }

    // onBlur to hide search autocomplete, is not accessible as shift focus cannot select the autocomplete list
    const [focusedMobile, setFocusedMobile] = useState(
        'searchResults d-flex d-sm-none bg-light shadow-sm rounded-bottom'
    );
    const onFocusMobile = () =>
        setFocusedMobile(
            'searchResults d-flex d-sm-none bg-light shadow-sm rounded-bottom'
        );
    const onBlurMobile = () => {
        setTimeout(
            () =>
                setFocusedMobile(
                    'searchResults d-none bg-light shadow-sm rounded-bottom'
                ),
            200
        );
    };
    const [focusedDesktop, setFocusedDesktop] = useState(
        'searchResults d-none d-sm-flex bg-light shadow-sm rounded-bottom'
    );
    const onFocusDesktop = () =>
        setFocusedDesktop(
            'searchResults d-none d-sm-flex bg-light shadow-sm rounded-bottom'
        );
    const onBlurDesktop = () => {
        setTimeout(
            () =>
                setFocusedDesktop(
                    'searchResults d-none bg-light shadow-sm rounded-bottom'
                ),
            200
        );
    };

    // Login button
    const handleLogin = () => {
        navigate('/login');
    };
    const handleKeyDownLogin = (event) => {
        if (event.keyCode === 13) {
            handleLogin();
        }
    };

    return (
        <Navbar
            bg='light'
            variant='light'
            className='sticky-top mb-4 shadow-sm'
        >
            <Container>
                <div className='d-flex flex-column gap-2 w-100'>
                    <div className='d-flex flex-wrap flex-sm-nowrap justify-content-between align-items-center gap-3'>
                        <Link to='/' aria-label='To homepage'>
                            <img
                                src={holidazeLogo}
                                alt='Holidaze logo'
                                className='mw-100 mh-100'
                            />
                        </Link>
                        <InputGroup className='d-none d-sm-flex w-50 ms-auto'>
                            <button
                                className='custom-header-searchbar-btn d-flex border-0 m-auto bg-transparent p-1'
                                onClick={search}
                                onKeyDown={handleKeyDownSearch}
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    className='smallIcon bi bi-search'
                                    viewBox='0 0 16 16'
                                    alt='Search symbol, a magnifying glass'
                                >
                                    <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                                </svg>
                            </button>
                            <Form.Control
                                type='search'
                                placeholder='Search'
                                className='custom-header-searchbar rounded-pill bg-light'
                                aria-label='Search'
                                value={searchWord}
                                onChange={handleFilter}
                                onKeyDown={handleKeyDownSearch}
                                onFocus={onFocusDesktop}
                                onBlur={onBlurDesktop}
                            />
                            {filteredData.length > 0 && (
                                <div className={focusedDesktop}>
                                    <div className='searchList scrollBarContent rounded-bottom'>
                                        {filteredData.map((venue, key) => {
                                            return (
                                                <Link
                                                    to={{
                                                        pathname: `/venue/${venue.id}`,
                                                    }}
                                                    className='search-list-item text-decoration-none text-dark d-block p-2'
                                                    key={key}
                                                    aria-label={`Go to the venue`}
                                                >
                                                    {venue.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </InputGroup>
                        {localStorage.getItem('userName') ? (
                            <div
                                className='ms-auto'
                                id='header-menu-parent'
                                ref={dropdownMenuRef}
                            >
                                <button
                                    id='header-menu-btn'
                                    className='bg-transparent border-0 p-0'
                                    aria-haspopup='true'
                                    aria-controls='menu'
                                    onClick={handleClick}
                                    onKeyDown={handleKeyDown}
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='currentColor'
                                        className='smallIcon bi bi-chevron-down me-1'
                                        id={isOpen ? 'rotate-arrow' : 'arrow'}
                                        viewBox='0 0 16 16'
                                        alt='Navigation links'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
                                        />
                                    </svg>
                                    {localStorage
                                        .getItem('userAvatar')
                                        .replace(/['"]+/g, '') ? (
                                        <img
                                            src={localStorage
                                                .getItem('userAvatar')
                                                .replace(/['"]+/g, '')}
                                            id='profile-img'
                                            alt='Navigation links'
                                            className='rounded-circle mw-100 mh-100'
                                        />
                                    ) : (
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='currentColor'
                                            className='bi bi-person-circle mw-100 mh-100'
                                            viewBox='0 0 16 16'
                                            id='profile-img'
                                            alt='Navigation links'
                                        >
                                            <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                                            <path
                                                fillRule='evenodd'
                                                d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
                                            />
                                        </svg>
                                    )}
                                </button>
                                <Nav
                                    className={
                                        isOpen
                                            ? openMenuClasses
                                            : 'dropdownMenu flex-column bg-light rounded-bottom shadow-sm'
                                    }
                                    id='header-dropdown-menu'
                                    role='menu'
                                    aria-labelledby='header-menu-btn'
                                    onClick={handleClick}
                                >
                                    <Link
                                        to='/create-booking'
                                        className='p-2 d-flex align-items-center justify-content-end gap-2'
                                        role='menuitem'
                                        aria-label='Create booking'
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
                                    {localStorage.getItem(
                                        'userVenueManager'
                                    ) && (
                                        <Link
                                            to='/create-venue'
                                            className='p-2 d-flex align-items-center justify-content-end gap-2'
                                            role='menuitem'
                                            aria-label='Create venue'
                                        >
                                            Create venue
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='currentColor'
                                                className='mediumIcon bi bi-building-fill'
                                                viewBox='0 0 16 16'
                                                alt='Create venue'
                                            >
                                                <path d='M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H3Zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Z' />
                                            </svg>
                                        </Link>
                                    )}
                                    <Link
                                        to={
                                            '/profile/' +
                                            localStorage
                                                .getItem('userName')
                                                .replace(/['"]+/g, '')
                                        }
                                        className='p-2 d-flex align-items-center justify-content-end gap-2'
                                        role='menuitem'
                                        aria-label='My profile'
                                    >
                                        My Profile
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='currentColor'
                                            className='mediumIcon bi bi-person-fill'
                                            viewBox='0 0 16 16'
                                            alt='My profile'
                                        >
                                            <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
                                        </svg>
                                    </Link>
                                    <Link
                                        className='p-2 d-flex align-items-center justify-content-end gap-2'
                                        role='menuitem'
                                        onClick={logOutUser}
                                        aria-label='Log out'
                                    >
                                        Log Out
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='currentColor'
                                            className='mediumIcon bi bi-door-open-fill'
                                            viewBox='0 0 16 16'
                                            alt='Log in'
                                        >
                                            <path d='M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z' />
                                        </svg>
                                    </Link>
                                </Nav>
                            </div>
                        ) : (
                            <Button
                                className='ms-auto btn-dark rounded-pill'
                                onClick={handleLogin}
                                onKeyDown={handleKeyDownLogin}
                            >
                                Log In
                            </Button>
                        )}
                    </div>
                    <InputGroup className='d-flex d-sm-none'>
                        <button
                            className='custom-header-searchbar-btn d-flex border-0 m-auto bg-transparent p-1'
                            onClick={search}
                            onKeyDown={handleKeyDownSearch}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='currentColor'
                                className='smallIcon bi bi-search'
                                viewBox='0 0 16 16'
                                alt='Search symbol, a magnifying glass'
                            >
                                <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                            </svg>
                        </button>
                        <Form.Control
                            type='search'
                            placeholder='Search'
                            className='custom-header-searchbar rounded-pill bg-light'
                            aria-label='Search'
                            value={searchWord}
                            onChange={handleFilter}
                            onKeyDown={handleKeyDownSearch}
                            onFocus={onFocusMobile}
                            onBlur={onBlurMobile}
                        />
                        {filteredData.length > 0 && (
                            <div className={focusedMobile}>
                                <div className='searchList scrollBarContent rounded-bottom'>
                                    {filteredData.map((venue, key) => {
                                        return (
                                            <Link
                                                to={{
                                                    pathname: `/venue/${venue.id}`,
                                                }}
                                                className='search-list-item text-decoration-none text-dark d-block p-2'
                                                key={key}
                                                aria-label='Go to the venue'
                                            >
                                                {venue.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </InputGroup>
                </div>
            </Container>
        </Navbar>
    );
}
