import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
    useEffect(() => {
        document.title = 'Log In / Sign up - Holidaze';
    }, []);

    const navigate = useNavigate();
    if (localStorage.getItem('userName')) {
        navigate('/');
    }

    // Input fields states sign up
    const [signupFormClasses, setSignupFormClasses] = useState('d-none');
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
    const [signupSubmitAlertClasses, setSignupSubmitAlertClasses] =
        useState('');
    const [signupNameError, setSignupNameError] = useState('');
    const [signupEmailError, setSignupEmailError] = useState('');
    const [signupPasswordError, setSignupPasswordError] = useState('');

    // Input fields states login
    const [loginFormClasses, setLoginFormClasses] = useState(
        'formContainer ubuntuText w-100'
    );
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
                setSignupNameError('');
                setSignupEmailError('');
                setSignupPasswordError('');

                setSignupFormData({
                    ...signupFormData,
                    name: '',
                    email: '',
                    password: '',
                });
                setSignupSubmitAlertClasses('text-success mt-2');
                setSignupSubmitAlert('Account created! You may now log in.');
            }

            // Errors
            if (data.errors) {
                setSignupNameError('');
                setSignupEmailError('');
                setSignupPasswordError('');

                data.errors.map((error) => {
                    if (error.path[0] === 'name') {
                        setSignupNameError(error.message);
                    }
                    if (error.path[0] === 'email') {
                        setSignupEmailError(error.message);
                    }
                    if (error.path[0] === 'password') {
                        setSignupPasswordError(error.message);
                    }
                });
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
                    'userToken',
                    JSON.stringify(data.accessToken)
                );
                if (data.venueManager) {
                    localStorage.setItem(
                        'userVenueManager',
                        JSON.stringify(data.venueManager)
                    );
                }
                navigate('/');
                window.location.reload(false);
            }

            // Errors
            if (data.errors) {
                console.log(data.errors);
                if (data.errors[0].message === 'Invalid email or password') {
                    setLoginEmailError('');
                    setLoginPasswordError(data.errors[0].message);
                }
                if (data.errors[0].message === 'Email must be a valid email') {
                    setLoginPasswordError('');
                    setLoginEmailError(data.errors[0].message);
                }
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

    const renderSignupForm = () => {
        setLoginFormClasses('d-none');
        setSignupFormClasses('formContainer ubuntuText w-100');
    };
    const renderLoginForm = () => {
        setSignupFormClasses('d-none');
        setLoginFormClasses('formContainer ubuntuText w-100');
    };

    return (
        <Container className='d-flex justify-content-center'>
            <Form className={loginFormClasses}>
                <div className='d-flex flex-wrap justify-content-between mb-3 gap-2'>
                    <h1>Log in</h1>
                    <Link
                        onClick={renderSignupForm}
                        className='linkText'
                        aria-label='Show sign up form'
                    >
                        Don't have an account?
                    </Link>
                </div>
                <Form.Group className='mb-3'>
                    <Form.Label>Email address *</Form.Label>
                    <Form.Control
                        name='email'
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
                        name='password'
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
                <Button
                    variant='primary'
                    className='rounded-pill mt-2 mb-1 w-100'
                    type='submit'
                    onKeyDown={handleKeyDownLogin}
                    onClick={onFormSubmitLogin}
                >
                    Log in
                </Button>
                <p className={loginSubmitAlertClasses}>{loginSubmitAlert}</p>
            </Form>

            <Form className={signupFormClasses}>
                <div className='d-flex flex-wrap justify-content-between mb-3 gap-2'>
                    <h1>Sign up</h1>
                    <Link
                        onClick={renderLoginForm}
                        className='linkText'
                        aria-label='Show log in form'
                    >
                        Already have an account?
                    </Link>
                </div>
                <Form.Group className='mb-3'>
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                        name='name'
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
                        name='email'
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
                        name='password'
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
                        variant='primary'
                        className='rounded-pill mt-2 mb-1 w-100'
                        type='submit'
                        onKeyDown={handleKeyDownSignup}
                        onClick={onFormSubmitSignup}
                    >
                        Sign up
                    </Button>
                </div>
                <p className={signupSubmitAlertClasses}>{signupSubmitAlert}</p>
            </Form>
        </Container>
    );
}

export default Login;
