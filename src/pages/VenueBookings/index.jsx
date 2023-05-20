import '../VenueBookings/index.css';
import UseApiGet from '../../api/UseApiGet';
import LoadingScreen from '../../components/LoadingScreen';
import LoadingError from '../../components/LoadingError';
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function VenueBookings() {
    let { id } = useParams();

    const { data, isLoading, isError } = UseApiGet(
        `https://api.noroff.dev/api/v1/holidaze/venues/${id}?_owner=true&_bookings=true`
    );

    useEffect(() => {
        document.title = 'Bookings for ' + data.name + ' - Holidaze';
    }, ['Bookings for ' + data.name + ' - Holidaze']);

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isError || data.errors) {
        return <LoadingError />;
    }

    return (
        <Container className='m-auto'>
            <Link
                to={`/venue/${id}`}
                className='linkText d-inline-flex gap-2 align-items-center p-2 ps-0 pb-1 mb-1'
            >
                <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    class='bi bi-arrow-left'
                    viewBox='0 0 16 16'
                >
                    <path
                        fill-rule='evenodd'
                        d='M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z'
                    />
                </svg>{' '}
                Go back
            </Link>
            <h1 className='mb-4'>Bookings for {data.name}</h1>
            <div className='d-flex gap-3 flex-wrap' id='user-bookings'>
                {data.bookings.map((booking, index) => (
                    <div
                        className='userVenueBooking rounded d-flex flex-column my-1 p-3 bg-secondary'
                        key={index}
                    >
                        <p>Guest amount: {booking.guests}</p>
                        <p>
                            Check-in:{' '}
                            {booking.dateFrom.substring(8, 10) +
                                '.' +
                                booking.dateFrom.substring(5, 7) +
                                '.' +
                                booking.dateFrom.substring(0, 4)}
                        </p>
                        <p>
                            Check-out:{' '}
                            {booking.dateTo.substring(8, 10) +
                                '.' +
                                booking.dateTo.substring(5, 7) +
                                '.' +
                                booking.dateTo.substring(0, 4)}
                        </p>
                    </div>
                ))}
            </div>
        </Container>
    );
}
