import '../Profile/index.css';
import EditUserAvatar from '../../components/EditUserAvatar';
import RenderUserBookings from '../../components/RenderUserBookings';
import RenderUserVenues from '../../components/RenderUserVenues';
import UseApiGetAuth from '../../api/UseApiGetAuth';
import LoadingScreen from '../../components/LoadingScreen';
import LoadingError from '../../components/LoadingError';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

function Profile() {
    let { name } = useParams();

    const { dataAuth, isLoadingAuth, isErrorAuth, noAuth } = UseApiGetAuth(
        `https://api.noroff.dev/api/v1/holidaze/profiles/${name}`
    );

    useEffect(() => {
        document.title = dataAuth.name + ' - Holidaze';
    }, [dataAuth.name + ' - Holidaze']);

    // Toggle between user booking and user venues
    const [bookingsDisplay, setBookingsDisplay] = useState('d-flex');
    const [venuesDisplay, setVenuesDisplay] = useState('d-none');
    const viewBookings = () => {
        setBookingsDisplay('d-flex');
        setVenuesDisplay('d-none');
    };
    const viewVenues = () => {
        setBookingsDisplay('d-none');
        setVenuesDisplay('d-flex');
    };

    const link = (
        <Link to='/login' className='linkText'>
            Log in or sign up
        </Link>
    );
    if (noAuth) {
        document.title = 'User profile - Holidaze';

        return (
            <Container className='d-flex justify-content-center'>
                <div>
                    <h1 className='mb-3'>Access denied! </h1>
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
                <div
                    className={
                        localStorage.getItem('userVenueManager')
                            ? 'd-flex justify-content-center flex-wrap gap-5'
                            : 'd-flex flex-column justify-content-center flex-wrap gap-4'
                    }
                >
                    <div className='text-center'>
                        {dataAuth.avatar ? (
                            <img
                                src={dataAuth.avatar}
                                className='rounded-circle img-fluid'
                                id='profile-page-avatar'
                                alt='Avatar'
                            />
                        ) : (
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='currentColor'
                                className='bi bi-person-circle mw-100 mh-100'
                                viewBox='0 0 16 16'
                                alt='Default avatar'
                                id='profile-page-avatar'
                            >
                                <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                                <path
                                    fillRule='evenodd'
                                    d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
                                />
                            </svg>
                        )}
                        <h1 className='mt-1'>{dataAuth.name}</h1>
                        {dataAuth.venueManager && (
                            <p className='text-muted'>Venue manager</p>
                        )}
                    </div>
                    {dataAuth.name ===
                        localStorage
                            .getItem('userName')
                            .replace(/['"]+/g, '') && (
                        <div
                            className={
                                localStorage.getItem('userVenueManager')
                                    ? 'd-flex flex-column gap-2'
                                    : 'd-flex justify-content-center gap-2'
                            }
                        >
                            <EditUserAvatar />
                            {dataAuth.venueManager && (
                                <div className='d-flex flex-column gap-2'>
                                    <Button
                                        variant='outline-dark'
                                        className='px-5 rounded-pill'
                                        onClick={viewBookings}
                                    >
                                        My bookings
                                    </Button>
                                    <Button
                                        variant='outline-dark'
                                        className='rounded-pill'
                                        onClick={viewVenues}
                                    >
                                        My venues
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {dataAuth.name ===
                    localStorage.getItem('userName').replace(/['"]+/g, '') && (
                    <div>
                        <div className={bookingsDisplay}>
                            <RenderUserBookings
                                url={`https://api.noroff.dev/api/v1/holidaze/profiles/${dataAuth.name}/bookings`}
                            />
                        </div>
                        <div className={venuesDisplay}>
                            <RenderUserVenues
                                url={`https://api.noroff.dev/api/v1/holidaze/profiles/${dataAuth.name}/venues`}
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
                            url={`https://api.noroff.dev/api/v1/holidaze/profiles/${dataAuth.name}/venues`}
                        />
                    )}
            </div>
        </Container>
    );
}

export default Profile;
