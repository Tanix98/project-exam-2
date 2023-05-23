import LoadingScreen from '../LoadingScreen';
import LoadingError from '../LoadingError';
import UseApiGetAuth from '../../api/UseApiGetAuth';
import EditUserBooking from '../EditUserBooking';
import DeleteUserBooking from '../deleteUserBooking';
import GetTotalAmountOfDays from '../GetTotalAmountOfDays/index';
import { Col } from 'react-bootstrap';

function RenderUserBookings(props) {
    const { dataAuth, isLoadingAuth, isErrorAuth } = UseApiGetAuth(props.url);

    if (isLoadingAuth) {
        return <LoadingScreen />;
    }

    if (isErrorAuth) {
        return <LoadingError />;
    }

    if (dataAuth.length === 0) {
        return <h2>Your booking list is empty</h2>;
    }

    return (
        <div className='d-flex gap-3 flex-wrap text-break px-4 px-sm-4 m-auto'>
            {dataAuth.map((booking, key) => (
                <div
                    className='rounded d-flex flex-column my-1 p-3 bg-white shadow-sm'
                    key={key}
                >
                    <div>
                        <p>Guests: {booking.guests}</p>
                        <p>
                            Length:{' '}
                            {
                                <GetTotalAmountOfDays
                                    date1={
                                        booking.dateFrom.substring(5, 7) +
                                        '/' +
                                        booking.dateFrom.substring(8, 10) +
                                        '/' +
                                        booking.dateFrom.substring(0, 4)
                                    }
                                    date2={
                                        booking.dateTo.substring(5, 7) +
                                        '/' +
                                        booking.dateTo.substring(8, 10) +
                                        '/' +
                                        booking.dateTo.substring(0, 4)
                                    }
                                />
                            }{' '}
                            days
                        </p>
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
                        <hr className='pb-1' />
                        <div className='d-flex flex-column gap-2'>
                            <Col>
                                <EditUserBooking id={booking.id} />
                            </Col>
                            <Col>
                                <DeleteUserBooking id={booking.id} />
                            </Col>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RenderUserBookings;
