import React from "react";
import { Navigation } from "../components/nav";
import logoText from '../logoText.png';
import { Container, Row, Col } from "react-bootstrap";

export function Header() {
    return (
        <header>
            <Container>
                <Row className="align-items-center">
                    <Col xs={6} md={4}>
                        <img src={logoText} alt="Holidaze Text Logo" className="logo-text" />
                    </Col>
                    <Col xs={6} md={8} className="d-flex">
                        <Navigation />
                    </Col>
                </Row>
            </Container>
        </header>
    );
}
