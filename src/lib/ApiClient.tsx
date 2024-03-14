const API: any = process.env.REACT_APP_WEATHER_API_ENDPOINT;
const API_KEY: any = process.env.REACT_APP_WEATHER_API_KEY;

async function makeRequest({
  method,
  url,
  body,
}: {
  method: string;
  url: string;
  body?: any;
}): Promise<any> {
  return await fetch("https://" + API + url, {
    body: body,
    method: method,
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": API,
    },
  })
    .catch((error) => {
      if (![302, 307].includes(error.status)) {
        window.alert(
          "Encountered an error: Failed to connect to backend service. Please see the logs for further detail."
        );
      }
    })
    .then(async (response: any): Promise<any> => {
      if (response.status === 401) {
        window.alert(
          "You need authentication credentials to access to this API"
        );
      } else if (response.status === 403) {
        window.alert("You do not have permission to access this resource.");
      } else if (response.status === 422) {
        window.alert("Encountered invalid input on your request. Please review your input and try again.")
      }
      return response;
    })
    .then((response) => response.json());
}

async function Get(url: string) {
  return await makeRequest({
    method: "GET",
    url,
  });
}

export { makeRequest, Get };
