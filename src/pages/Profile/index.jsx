import '../Profile/index.css';
import UseApiGetAuth from '../../api/UseApiGetAuth';
import LoadingScreen from '../../components/LoadingScreen';
import LoadingError from '../../components/LoadingError';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

function Profile() {
    let { name } = useParams();

    const { data, isLoading, isError } = UseApiGetAuth(
        `https://api.noroff.dev/api/v1/holidaze/profiles/${name}?_venues=true`
    );

    console.log(data);

    useEffect(() => {
        document.title = data.name + ' - Holidaze';
    }, [data.name + ' - Holidaze']);

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isError) {
        return <LoadingError />;
    }

    const link = (
        <Link to='/login' className='linkText'>
            Log in or sign up
        </Link>
    );

    if (data.statusCode === 401) {
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

    return (
        <Container>
            <div className='d-flex d-md-block justify-content-center gap-4 flex-wrap'>
                <div className='d-flex d-md-none flex-column gap-2'>
                    <Button variant='success' className='rounded-pill'>
                        Edit avatar
                    </Button>
                    <Button
                        variant='outline-dark'
                        className='px-4 rounded-pill'
                    >
                        My bookings
                    </Button>
                    <Button variant='dark' className='rounded-pill'>
                        My venues
                    </Button>
                </div>
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
                    {data.venueManager && <p>Venue manager</p>}
                </div>
                <div className='d-none d-md-flex justify-content-center gap-2 mt-3'>
                    <Button variant='success' className='px-4 rounded-pill'>
                        Edit avatar
                    </Button>
                    <Button
                        variant='outline-dark'
                        className='px-4 rounded-pill'
                    >
                        My bookings
                    </Button>
                    <Button variant='dark' className='px-4 rounded-pill'>
                        My venues
                    </Button>
                </div>
            </div>
        </Container>
    );
}

export default Profile;
