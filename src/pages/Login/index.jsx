import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';

function Login() {
    useEffect(() => {
        document.title = 'Log In - Holidaze';
    }, []);

    return (
        <Container>
            <h1>Log in</h1>
        </Container>
    );
}

export default Login;
