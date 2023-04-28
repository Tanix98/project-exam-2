import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <Container>
            <h1>All venues be here</h1>
            <h2>Undertitle</h2>
            <p>Sora sora sadsaiusa asid s aisd sad sdiaidisda sad sd</p>
            <Link to='/venue'>A venue</Link>
        </Container>
    );
}

export default Home;
