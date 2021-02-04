import { getCookie } from "./helpers";

const GetHostUrl = () => {
  return window.location.host.indexOf('127.0.0.1') === 0 ||
    window.location.host.indexOf('localhost') === 0
    ? 'http://127.0.0.1:3001/api/v1'
    : 'https://sendit-postgres.herokuapp.com/api/v1';
};

const url = GetHostUrl();

export const post_request = async (details, route) => {
  try {
    const requestData = await fetch(`${url}${route}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(details),
    });
    return requestData;
  } catch (error) {
    console.log(error);
  }
};

export const get_request = async (route) => {
  const token = getCookie('session_');

  try {
    const requestData = await fetch(`${url}${route}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${token}`,
      },
      method: 'GET',
    });
    return requestData;
  } catch (error) {
    console.log(error);
  }
};
