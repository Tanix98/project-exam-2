import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';

function Error() {
    useEffect(() => {
        document.title = 'Page not found! - Holidaze';
    }, []);

    const link = (
        <Link to='/' className='linkText' aria-label='Return to homepage'>
            return to the homepage.
        </Link>
    );

    return (
        <Container className='d-flex justify-content-center'>
            <div>
                <h1 className='mb-3'>Page not found!</h1>
                <p className='mb-1'>
                    The page you are requesting was deleted or never existed.
                </p>
                <p>Check that you entered the link correctly, or {link}</p>
            </div>
        </Container>
    );
}

export default Error;
