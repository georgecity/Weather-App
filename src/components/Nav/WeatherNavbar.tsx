import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import React from "react";

const WeatherNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <span className="d-block d-sm-none px-3">WeatherApp</span>
        <span className="d-none d-sm-block px-3">My Weather App</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto w-100">
          <Nav.Link className="mx-1" href="/">
            Current
          </Nav.Link>
          <Nav.Link className="mx-1" href="/extended">
            Extended
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default WeatherNavbar;
