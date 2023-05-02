import RenderVenues from '../../components/RenderVenues';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

function Home() {
    useEffect(() => {
        document.title = 'Venues - Holidaze';
    }, []);

    return <RenderVenues />;
}

export default Home;
