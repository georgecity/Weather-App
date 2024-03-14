// import React from 'react';

import React, { useEffect, useState } from "react";
import { Col, Card, Row } from "react-bootstrap";

import { convertUTCtoDateFormat } from "lib/Utils";

const WeatherCard: React.FC<{
  weatherData: Record<string, any>;
  isCurrent?: boolean;
}> = ({ weatherData, isCurrent }) => {
  const [image, setImage] = useState<string | undefined>(undefined);

  const ColComponent: React.FC<{ title: string; value: any }> = ({
    title,
    value,
  }) => {
    return (
      <Col className="py-2">
        <Row>
          <Card.Text>{title}</Card.Text>
        </Row>
        <Row>
          <Card.Text>{value}</Card.Text>
        </Row>
      </Col>
    );
  };

  const RowComponent: React.FC<{ value: any }> = ({ value }) => {
    return (
      <Row>
        <Card.Text>{value}</Card.Text>
      </Row>
    );
  };

  const ExtendedTemp = () => {
    return (
      <Row>
        <ColComponent
          title="Min temperature"
          value={`${Math.ceil(parseFloat(weatherData?.["min_temp"]))} °C`}
        />
        <ColComponent
          title="Average temperature"
          value={`${Math.ceil(parseFloat(weatherData?.["temp"]))} °C`}
        />
        <ColComponent
          title="Max temperature"
          value={`${Math.ceil(parseFloat(weatherData?.["max_temp"]))} °C`}
        />
      </Row>
    );
  };

  useEffect(() => {
    const loadImage = async () => {
      try {
        const loadedImage = await import(
          `../../assets/icons/${weatherData?.weather?.icon}.png`
        );
        setImage(loadedImage.default);
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage().catch(console.error);
  }, []);

  return (
    <Card className="my-3" style={{ width: "80%", margin: "auto" }}>
      <Col>
        <Row>
          {image && (
            <Card.Img
              variant="top"
              className="mx-auto"
              src={image}
              style={{ width: "100%", maxWidth: "20%", height: "auto" }}
            />
          )}
        </Row>
        {isCurrent ? (
          <>
            <RowComponent
              value={`${Math.ceil(parseFloat(weatherData?.["temp"]))} °C`}
            />
            <RowComponent value={weatherData?.weather?.description} />
          </>
        ) : (
          <>
            <RowComponent value={weatherData?.weather?.description} />
            <ExtendedTemp />
          </>
        )}
        <Row className="py-2">
          <ColComponent
            title={isCurrent ? "Cloud coverage" : "Avg Total Cloud Coverage"}
            value={`${weatherData?.clouds}%`}
          />
          {!isCurrent && (
            <ColComponent
              title="Probability of Precipitation"
              value={`${weatherData?.pop}%`}
            />
          )}
        </Row>
      </Col>
      <hr />
      <Card.Body className="align-center">
        <Row className="py-2">
          {isCurrent ? (
            <>
              <ColComponent
                title="Today's Expected Sunrise"
                value={weatherData?.["sunrise"]}
              />
              <ColComponent
                title="Today's Expected Sunset"
                value={weatherData?.["sunset"]}
              />
            </>
          ) : (
            <>
              <ColComponent
                title="Sunrise Time"
                value={convertUTCtoDateFormat(weatherData?.["sunrise_ts"])}
              />
              <ColComponent
                title="Sunset time"
                value={convertUTCtoDateFormat(weatherData?.["sunset_ts"])}
              />
            </>
          )}
        </Row>
        <hr />
        {isCurrent ? (
          <RowComponent value={weatherData?.pod === "d" ? "Day" : "Night"} />
        ) : (
          <RowComponent value={weatherData?.valid_date} />
        )}
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;
