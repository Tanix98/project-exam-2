import RenderVenues from '../../components/RenderVenues';
import { useEffect } from 'react';

function Home() {
    useEffect(() => {
        document.title = 'Venues - Holidaze';
    }, []);

    return (
        <RenderVenues url='https://api.noroff.dev/api/v1/holidaze/venues?_owner=true&_bookings=true' />
    );
}

export default Home;
