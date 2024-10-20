export const authorize = ({ email }) => {
  return new Promise((resolve) => {
    resolve({ username: email.split("@")[0], email: email });
  });
};
