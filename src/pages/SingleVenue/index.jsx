import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import '../SingleVenue/index.css';
import LoadingScreen from '../../components/LoadingScreen';
import LoadingError from '../../components/LoadingError';
import UseApiGet from '../../api/UseApiGet';
import EditUserVenue from '../../components/EditUserVenue';
import DeleteUserVenue from '../../components/DeleteUserVenue';
import noImg from '../../assets/imgs/no_img.svg';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import { Button, Col } from 'react-bootstrap';

function SingleVenue() {
    const navigate = useNavigate();
    const NavigateToVenueBookings = () => {
        navigate(`/venue/bookings/${data.id}`);
    };

    let { id } = useParams();

    const { data, isLoading, isError } = UseApiGet(
        `https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`
    );

    useEffect(() => {
        document.title = data.name + ' - Holidaze';
    }, [data.name + ' - Holidaze']);

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isError || data.errors) {
        return <LoadingError />;
    }

    const dateString = new Date(data.created);
    const venueDate = new Date(dateString).toUTCString();
    // Removes leading zeroes from day number
    const venueDateDayRaw = venueDate.substring(4, 7);
    const venueDateDay = parseFloat(venueDateDayRaw) + ' ';

    const venueLocation = () => {
        if (
            (data.location.country !== 'Unknown' &&
                data.location.city !== 'Unknown' &&
                data.location.address !== 'Unknown') ||
            (data.location.country !== '' &&
                data.location.city !== '' &&
                data.location.address !== '')
        ) {
            return (
                <a
                    className='d-inline-flex align-items-center gap-3'
                    id='venueMetaLocation'
                    target='_blank'
                    rel='noreferrer'
                    href={
                        `http://maps.google.com/?q=` +
                        data.location.address +
                        ', ' +
                        data.location.city +
                        ', ' +
                        data.location.country
                    }
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='currentColor'
                        className='bi bi-geo-alt-fill'
                        viewBox='0 0 16 16'
                        alt='Location'
                    >
                        <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z' />
                    </svg>
                    <p className='undertitle-p'>
                        {data.location.address && data.location.address + ', '}
                        {data.location.city && data.location.city + ', '}
                        {data.location.country && data.location.country}
                    </p>
                </a>
            );
        }
    };

    const venueBtns = () => {
        if (localStorage.getItem('userName')) {
            if (
                data.owner.name ===
                localStorage.getItem('userName').replace(/['"]+/g, '')
            ) {
                return (
                    <div className='my-3'>
                        <Button
                            variant='primary'
                            className='rounded-pill w-100 mb-3'
                            onClick={NavigateToVenueBookings}
                        >
                            View Bookings
                        </Button>
                        <div className='d-flex flex-wrap gap-3'>
                            <Col>
                                <DeleteUserVenue id={data.id} />
                            </Col>
                            <Col>
                                <EditUserVenue data={data} />
                            </Col>
                        </div>
                    </div>
                );
            } else {
                return (
                    <Button
                        variant='primary'
                        className='rounded-pill w-100 my-3'
                    >
                        View Available Dates
                    </Button>
                );
            }
        } else {
            return (
                <Button variant='primary' className='rounded-pill w-100 my-3'>
                    View Available Dates
                </Button>
            );
        }
    };

    return (
        <Container id='venue-container'>
            <Carousel
                id='img-carousel'
                variant='dark'
                className='rounded d-flex align-items-center justify-content-center'
                interval={50000}
            >
                {data.media[0] ? (
                    data.media.map((venueImg, key) => (
                        <Carousel.Item
                            key={key}
                            className='carouselImgContainer rounded text-center'
                        >
                            <img
                                className='carouselImg rounded shadow-sm my-auto'
                                src={venueImg}
                                alt={data.title}
                            />
                        </Carousel.Item>
                    ))
                ) : (
                    <Carousel.Item className='carouselImgContainer rounded'>
                        <img
                            className='carouselImg rounded shadow-sm'
                            src={noImg}
                            alt={data.title}
                        />
                    </Carousel.Item>
                )}
            </Carousel>
            <div className='mt-3'>
                <h1 className='mb-1'>{data.name}</h1>
                <p className='undertitle-p'>Price: {data.price}kr</p>
            </div>
            <hr />
            <Link
                to={{ pathname: `/profile/${data.owner.name}` }}
                id='venueOwner'
                className='mt-1 d-flex align-items-center gap-2'
            >
                {data.owner.avatar ? (
                    <img
                        src={data.owner.avatar}
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
                <div className='d-flex flex-column'>
                    <p className='mb-auto'>{data.owner.name}</p>
                    <p className='mt-auto text-muted'>Venue manager</p>
                </div>
            </Link>
            {venueBtns()}
            <div className='bg-white shadow-sm rounded d-flex flex-column gap-3 p-3'>
                {venueLocation()}
                <div
                    className='d-flex align-items-center gap-3'
                    id='venue-meta'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='currentColor'
                        className='bi bi-people-fill'
                        viewBox='0 0 16 16'
                        alt='Max guests'
                    >
                        <path d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' />
                    </svg>
                    <p className='undertitle-p'>
                        {'Up to ' + data.maxGuests + ' guests'}
                    </p>
                </div>
                <div
                    className={
                        data.meta.wifi
                            ? 'd-inline-flex align-items-center gap-3'
                            : 'd-inline-flex align-items-center gap-3 text-muted'
                    }
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='currentColor'
                        className='bi bi-wifi'
                        viewBox='0 0 16 16'
                        alt='Wi-Fi'
                    >
                        <path d='M15.384 6.115a.485.485 0 0 0-.047-.736A12.444 12.444 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049z' />
                        <path d='M13.229 8.271a.482.482 0 0 0-.063-.745A9.455 9.455 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065zm-2.183 2.183c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.478 5.478 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091l.016-.015zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z' />
                    </svg>
                    <p className='undertitle-p'>
                        {data.meta.wifi
                            ? 'Wi-Fi included'
                            : 'Wi-Fi not included'}
                    </p>
                </div>
                <div
                    className={
                        data.meta.parking
                            ? 'd-inline-flex align-items-center gap-3'
                            : 'd-inline-flex align-items-center gap-3 text-muted'
                    }
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='currentColor'
                        className='bi bi-car-front-fill'
                        viewBox='0 0 16 16'
                        alt='Parking'
                    >
                        <path d='M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17 1.247 0 3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z' />
                    </svg>
                    <p className='undertitle-p'>
                        {data.meta.parking
                            ? 'Parking included'
                            : 'Parking not included'}
                    </p>
                </div>
                <div
                    className={
                        data.meta.breakfast
                            ? 'd-inline-flex align-items-center gap-3'
                            : 'd-inline-flex align-items-center gap-3 text-muted'
                    }
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='currentColor'
                        className='bi bi-cup-hot-fill'
                        viewBox='0 0 16 16'
                        alt='Breakfast'
                    >
                        <path
                            fillRule='evenodd'
                            d='M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6H.5ZM13 12.5a2.01 2.01 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5Z'
                        />
                        <path d='m4.4.8-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 3.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8Zm3 0-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 6.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8Zm3 0-.003.004-.014.019a4.077 4.077 0 0 0-.204.31 2.337 2.337 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.198 3.198 0 0 1-.202.388 5.385 5.385 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 9.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8Z' />
                    </svg>
                    <p className='undertitle-p'>
                        {data.meta.breakfast
                            ? 'Breakfast included'
                            : 'Breakfast not included'}
                    </p>
                </div>
                <div
                    className={
                        data.meta.pets
                            ? 'd-inline-flex align-items-center gap-3'
                            : 'd-inline-flex align-items-center gap-3 text-muted'
                    }
                    id='venueMetaPets'
                >
                    <FontAwesomeIcon icon={faDog} />
                    <p className='undertitle-p'>
                        {data.meta.pets ? 'Pets allowed' : 'Pets not allowed'}
                    </p>
                </div>
            </div>

            <div className='my-3'>
                <p className='undertitle-p'>Description:</p>
                <p>{data.description}</p>
            </div>
            <div>
                <p className='undertitle-p'>Created:</p>
                <p>{venueDateDay + venueDate.substring(8, 16)}</p>
            </div>
        </Container>
    );
}

export default SingleVenue;

/* Desktop meta data
    <div className='bg-white shadow-sm rounded d-none d-sm-flex p-3' id='venue-meta'>
                    <Col className='d-flex flex-column gap-3'>
                        <div
                            className={
                                data.meta.wifi
                                    ? 'd-flex align-items-center gap-3'
                                    : 'd-flex align-items-center gap-3 text-muted'
                            }
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                fill='currentColor'
                                className='bi bi-wifi'
                                viewBox='0 0 16 16'
                                alt='Wi-Fi'
                            >
                                <path d='M15.384 6.115a.485.485 0 0 0-.047-.736A12.444 12.444 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049z' />
                                <path d='M13.229 8.271a.482.482 0 0 0-.063-.745A9.455 9.455 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065zm-2.183 2.183c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.478 5.478 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091l.016-.015zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z' />
                            </svg>
                            <p className='undertitle-p'>
                                {data.meta.wifi
                                    ? 'Wi-Fi included'
                                    : 'Wi-Fi not included'}
                            </p>
                        </div>
                        <div
                            className={
                                data.meta.parking
                                    ? 'd-flex align-items-center gap-3'
                                    : 'd-flex align-items-center gap-3 text-muted'
                            }
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                fill='currentColor'
                                className='bi bi-car-front-fill'
                                viewBox='0 0 16 16'
                                alt='Parking'
                            >
                                <path d='M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17 1.247 0 3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z' />
                            </svg>
                            <p className='undertitle-p'>
                                {data.meta.parking
                                    ? 'Parking included'
                                    : 'Parking not included'}
                            </p>
                        </div>
                        <div
                            className={
                                data.meta.breakfast
                                    ? 'd-flex align-items-center gap-3'
                                    : 'd-flex align-items-center gap-3 text-muted'
                            }
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                fill='currentColor'
                                className='bi bi-cup-hot-fill'
                                viewBox='0 0 16 16'
                                alt='Breakfast'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6H.5ZM13 12.5a2.01 2.01 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5Z'
                                />
                                <path d='m4.4.8-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 3.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8Zm3 0-.003.004-.014.019a4.167 4.167 0 0 0-.204.31 2.327 2.327 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.31 3.31 0 0 1-.202.388 5.444 5.444 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 6.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8Zm3 0-.003.004-.014.019a4.077 4.077 0 0 0-.204.31 2.337 2.337 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.593.593 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3.198 3.198 0 0 1-.202.388 5.385 5.385 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4.149 4.149 0 0 0 .204-.31 2.06 2.06 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.593.593 0 0 0-.09-.252A4.334 4.334 0 0 0 9.6 2.8l-.01-.012a5.099 5.099 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a5.446 5.446 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8Z' />
                            </svg>
                            <p className='undertitle-p'>
                                {data.meta.breakfast
                                    ? 'Breakfast included'
                                    : 'Breakfast not included'}
                            </p>
                        </div>
                    </Col>
                    <Col className='d-flex flex-column gap-3'>
                        <div
                            className={
                                data.meta.pets
                                    ? 'd-flex align-items-center gap-3'
                                    : 'd-flex align-items-center gap-3 text-muted'
                            }
                            id='venueMeta'
                        >
                            <FontAwesomeIcon icon={faDog} />
                            <p className='undertitle-p'>
                                {data.meta.pets
                                    ? 'Pets allowed'
                                    : 'Pets not allowed'}
                            </p>
                        </div>
                        <div className='d-flex align-items-center gap-3'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                fill='currentColor'
                                className='bi bi-people-fill'
                                viewBox='0 0 16 16'
                                alt='Max guests'
                            >
                                <path d='M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' />
                            </svg>
                            <p className='undertitle-p'>
                                {'Up to ' + data.maxGuests + ' guests'}
                            </p>
                        </div>

                        {data.location.address && (
                            <a
                                className='d-flex align-items-center gap-3'
                                target='_blank'
                                href={
                                    `http://maps.google.com/?q=` +
                                    data.location.address +
                                    ', ' +
                                    data.location.city +
                                    ', ' +
                                    data.location.country
                                }
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='24'
                                    height='24'
                                    fill='currentColor'
                                    className='bi bi-geo-alt-fill'
                                    viewBox='0 0 16 16'
                                    alt='Location'
                                >
                                    <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z' />
                                </svg>
                                <p className='undertitle-p'>
                                    {data.location.address &&
                                        data.location.address + ', '}
                                    {data.location.city &&
                                        data.location.city + ', '}
                                    {data.location.country &&
                                        data.location.country}
                                </p>
                            </a>
                        )}
                    </Col>
                </div>
*/
