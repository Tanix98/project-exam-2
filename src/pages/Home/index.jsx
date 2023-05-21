import RenderVenues from '../../components/RenderVenues';
import usePrefersReducedMotion from '../../components/PrefersReducedMotion';
import { useEffect } from 'react';

function Home() {
    useEffect(() => {
        document.title = 'Venues - Holidaze';
    }, []);

    usePrefersReducedMotion();

    return (
        <RenderVenues url='https://api.noroff.dev/api/v1/holidaze/venues?_owner=true&_bookings=true' />
    );
}

export default Home;
