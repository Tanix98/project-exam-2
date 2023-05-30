import '../Profile/index.css';
import EditUserAvatar from '../../components/EditUserAvatar';
import RenderUserBookings from '../../components/RenderUserBookings';
import RenderUserVenues from '../../components/RenderUserVenues';
import UseApiGetAuth from '../../api/UseApiGetAuth';
import LoadingScreen from '../../components/LoadingScreen';
import LoadingError from '../../components/LoadingError';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

function Profile() {
    let { name } = useParams();

    const { dataAuth, isLoadingAuth, isErrorAuth, noAuth } = UseApiGetAuth(
        `https://api.noroff.dev/api/v1/holidaze/profiles/${name}`
    );

    useEffect(() => {
        document.title = dataAuth.name + ' - Holidaze';
    }, [dataAuth.name]);

    // Toggle between user booking and user venues
    const [bookingsDisplay, setBookingsDisplay] = useState('d-flex');
    const [venuesDisplay, setVenuesDisplay] = useState('d-none');
    const [myBookingsBtnColor, setMyBookingsBtnColor] = useState('dark');
    const [myVenuesBtnColor, setMyVenuesBtnColor] = useState('outline-dark');
    const viewBookings = () => {
        setBookingsDisplay('d-flex');
        setVenuesDisplay('d-none');
        setMyBookingsBtnColor('dark');
        setMyVenuesBtnColor('outline-dark');
    };
    const viewVenues = () => {
        setBookingsDisplay('d-none');
        setVenuesDisplay('d-flex');
        setMyBookingsBtnColor('outline-dark');
        setMyVenuesBtnColor('dark');
    };
    const handleKeyDownViewBookings = (event) => {
        if (event.keyCode === 13) {
            viewBookings();
        }
    };
    const handleKeyDownViewVenues = (event) => {
        if (event.keyCode === 13) {
            viewVenues();
        }
    };

    const link = (
        <Link to='/login' className='linkText' aria-label='Log in or sign up'>
            Log in or sign up
        </Link>
    );
    if (noAuth) {
        document.title = 'User profile - Holidaze';

        return (
            <Container className='d-flex justify-content-center'>
                <div>
                    <h1 className='mb-3'>Access denied!</h1>
                    <p>{link} to view profile.</p>
                </div>
            </Container>
        );
    }

    if (isLoadingAuth) {
        return <LoadingScreen />;
    }

    if (isErrorAuth) {
        return <LoadingError />;
    }

    return (
        <Container>
            <div className='d-flex flex-column align-items-center gap-5'>
                <div className='d-flex flex-column justify-content-center flex-wrap gap-4'>
                    {dataAuth.venueManager ? (
                        <Col className='text-center'>
                            {dataAuth.avatar ? (
                                <img
                                    src={dataAuth.avatar}
                                    className='profile-page-avatar rounded'
                                    alt={`${dataAuth.name}'s Avatar`}
                                />
                            ) : (
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    className='bi bi-person-fill profile-page-avatar mw-100 mh-100 bg-dark text-light p-1 rounded'
                                    viewBox='0 0 16 16'
                                    alt={`${dataAuth.name}'s Avatar`}
                                >
                                    <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
                                </svg>
                            )}
                            <h1 className='mt-2'>{dataAuth.name}</h1>
                            <p className='text-muted'>Venue manager</p>
                        </Col>
                    ) : (
                        <Col className='text-center'>
                            {dataAuth.avatar ? (
                                <img
                                    src={dataAuth.avatar}
                                    className='profile-page-avatar rounded'
                                    alt={`${dataAuth.name}'s Avatar`}
                                />
                            ) : (
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    className='bi bi-person-fill profile-page-avatar mw-100 mh-100 bg-dark text-light p-1 rounded'
                                    viewBox='0 0 16 16'
                                    alt={`${dataAuth.name}'s Avatar`}
                                >
                                    <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
                                </svg>
                            )}
                            <h1 className='mt-1'>{dataAuth.name}</h1>
                        </Col>
                    )}
                    {dataAuth.name ===
                        localStorage
                            .getItem('userName')
                            .replace(/['"]+/g, '') && (
                        <Col
                            className={
                                localStorage.getItem('userVenueManager')
                                    ? 'd-flex flex-column gap-2 w-100'
                                    : 'd-flex justify-content-center gap-2 w-100'
                            }
                        >
                            {dataAuth.venueManager ? (
                                <>
                                    <EditUserAvatar />
                                    <div className='d-flex flex-wrap gap-2 mt-1'>
                                        <Col>
                                            <Button
                                                variant={myBookingsBtnColor}
                                                className='w-100 rounded-pill'
                                                onClick={viewBookings}
                                                onKeyDown={
                                                    handleKeyDownViewBookings
                                                }
                                            >
                                                My bookings
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button
                                                variant={myVenuesBtnColor}
                                                className='w-100 rounded-pill'
                                                onClick={viewVenues}
                                                onKeyDown={
                                                    handleKeyDownViewVenues
                                                }
                                            >
                                                My venues
                                            </Button>
                                        </Col>
                                    </div>
                                </>
                            ) : (
                                <EditUserAvatar />
                            )}
                        </Col>
                    )}
                </div>
                {dataAuth.name ===
                    localStorage.getItem('userName').replace(/['"]+/g, '') && (
                    <div>
                        <div className={bookingsDisplay}>
                            <RenderUserBookings
                                url={`https://api.noroff.dev/api/v1/holidaze/profiles/${dataAuth.name}/bookings?sort=created`}
                            />
                        </div>
                        <div className={venuesDisplay}>
                            <RenderUserVenues
                                url={`https://api.noroff.dev/api/v1/holidaze/profiles/${dataAuth.name}/venues?sort=created&limit=50`}
                            />
                        </div>
                    </div>
                )}
                {dataAuth.venueManager &&
                    dataAuth.name !==
                        localStorage
                            .getItem('userName')
                            .replace(/['"]+/g, '') && (
                        <RenderUserVenues
                            url={`https://api.noroff.dev/api/v1/holidaze/profiles/${dataAuth.name}/venues?sort=created&limit=50`}
                        />
                    )}
            </div>
        </Container>
    );
}

export default Profile;
