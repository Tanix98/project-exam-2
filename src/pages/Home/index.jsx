import RenderVenues from '../../components/RenderVenues';
import { useEffect } from 'react';

function Home() {
    useEffect(() => {
        document.title = 'Venues - Holidaze';
    }, []);

    return <RenderVenues />;
}

export default Home;
