import '../RenderVenues/index.css';
import noImg from '../../assets/imgs/no_img.svg';
import UseApi from '../../api/UseApi';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function RenderVenues() {
    const { data, isLoading, isError } = UseApi(
        'https://api.noroff.dev/api/v1/holidaze/venues?_owner=true&_bookings=true'
    );

    if (isLoading) {
        return (
            <div className='text-center'>
                <div className='lds-dual-ring'></div>
                <p>Loading venues...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <Container>
                <h1>Error, could not load venues.</h1>
            </Container>
        );
    }

    return (
        <div
            id='venues-container'
            className='d-flex gap-3 flex-wrap text-break px-4 px-sm-4 m-auto'
        >
            {data.map((venue, key) => (
                <Link
                    to={{
                        pathname: `/venue/${venue.id}`,
                    }}
                >
                    <div
                        key={key}
                        className='venuesContainer d-flex flex-column my-2'
                    >
                        <div className='venuesImgContainer rounded shadow-sm d-inline-block'>
                            {venue.media[0] ? (
                                <img
                                    className='img-fluid venuesImg'
                                    src={venue.media[0]}
                                    alt={'Venue: ' + venue.name}
                                />
                            ) : (
                                <img
                                    className='img-fluid venuesImg'
                                    src={noImg}
                                    alt='No venue image'
                                />
                            )}
                        </div>
                        <div className='venuesOwner mt-1 d-flex align-items-center gap-1'>
                            {venue.owner.avatar ? (
                                <img
                                    src={venue.owner.avatar}
                                    className='rounded-circle'
                                />
                            ) : (
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    className='bi bi-person-circle mw-100 mh-100'
                                    viewBox='0 0 16 16'
                                    alt='Navigation links'
                                >
                                    <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                                    <path
                                        fillRule='evenodd'
                                        d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
                                    />
                                </svg>
                            )}
                            <p className='text-muted'>{venue.owner.name}</p>
                        </div>
                        <h2 className='venuesTitle'>{venue.name}</h2>
                        <p>Price: {venue.price}kr</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default RenderVenues;
