import '../Profile/index.css';
import EditUserAvatar from '../../components/EditUserAvatar';
import UseApiGetAuth from '../../api/UseApiGetAuth';
import LoadingScreen from '../../components/LoadingScreen';
import LoadingError from '../../components/LoadingError';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

function Profile() {
    let { name } = useParams();

    const { data, isLoading, isError, noAuth } = UseApiGetAuth(
        `https://api.noroff.dev/api/v1/holidaze/profiles/${name}?_venues=true`
    );

    useEffect(() => {
        document.title = data.name + ' - Holidaze';
    }, [data.name + ' - Holidaze']);

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

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isError) {
        return <LoadingError />;
    }

    return (
        <Container>
            <div
                className={
                    localStorage.getItem('userVenueManager')
                        ? 'd-flex justify-content-center flex-wrap gap-5'
                        : 'd-flex flex-column justify-content-center flex-wrap gap-4'
                }
            >
                <div className='text-center'>
                    {data.avatar ? (
                        <img
                            src={data.avatar}
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
                    <h1 className='mt-1'>{data.name}</h1>
                    {data.venueManager && (
                        <p className='text-muted'>Venue manager</p>
                    )}
                </div>
                {data.name ===
                    localStorage.getItem('userName').replace(/['"]+/g, '') && (
                    <div
                        className={
                            localStorage.getItem('userVenueManager')
                                ? 'd-flex flex-column gap-2'
                                : 'd-flex justify-content-center gap-2'
                        }
                    >
                        <EditUserAvatar />
                        {data.venueManager && (
                            <Button
                                variant='dark'
                                className='px-5 rounded-pill'
                            >
                                My bookings
                            </Button>
                        )}
                        {data.venueManager && (
                            <Button
                                variant='outline-dark'
                                className='rounded-pill'
                            >
                                My venues
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
}

export default Profile;
