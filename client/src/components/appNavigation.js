import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

function AppNavigation() {
    return (
        <Navbar bg="dark" variant="dark" expand="md" fixed="top">
            <Navbar.Brand>Insomniabox</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Tunnelbana</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default AppNavigation;