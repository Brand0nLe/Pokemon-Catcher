import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';

function Navbar() {
  return (
    <BootstrapNavbar bg="dark" variant="dark">
      <BootstrapNavbar.Brand as={Link} to="/" className="text-white">
        Pokemon App
      </BootstrapNavbar.Brand>
      <Nav className="ml-auto">
      </Nav>
    </BootstrapNavbar>
  );
}

export default Navbar;