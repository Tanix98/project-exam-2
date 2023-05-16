import '../RenderVenues/index.css';
import LoadingScreen from '../LoadingScreen';
import LoadingError from '../LoadingError';
import noImg from '../../assets/imgs/no_img.svg';
import UseApiGet from '../../api/UseApiGet';
import { Link } from 'react-router-dom';

function RenderVenues(props) {
    const { data, isLoading, isError } = UseApiGet(props.url);

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isError) {
        return <LoadingError />;
    }

    console.log(props.searchTerm);

    return (
        <div className='d-flex justify-content-center'>
            <div id='venues-container' className='px-4'>
                {props.searchTerm
                    ? data
                          .filter((venue) => {
                              if (props.searchTerm === '') {
                                  return venue;
                              }
                              if (
                                  venue.name
                                      .toLowerCase()
                                      .includes(props.searchTerm.toLowerCase())
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
                              >
                                  <div className='venueContainer d-flex flex-column my-2 p-2 rounded'>
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
                                          <p className='text-muted'>
                                              {venue.owner.name}
                                          </p>
                                      </div>
                                      <p className='venueTitle title-p'>
                                          {venue.name}
                                      </p>
                                      <p>Price: {venue.price}kr</p>
                                  </div>
                              </Link>
                          ))
                    : data.map((venue, key) => (
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
                                      <p className='text-muted'>
                                          {venue.owner.name}
                                      </p>
                                  </div>
                                  <p className='venueTitle title-p'>
                                      {venue.name}
                                  </p>
                                  <p>Price: {venue.price}kr</p>
                              </div>
                          </Link>
                      ))}
            </div>
        </div>
    );
}

export default RenderVenues;
