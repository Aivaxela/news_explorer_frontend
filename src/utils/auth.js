export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.yournewsexplorer.crabdance.com"
    : "http://localhost:3002";

export const signin = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => _checkReponse(res));
};

export const signup = ({ email, password, username }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  }).then((res) => _checkReponse(res));
};

const _checkReponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return res
    .json()
    .then((err) => {
      return Promise.reject(`Error: ${res.status} - ${err.message}`);
    })
    .catch((err) => alert(err));
};
