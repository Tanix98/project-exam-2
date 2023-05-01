import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

function Home() {
    useEffect(() => {
        document.title = 'Venues - Holidaze';
    }, []);

    return (
        <Container>
            <h1>All venues be here</h1>
            <p className='undertitle-p'>Undertitle</p>
            <p>Sora sora sadsaiusa asid s aisd sad sdiaidisda sad sd</p>
            <Link to='/venue'>A venue</Link>
        </Container>
    );
}

export default Home;
