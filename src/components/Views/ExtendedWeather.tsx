// import React from 'react';

import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  InputGroup,
  Row,
  Carousel,
  FormControl,
} from "react-bootstrap";

import { Get } from "lib/ApiClient";

import { getCoordinatesParams } from "lib/Locations";
import WeatherCard from "components/Atoms/WeatherCard";
import LocationsBar from "components/Atoms/LocationsBar";

const ExtendedForecastPage: React.FC = () => {
  const [location, setLocation] = useState("");
  const [extendedWeather, setExtendedWeather] = useState<any[] | undefined>();
  const [filteredList, setFilteredList] = useState<any[] | undefined>();
  const [minTemp, setMinTemp] = useState<number | undefined>(undefined);
  const [maxTemp, setMaxTemp] = useState<number | undefined>(undefined);

  const handleLocationSelection = async (value: string) => {
    setLocation(value);
    setMaxTemp(undefined);
    setMinTemp(undefined);
    getExtendedWeather(value);
  };

  const getExtendedWeather = async (value: string) => {
    Get(`/forecast/daily${getCoordinatesParams(value)}`)
      .then((data: any) => {
        if (!data?.data) {
          window.alert("there is a problem with Weather API");
        } else {
          setExtendedWeather(data?.data);
          setFilteredList(data?.data);
        }
      })
      .catch(function (error: any) {
        console.log("there was a problem with weather:" + error.message);
        window.alert("there was a problem reading API Response");
      });
  };

  const onSearch = () => {
    if (minTemp || maxTemp) {
      let filteredItems: any = extendedWeather?.filter((item: any) => {
        if (minTemp !== undefined && maxTemp !== undefined) {
          return item.min_temp <= minTemp && item.max_temp >= maxTemp;
        } else if (minTemp !== undefined) {
          return item.min_temp <= minTemp;
        } else if (maxTemp !== undefined) {
          return item.max_temp >= maxTemp;
        }
        return false;
      });
      setFilteredList(filteredItems);
    } else {
      setFilteredList(extendedWeather);
    }
  };

  useEffect(() => {
    onSearch();
  }, [maxTemp, minTemp]);

  useEffect(() => {
    console.log("list updated", extendedWeather);
  }, [filteredList, extendedWeather, location]);

  return (
    <Container>
      <h1>Extended Weather Page</h1>
      <Row className="py-2">
        <LocationsBar
          onChange={handleLocationSelection}
          currentLocation={location}
        />
      </Row>
      <hr />
      {filteredList ? (
        <>
          <Row className="p-1">
            <Col xs={6}>
              <InputGroup className="mb-3">
                <FormControl
                  type="number"
                  min={-273}
                  value={minTemp ? minTemp : ""}
                  style={{
                    width: "80%",
                  }}
                  onChange={(e: any) =>
                    setMinTemp(
                      e.target.value === "" ? undefined : e.target.value
                    )
                  }
                  className="min-width max-height"
                  placeholder="Min temperature"
                />
              </InputGroup>
            </Col>
            <Col xs={6}>
              <InputGroup className="mb-3">
                <FormControl
                  type="number"
                  min={-273}
                  value={maxTemp ? maxTemp : ""}
                  style={{
                    width: "80%",
                  }}
                  onChange={(e: any) =>
                    setMaxTemp(
                      e.target.value === "" ? undefined : e.target.value
                    )
                  }
                  className="min-width max-height"
                  placeholder="Max Temperature"
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="py-2">
            <Carousel data-bs-theme="dark" fade>
              {filteredList.map((item, idx) => (
                <Carousel.Item interval={undefined}>
                  <WeatherCard weatherData={item} />
                </Carousel.Item>
              ))}
            </Carousel>
          </Row>
        </>
      ) : (
        <h1>Please Select Location</h1>
      )}
    </Container>
  );
};

export default ExtendedForecastPage;
