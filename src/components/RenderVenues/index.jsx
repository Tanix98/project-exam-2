import '../RenderVenues/index.css';
import LoadingScreen from '../LoadingScreen';
import LoadingError from '../LoadingError';
import noImg from '../../assets/imgs/no_img.svg';
import UseApiGet from '../../api/UseApiGet';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function RenderVenues(props) {
    const { data, isLoading, isError } = UseApiGet(props.url);

    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get('page');
    //const searchTerm = queryParams.get('search');

    const navigate = useNavigate();
    const navigateToPreviousPage = () => {
        let pageNumber = page;
        pageNumber--;
        navigate(`?page=${pageNumber}`);
    };
    const navigateToNextPage = () => {
        let pageNumber = page;
        pageNumber++;
        navigate(`?page=${pageNumber}`);
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isError) {
        return <LoadingError />;
    }

    function paginationArrows() {
        if (Number(page) === 1 && data.length < 50) {
            return (
                <div className='d-flex flex-wrap justify-content-center align-items-center m-auto gap-4 my-3'>
                    <Button
                        variant='light'
                        onClick={navigateToPreviousPage}
                        className='pageArrows d-flex align-items-center justify-content-center shadow-sm rounded-pill'
                        disabled
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            className='bi bi-chevron-left pe-1'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fillRule='evenodd'
                                d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'
                            />
                        </svg>
                    </Button>
                    <p>Page {page}</p>
                    <Button
                        variant='light'
                        onClick={navigateToNextPage}
                        className='pageArrows d-flex align-items-center justify-content-center shadow-sm rounded-pill'
                        disabled
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            className='bi bi-chevron-right ps-1'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fillRule='evenodd'
                                d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
                            />
                        </svg>
                    </Button>
                </div>
            );
        }
        if (data.length < 50) {
            return (
                <div className='d-flex flex-wrap justify-content-center align-items-center m-auto gap-4 my-3'>
                    <Button
                        variant='light'
                        onClick={navigateToPreviousPage}
                        className='pageArrows d-flex align-items-center justify-content-center shadow-sm rounded-pill'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            className='bi bi-chevron-left pe-1'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fillRule='evenodd'
                                d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'
                            />
                        </svg>
                    </Button>
                    <p>Page {page}</p>
                    <Button
                        variant='light'
                        onClick={navigateToNextPage}
                        className='pageArrows d-flex align-items-center justify-content-center shadow-sm rounded-pill'
                        disabled
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            className='bi bi-chevron-right ps-1'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fillRule='evenodd'
                                d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
                            />
                        </svg>
                    </Button>
                </div>
            );
        }
        if (Number(page) === 1) {
            return (
                <div className='d-flex flex-wrap justify-content-center align-items-center m-auto gap-4 my-3'>
                    <Button
                        variant='light'
                        onClick={navigateToPreviousPage}
                        className='pageArrows d-flex align-items-center justify-content-center shadow-sm rounded-pill'
                        disabled
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            className='bi bi-chevron-left pe-1'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fillRule='evenodd'
                                d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'
                            />
                        </svg>
                    </Button>
                    <p>Page {page}</p>
                    <Button
                        variant='light'
                        onClick={navigateToNextPage}
                        className='pageArrows d-flex align-items-center justify-content-center shadow-sm rounded-pill'
                    >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            className='bi bi-chevron-right ps-1'
                            viewBox='0 0 16 16'
                        >
                            <path
                                fillRule='evenodd'
                                d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
                            />
                        </svg>
                    </Button>
                </div>
            );
        }
        return (
            <div className='d-flex flex-wrap justify-content-center align-items-center m-auto gap-4 my-3'>
                <Button
                    variant='light'
                    onClick={navigateToPreviousPage}
                    className='pageArrows d-flex align-items-center justify-content-center shadow-sm rounded-pill'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        className='bi bi-chevron-left pe-1'
                        viewBox='0 0 16 16'
                    >
                        <path
                            fillRule='evenodd'
                            d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'
                        />
                    </svg>
                </Button>
                <p>Page {page}</p>
                <Button
                    variant='light'
                    onClick={navigateToNextPage}
                    className='pageArrows d-flex align-items-center justify-content-center shadow-sm rounded-pill'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='currentColor'
                        className='bi bi-chevron-right ps-1'
                        viewBox='0 0 16 16'
                    >
                        <path
                            fillRule='evenodd'
                            d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
                        />
                    </svg>
                </Button>
            </div>
        );
    }

    return (
        <div className='d-flex justify-content-center px-1'>
            {props.searchTerm ? (
                <div>
                    <div>
                        <h2 className='text-center pb-2'>
                            Showing search results for "{props.searchTerm}"
                        </h2>
                        {paginationArrows()}
                        <div id='venues-container'>
                            {data
                                .filter((venue) => {
                                    if (props.searchTerm === '') {
                                        return venue;
                                    }
                                    if (
                                        venue.name
                                            .toLowerCase()
                                            .includes(
                                                props.searchTerm.toLowerCase()
                                            )
                                    ) {
                                        return venue;
                                    }
                                    return false;
                                })
                                .map((venue, key) => (
                                    <Link
                                        to={{
                                            pathname: `/venue/${venue.id}`,
                                        }}
                                        key={key}
                                        aria-label={`Go to venue ${venue.name}`}
                                        className='venueContainer rounded d-flex flex-column p-2'
                                    >
                                        <div className='venueImgContainer rounded shadow-sm d-inline-block'>
                                            <img
                                                className='img-fluid venueImg'
                                                src={
                                                    venue.media[0]
                                                        ? venue.media[0]
                                                        : noImg
                                                }
                                                alt={venue.name}
                                            />
                                        </div>
                                        <div className='venueOwner mt-1 d-flex align-items-center gap-1'>
                                            {venue.owner.avatar ? (
                                                <img
                                                    src={venue.owner.avatar}
                                                    className='rounded'
                                                    alt={`Venue owner ${venue.owner.name}'s Avatar`}
                                                />
                                            ) : (
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='currentColor'
                                                    className='bi bi-person-circle mw-100 mh-100'
                                                    viewBox='0 0 16 16'
                                                    alt={`Venue owner ${venue.owner.name}'s Avatar`}
                                                >
                                                    <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                                                    <path
                                                        fillRule='evenodd'
                                                        d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
                                                    />
                                                </svg>
                                            )}
                                            <p className='text-muted text-truncate'>
                                                {venue.owner.name}
                                            </p>
                                        </div>
                                        <p className='venueTitle title-p'>
                                            {venue.name}
                                        </p>
                                        <p>{venue.price} kr / day</p>
                                    </Link>
                                ))}
                        </div>
                    </div>
                    {paginationArrows()}
                </div>
            ) : (
                <div>
                    {paginationArrows()}
                    <div id='venues-container'>
                        {data.map((venue, key) => (
                            <Link
                                to={{
                                    pathname: `/venue/${venue.id}`,
                                }}
                                key={key}
                                aria-label={`Go to venue ${venue.name}`}
                                className='venueContainer rounded d-flex flex-column p-2'
                            >
                                <div className='venueImgContainer rounded shadow-sm d-inline-block'>
                                    <img
                                        className='img-fluid venueImg'
                                        src={
                                            venue.media[0]
                                                ? venue.media[0]
                                                : noImg
                                        }
                                        alt={venue.name}
                                    />
                                </div>
                                <div className='venueOwner mt-1 d-flex align-items-center gap-1'>
                                    {venue.owner.avatar ? (
                                        <img
                                            src={venue.owner.avatar}
                                            alt={`Venue owner ${venue.owner.name}'s Avatar`}
                                        />
                                    ) : (
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            fill='currentColor'
                                            className='bi bi-person-fill mw-100 mh-100 bg-dark text-light'
                                            viewBox='0 0 16 16'
                                            alt={`Venue owner ${venue.owner.name}'s Avatar`}
                                        >
                                            <path d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z' />
                                        </svg>
                                    )}
                                    <p className='text-muted text-truncate'>
                                        {venue.owner.name}
                                    </p>
                                </div>
                                <p className='venueTitle'>{venue.name}</p>
                                <p>{venue.price} kr / day</p>
                            </Link>
                        ))}
                    </div>
                    {paginationArrows()}
                </div>
            )}
        </div>
    );
}

export default RenderVenues;
