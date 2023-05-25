import '../RenderVenues/index.css';
import LoadingScreen from '../LoadingScreen';
import LoadingError from '../LoadingError';
import noImg from '../../assets/imgs/no_img.svg';
import UseApiGetAuth from '../../api/UseApiGetAuth';
import { Link } from 'react-router-dom';

function RenderUserVenues(props) {
    const { dataAuth, isLoadingAuth, isErrorAuth } = UseApiGetAuth(props.url);

    if (isLoadingAuth) {
        return <LoadingScreen />;
    }

    if (isErrorAuth) {
        return <LoadingError />;
    }

    if (dataAuth.length === 0) {
        return (
            <div>
                <h2>Your venue list is empty</h2>
                <div className='d-flex gap-2'>
                    <Link to='/create-venue' aria-label='Create a new venue'>
                        Click here
                    </Link>
                    <p>to create a new venue</p>
                </div>
            </div>
        );
    }

    return (
        <div className='d-flex justify-content-center px-1'>
            <div id='venues-container'>
                {dataAuth.map((venue, key) => (
                    <Link
                        to={{
                            pathname: `/venue/${venue.id}`,
                        }}
                        key={key}
                        aria-label={`Go to venue ${venue.name}`}
                        className='venueContainer rounded'
                    >
                        <div className='d-flex flex-column p-2'>
                            <div className='venueImgContainer rounded shadow-sm d-inline-block'>
                                <img
                                    className='img-fluid venueImg'
                                    src={
                                        venue.media[0] ? venue.media[0] : noImg
                                    }
                                    alt={venue.name}
                                />
                            </div>
                            <p className='venueTitle'>{venue.name}</p>
                            <p>{venue.price} kr / day</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default RenderUserVenues;
