import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import React from "react";

const WeatherNavbar = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <span className="d-block d-sm-none">WeatherApp</span>
        <span className="d-none d-sm-block">My Weather App</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="turk-navbar" />
      <Navbar.Collapse id="turk-navbar">
        <Nav className="mr-auto">
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
