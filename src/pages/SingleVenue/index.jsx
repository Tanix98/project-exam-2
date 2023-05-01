import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';

function SingleVenue() {
    useEffect(() => {
        document.title = 'Venue Name - Holidaze';
    }, []);

    return (
        <Container>
            <h1>Single venue page</h1>
        </Container>
    );
}

export default SingleVenue;
