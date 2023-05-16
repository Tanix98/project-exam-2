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
                    <Link to='/'>Click here</Link>
                    <p>to create a new venue</p>
                </div>
            </div>
        );
    }

    return (
        <div className='d-flex justify-content-center'>
            <div id='venues-container'>
                {dataAuth.map((venue, key) => (
                    <Link
                        to={{
                            pathname: `/venue/${venue.id}`,
                        }}
                        key={key}
                    >
                        <div className='venueContainer d-flex flex-column my-2 p-2 rounded'>
                            <div className='venueImgContainer rounded shadow-sm d-inline-block'>
                                <img
                                    className='img-fluid venueImg'
                                    src={
                                        venue.media[0] ? venue.media[0] : noImg
                                    }
                                    alt={venue.name}
                                />
                            </div>
                            <p className='venueTitle title-p'>{venue.name}</p>
                            <p>Price: {venue.price}kr</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default RenderUserVenues;
