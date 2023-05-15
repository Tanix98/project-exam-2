import LoadingScreen from '../LoadingScreen';
import LoadingError from '../LoadingError';
import UseApiGetAuth from '../../api/UseApiGetAuth';
import EditUserBooking from '../EditUserBooking';
import DeleteUserBooking from '../deleteUserBooking';
import { Button } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

function RenderUserBookings(props) {
    const { dataAuth, isLoadingAuth, isErrorAuth } = UseApiGetAuth(props.url);
    console.log(dataAuth);

    if (isLoadingAuth) {
        return <LoadingScreen />;
    }

    if (isErrorAuth) {
        return <LoadingError />;
    }

    if (dataAuth.length === 0) {
        return <h2>Your booking list is empty</h2>;
    }

    const editBooking = (id) => {
        console.log(id);
    };

    const deleteBooking = (id) => {
        console.log(id);
    };

    // Buttons enter keypress
    function handleKeyDownDelete(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            deleteBooking('');
        }
    }

    return (
        <div className='d-flex gap-3 flex-wrap text-break px-4 px-sm-4 m-auto'>
            {dataAuth.map((booking, key) => (
                <div
                    className='rounded d-flex flex-column my-2 p-3 bg-secondary'
                    key={key}
                >
                    <div>
                        <p>Guests: {booking.guests}</p>
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
