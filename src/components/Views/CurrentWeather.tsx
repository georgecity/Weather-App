import React, { useState } from "react";
import { Container } from "react-bootstrap";

import { Get } from "lib/ApiClient";

import { getCoordinatesParams } from "lib/Locations";
import WeatherCard from "components/Atoms/WeatherCard";
import LocationsBar from "components/Atoms/LocationsBar";

const CurrentWeatherPage: React.FC = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState<Record<string, any> | undefined>();

  const handleLocationSelection = async (value: string) => {
    setLocation(value);
    getCurrentWeather(value);
  };

  const getCurrentWeather = async (value: string) => {
    Get(`/current${getCoordinatesParams(value)}`)
      .then((data: any) => {
        setWeather(data.data[0]);
      })
      .catch(function (error: any) {
        console.log("there was a problem with weather:" + error.message);
        window.alert("there was a problem reading API Response");
      });
  };

  return (
    <Container>
      <h1>Current Weather Page</h1>
      <LocationsBar
        onChange={handleLocationSelection}
        currentLocation={location}
      />
      <hr />
      {weather ? (
        <WeatherCard weatherData={weather} isCurrent={true} />
      ) : (
        <h1>Please Select Location</h1>
      )}
    </Container>
  );
};

export default CurrentWeatherPage;
