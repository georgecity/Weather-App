import React from "react";
import { ButtonGroup, ToggleButton, Row } from "react-bootstrap";

const LocationsBar: React.FC<{
  onChange: (x: any) => void;
  currentLocation: string;
}> = ({ onChange, currentLocation }) => {
  const radios = [
    { name: "London", value: "london" },
    { name: "New York", value: "new_york" },
    { name: "Sidney", value: "sidney" },
    { name: "Mumbai", value: "mumbai" },
    { name: "Tokyo", value: "tokyo" },
  ];

  return (
    <Row className="p-2">
      <ButtonGroup aria-label="Basic example" className="p-2">
        {radios.map((radio, idx) => (
          <ToggleButton
            id={radio?.value}
            name={radio?.value}
            key={`radio-${idx}`}
            type="radio"
            variant="outline-info"
            value={radio.value}
            checked={currentLocation === radio.value}
            onChange={(e) => {
              onChange(e.currentTarget.value);
            }}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </Row>
  );
};

export default LocationsBar;
