import React from "react";
import "App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WeatherNavbar from "components/Nav/WeatherNavbar";
import { Container } from "react-bootstrap";
import CurrentWeather from "components/Views/CurrentWeather";
import ExtendedWeather from "components/Views/ExtendedWeather";

function App() {
  return (
    <div className="App">
      <WeatherNavbar />
      <Router>
        <Container fluid>
          <Routes>
            <Route path="/" element={<CurrentWeather />} />
            <Route path="/extended" element={<ExtendedWeather />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}
export default App;
