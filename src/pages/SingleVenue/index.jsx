import '../SingleVenue/index';
import UseApi from '../../api/UseApi';
import noImg from '../../assets/imgs/no_img.svg';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';

function SingleVenue() {
    let { id } = useParams();

    const { data, isLoading, isError } = UseApi(
        `https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`
    );

    useEffect(() => {
        document.title = data.name + ' - Holidaze';
    }, []);

    const dateString = new Date(data.created);
    const venueDate = new Date(dateString).toUTCString();
    console.log(venueDate);

    if (isLoading) {
        return (
            <div className='text-center'>
                <div className='lds-dual-ring'></div>
                <p>Loading venue...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <Container>
                <h1>Error, could not load venue.</h1>
            </Container>
        );
    }

    // Removes leading zeroes from day number
    const venueDateDayRaw = venueDate.substring(4, 7);
    const venueDateDay = parseFloat(venueDateDayRaw) + ' ';

    return (
        <Container>
            <div className='venueImgContainer d-inline-block rounded shadow-sm'>
                {data.media ? (
                    <img
                        className='img-fluid venueImg'
                        src={data.media}
                        alt={'Venue: ' + data.name}
                    />
                ) : (
                    <img
                        className='img-fluid venueImg'
                        src={noImg}
                        alt='No venue image'
                    />
                )}
            </div>
            <div className='venueOwner mt-1 d-flex align-items-center gap-1'>
                {data.owner.avatar ? (
                    <img src={data.owner.avatar} className='rounded-circle' />
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
                <p className='text-muted'>{data.owner.name}</p>
            </div>
            <div className='mt-1'>
                <h1>{data.name}</h1>
                <p className='undertitle-p'>Price: {data.price}kr</p>
            </div>
            <div className='mt-2'>
                <p className='undertitle-p'>Description:</p>
                <p>{data.description}</p>
            </div>
            <div className='mt-2'>
                <p className='undertitle-p'>Created:</p>
                <p>{venueDateDay + venueDate.substring(8, 16)}</p>
            </div>
        </Container>
    );
}

export default SingleVenue;
