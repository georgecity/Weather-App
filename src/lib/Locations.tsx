const cityCoordinates: any = {
  london: { latitude: 51.5098, longitude: -0.118 },
  new_york: { latitude: 40.7306, longitude: -73.9352 },
  mumbai: { latitude: 19.076, longitude: 72.8777 },
  sidney: { latitude: -33.8688, longitude: 151.2093 },
  tokyo: { latitude: 35.6528, longitude: 39.8394 },
};

const getCoordinatesParams = (city: any): string | undefined => {
  const coordinates = cityCoordinates[city];
  if (coordinates) {
    return `?lat=${parseFloat(coordinates.latitude).toFixed(
      1
    )}&lon=${parseFloat(coordinates.longitude).toFixed(1)}`;
  } else {
    return undefined;
  }
};

export { getCoordinatesParams };
