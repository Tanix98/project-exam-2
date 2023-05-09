import '../RenderVenues/index.css';
import LoadingScreen from '../LoadingScreen';
import LoadingError from '../LoadingError';
import noImg from '../../assets/imgs/no_img.svg';
import UseApiGet from '../../api/UseApiGet';
import { Link } from 'react-router-dom';

function RenderVenues() {
    const { data, isLoading, isError } = UseApiGet(
        'https://api.noroff.dev/api/v1/holidaze/venues?_owner=true&_bookings=true'
    );

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isError) {
        return <LoadingError />;
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
                    key={key}
                >
                    <div className='venuesContainer d-flex flex-column my-2'>
                        <div className='venuesImgContainer rounded shadow-sm d-inline-block'>
                            <img
                                className='img-fluid venuesImg'
                                src={venue.media[0] ? venue.media[0] : noImg}
                                alt={venue.name}
                            />
                        </div>
                        <div className='venuesOwner mt-1 d-flex align-items-center gap-1'>
                            {venue.owner.avatar ? (
                                <img
                                    src={venue.owner.avatar}
                                    className='rounded-circle'
                                    alt='Avatar'
                                />
                            ) : (
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    className='bi bi-person-circle mw-100 mh-100'
                                    viewBox='0 0 16 16'
                                    alt='Default avatar'
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
                        <p className='venuesTitle title-p'>{venue.name}</p>
                        <p>Price: {venue.price}kr</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default RenderVenues;
