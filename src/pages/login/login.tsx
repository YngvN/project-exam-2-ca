import React, { useState, useEffect, FormEvent } from 'react';
import { Form, Button, FloatingLabel, Col, Row, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createApiKey } from '../../utility/actions/api/apiKey';
import { baseUrl } from '../../utility/actions/api/api.url';
import { UserData } from '../../utility/type';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
        if (storedUserData) {
            const userData: UserData = JSON.parse(storedUserData);
            setEmail(userData.data.email);
            setRememberMe(Boolean(localStorage.getItem('userData')));
        }
        const storedPassword = localStorage.getItem('password') || sessionStorage.getItem('password');
        if (storedPassword) {
            setPassword(storedPassword);
        }
    }, []);

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        if (!email.endsWith('@stud.noroff.no')) {
            setErrorMessage('Email must end with @stud.noroff.no');
            console.error('Validation error: Email must end with @stud.noroff.no');
            return;
        }

        const loginDetails = {
            email,
            password,
        };

        try {
            console.log('Starting login with details:', loginDetails);
            const response = await fetch(`${baseUrl}auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDetails),
            });

            console.log('Login response status:', response.status);

            if (response.ok) {
                const userData: UserData = await response.json();
                console.log('Login successful:', userData);

                console.log('Calling createApiKey...');
                const apiKey = await createApiKey(userData);

                if (apiKey) {
                    console.log('API Key created:', apiKey);

                    if (rememberMe) {
                        localStorage.setItem('userData', JSON.stringify(userData));
                        localStorage.setItem('password', password);
                        localStorage.setItem('apiKey', apiKey);
                    } else {
                        sessionStorage.setItem('userData', JSON.stringify(userData));
                        sessionStorage.setItem('password', password);
                        sessionStorage.setItem('apiKey', apiKey);
                    }

                    setSuccessMessage('Login successful! Redirecting to home...');
                    setTimeout(() => {
                        navigate('/home');
                    }, 2000);
                } else {
                    console.error('API Key creation failed');
                    throw new Error('Failed to create API key');
                }
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
                throw new Error(errorData.message || 'Failed to login');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            setErrorMessage('Login failed: ' + (error.message || 'Unknown error'));
        }
    };

    return (
        <Form onSubmit={handleLogin}>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <FloatingLabel controlId='formBasicEmail' label='Email address' className="mb-3">
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FloatingLabel>

            <FloatingLabel controlId='formBasicPassword' label='Password' className="mb-3">
                <Form.Control
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FloatingLabel>

            <Form.Group as={Col} className='mb-3' controlId='formBasicCheckbox'>
                <Form.Check
                    type='checkbox'
                    label='Remember me'
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
                <Button variant='primary' type='submit'>
                    Log in
                </Button>
                <p>Or</p>
                <Button variant='primary' type='button' onClick={() => navigate('/create')}>
                    Create user
                </Button>
                <Button variant='secondary' type='button' onClick={() => navigate('/home')}>
                    Skip login
                </Button>
            </Form.Group>
        </Form>
    );
}

export default Login;
