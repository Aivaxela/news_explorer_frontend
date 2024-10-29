export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.yournewsexplorer.crabdance.com"
    : "http://localhost:3002";

export const signin = ({ email, password }) => {
  return _request(`${BASE_URL}/signin`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const signup = ({ email, password, username }) => {
  return _request(`${BASE_URL}/signup`, {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
  });
};

const _request = (url, options) => {
  options.headers = {
    ...options.headers,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  return fetch(url, options).then((res) => _checkResponse(res));
};

const _checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return res.json().then((err) => {
    return Promise.reject(`Error: ${res.status} - ${err.message}`);
  });
};
