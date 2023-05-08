import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
    useEffect(() => {
        document.title = 'Log In / Sign up - Holidaze';
    }, []);

    // Input fields states sign up
    const [userVenueManager, setUserVenueManager] = useState(false);
    const onOptionChange = () => {
        setUserVenueManager(!userVenueManager);
    };
    const [signupFormData, setSignupFormData] = useState({
        name: '',
        email: '',
        password: '',
        venueManager: userVenueManager,
    });
    const [signupSubmitAlert, setSignupSubmitAlert] = useState('');
    const [signupNameError, setSignupNameError] = useState('');
    const [signupEmailError, setSignupEmailError] = useState('');
    const [signupPasswordError, setSignupPasswordError] = useState('');

    // Input fields states login
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: '',
    });
    const [loginSubmitAlert, setLoginSubmitAlert] = useState('');
    const [loginSubmitAlertClasses, setLoginSubmitAlertClasses] = useState('');
    const [loginEmailError, setLoginEmailError] = useState('');
    const [loginPasswordError, setLoginPasswordError] = useState('');

    // Sign up form fetch
    const onFormSubmitSignup = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                'https://api.noroff.dev/api/v1/holidaze/auth/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(signupFormData),
                }
            );
            const data = await response.json();
            console.log(JSON.stringify(signupFormData));
            console.log(data);

            if (data.name) {
                setSignupEmailError('');
                setSignupPasswordError('');

                setSignupFormData({
                    ...signupFormData,
                    email: '',
                    password: '',
                });

                setSignupSubmitAlert('Account created! You may now log in.');
            }

            // Errors
            if (signupFormData.name === '') {
                setSignupNameError('Please fill out this field');
                setSignupSubmitAlert('');
            }
            if (signupFormData.email === '') {
                setSignupEmailError('Please fill out this field');
                setSignupSubmitAlert('');
            }
            if (signupFormData.password === '') {
                setSignupPasswordError('Please fill out this field');
                setSignupSubmitAlert('');
            }
        } catch (error) {
            console.log(error);
            return <h1>An error occurred</h1>;
        }
    };

    // Log in form fetch
    const onFormSubmitLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                'https://api.noroff.dev/api/v1/holidaze/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginFormData),
                }
            );
            const data = await response.json();
            console.log(JSON.stringify(loginFormData));
            console.log(data);

            if (data.name) {
                setLoginEmailError('');
                setLoginPasswordError('');

                setLoginFormData({
                    ...loginFormData,
                    email: '',
                    password: '',
                });

                setLoginSubmitAlertClasses('text-success mt-2');
                setLoginSubmitAlert('You are now logged in.');

                localStorage.setItem('userName', JSON.stringify(data.name));
                localStorage.setItem('userAvatar', JSON.stringify(data.avatar));
                localStorage.setItem(
                    'userVenueManager',
                    JSON.stringify(data.venueManager)
                );
                localStorage.setItem(
                    'userAccessToken',
                    JSON.stringify(data.accessToken)
                );
            }
            // Errors
            if (
                loginFormData.password.length > 0 &&
                loginFormData.password.length > 0 &&
                data.errors[0].message === 'Invalid email or password'
            ) {
                setLoginEmailError('');
                setLoginPasswordError('');
                setLoginSubmitAlertClasses('text-danger mt-2');
                setLoginSubmitAlert(data.errors[0].message);
            }
            if (
                loginFormData.email.length > 0 &&
                data.errors[0].message === 'Email must be a valid email'
            ) {
                setLoginEmailError(data.errors[0].message);
                setLoginSubmitAlert('');
            }
            if (loginFormData.email === '') {
                setLoginEmailError('Please fill out this field');
                setLoginSubmitAlert('');
            }
            if (loginFormData.password === '') {
                setLoginPasswordError('Please fill out this field');
                setLoginSubmitAlert('');
            }
            if (loginFormData.password.length > 0) {
                setLoginPasswordError('');
            }
        } catch (error) {
            console.log(error);
            return <h1>An error occurred</h1>;
        }
    };

    function handleKeyDownSignup(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            onFormSubmitSignup(event);
        }
    }
    function handleKeyDownLogin(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            onFormSubmitLogin(event);
        }
    }

    return (
        <Container className='d-flex justify-content-center flex-wrap gap-5'>
            <Form className='formContainer ubuntuText w-100'>
                <h1 className='mb-3'>Log in</h1>
                <Form.Group className='mb-3'>
                    <Form.Label>Email address *</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email address'
                        value={loginFormData.email}
                        onChange={(e) =>
                            setLoginFormData({
                                ...loginFormData,
                                email: e.target.value,
                            })
                        }
                    />
                    <p className='text-danger mt-1'>{loginEmailError}</p>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Password *</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={loginFormData.password}
                        onChange={(e) =>
                            setLoginFormData({
                                ...loginFormData,
                                password: e.target.value,
                            })
                        }
                    />
                    <p className='text-danger mt-1'>{loginPasswordError}</p>
                </Form.Group>
                <div className='d-flex justify-content-center justify-content-sm-start'>
                    <Button
                        variant='success'
                        className='formContainerBtn rounded-pill px-5 mt-2'
                        type='submit'
                        onKeyDown={handleKeyDownLogin}
                        onClick={onFormSubmitLogin}
                    >
                        Log in
                    </Button>
                </div>
                <p className={loginSubmitAlertClasses}>{loginSubmitAlert}</p>
            </Form>

            <Form className='formContainer ubuntuText w-100'>
                <h1 className='mb-3'>Sign up</h1>
                <Form.Group className='mb-3'>
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={signupFormData.name}
                        onChange={(e) =>
                            setSignupFormData({
                                ...signupFormData,
                                name: e.target.value,
                            })
                        }
                    />
                    <p className='text-danger mt-2'>{signupNameError}</p>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Email address *</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email address'
                        value={signupFormData.email}
                        onChange={(e) =>
                            setSignupFormData({
                                ...signupFormData,
                                email: e.target.value,
                            })
                        }
                    />
                    <p className='text-danger mt-2'>{signupEmailError}</p>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Password *</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={signupFormData.password}
                        onChange={(e) =>
                            setSignupFormData({
                                ...signupFormData,
                                password: e.target.value,
                            })
                        }
                    />
                    <p className='text-danger mt-2'>{signupPasswordError}</p>
                </Form.Group>
                <Form.Group className='mb-3 d-block'>
                    <Form.Label>Account type *</Form.Label>
                    <Form.Check
                        className='mb-1'
                        value='false'
                        type='radio'
                        aria-label='Regular user'
                        label='Regular user'
                        checked={userVenueManager === false}
                        onChange={onOptionChange}
                    />
                    <Form.Check
                        value='true'
                        type='radio'
                        aria-label='Venue manager'
                        label='Venue manager'
                        checked={userVenueManager === true}
                        onChange={onOptionChange}
                    />
                </Form.Group>
                <div className='d-flex justify-content-center justify-content-sm-start'>
                    <Button
                        variant='success'
                        className='formContainerBtn rounded-pill px-5 mt-2'
                        type='submit'
                        onKeyDown={handleKeyDownSignup}
                        onClick={onFormSubmitSignup}
                    >
                        Sign up
                    </Button>
                </div>
                <p className='text-danger mt-2'>{signupSubmitAlert}</p>
            </Form>
        </Container>
    );
}

export default Login;
