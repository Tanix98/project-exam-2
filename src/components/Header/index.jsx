import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from 'react-bootstrap';
import holidazeLogo from '../../assets/imgs/logo.svg';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <Navbar bg='light' variant='light'>
                <Container>
                    <Link to='/'>
                        <img src={holidazeLogo} alt='Holidaze logo' />
                    </Link>
                    <Nav className='me-auto mx-auto gap-3'>
                        <Link to='/bookings'>My Bookings</Link>
                        <Link to='/venues'>My Venues</Link>
                        <Link to='/profile'>My Profile</Link>
                        <Link to='/login'>Log In</Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
