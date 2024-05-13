
import React, { useState, FormEvent } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { baseUrl } from "../../utility/actions/api/api.url";

function CreateUser() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [venueManager, setVenueManager] = useState(false);

    const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!email.endsWith('@stud.noroff.no')) {
            alert('Email must end with @stud.noroff.no');
            return;
        }
        if (password !== repeatPassword) {
            alert('Passwords do not match');
            return;
        }
        if (password.length < 8) {
            alert('Password must contain at least 8 characters');
            return;
        }

        const userData = {
            name: username,
            email: email,
            password: password,
            venueManager: venueManager
        };

        try {
            const response = await fetch(`${baseUrl}auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User created successfully:', data);
                navigate('/login');
            } else {
                const errorResponse = await response.json();
                if (errorResponse.errors && errorResponse.errors.length > 0) {
                    const errorMessages = errorResponse.errors.map((error: { message: string }) => error.message).join('\n');
                    alert('Error: ' + errorMessages);
                } else {
                    throw new Error('Failed to create user');
                }
            }
        } catch (error: unknown) {
            console.error('Error creating user:', error);
            alert('Error creating user: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
        console.log(userData);
    };


    return (
        <main style={{ maxWidth: '500px' }}>
            <Form onSubmit={handleCreateUser}>
                <FloatingLabel controlId="floatingInputUsername" label="Username" className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel controlId="floatingInputEmail" label="Email address" className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FloatingLabel>

                <FloatingLabel controlId="floatingRepeatPassword" label="Repeat Password" className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Repeat Password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                </FloatingLabel>

                <Form.Group as={Row} className="mb-3">
                    <Col sm={10}>
                        <Form.Check
                            type="checkbox"
                            label="Manager"
                            checked={venueManager}
                            onChange={(e) => setVenueManager(e.target.checked)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Button variant="primary" type="submit">
                        Create Account
                    </Button>
                    <p className="mx-2 my-auto">Or</p>
                    <Button variant="primary" type="button" onClick={() => navigate('/login')}>
                        Return to Login
                    </Button>
                    <Button variant="secondary" type="button" onClick={() => navigate('/login')}>
                        Skip Login
                    </Button>
                </Form.Group>
            </Form>
        </main>
    );
}

export default CreateUser;
