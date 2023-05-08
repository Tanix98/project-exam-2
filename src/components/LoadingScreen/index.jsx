import Container from 'react-bootstrap/Container';

function LoadingScreen() {
    return (
        <Container className='text-center'>
            <div className='lds-dual-ring'></div>
            <p>Loading content...</p>
        </Container>
    );
}

export default LoadingScreen;
