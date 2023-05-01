import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';

function Profile() {
    useEffect(() => {
        document.title = 'Profile Name - Holidaze';
    }, []);

    return (
        <Container>
            <h1>A profile</h1>
        </Container>
    );
}

export default Profile;
