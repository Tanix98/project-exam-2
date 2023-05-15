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
        <div
            id='venues-container'
            className='d-flex gap-3 flex-wrap text-break px-4 px-sm-4 m-auto'
        >
            {dataAuth.map((venue, key) => (
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
                        <p className='venuesTitle title-p'>{venue.name}</p>
                        <p>Price: {venue.price}kr</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default RenderUserVenues;
