import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../logo.png";
import logoText from '../../logoText.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function LoginLayout() {
    return (
        <main style={{ maxWidth: '500px' }}>
            <Container>
                <Row className="justify-content-center align-items-center p-5">
                    <Col>
                        <img src={logo} alt="Holidaze Globe Logo" className="logo-image" />
                        <img src={logoText} alt="Holidaze Text Logo" className="logo-text" />
                    </Col>
                </Row>
            </Container>
            <Outlet />
        </main>
    );
}
