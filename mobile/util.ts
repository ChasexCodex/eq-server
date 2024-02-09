import config from './config';

// a function that returns the full url of the server appended with `path`
export const url = (path: string) => {
  return config.serverUrl + '/' + path;
}

export const dev = config.env === 'dev';

export const prod = config.env === 'prod';

// generate a random number between `min` and `max`
export const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// a function that posts to the server the user's state
export const postState = (state: {
  state: string
  lng: number
  lat: number
  id: number
}) => {
  if (dev) {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    })
  }

  return fetch(url('state'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({state}),
  });
}

const uniform = random

// get longitude and latitude from the mobile phone
export const getLocation = async () => {
  return {
    lng: uniform(0, 1000),
    lat: uniform(0, 2000),
    id: uniform(0, 10000),
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        });
      },
      (error) => {
        reject(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  });
}