export const authorize = ({ email }) => {
  return new Promise((resolve, reject) => {
    resolve({ username: email.split("@")[0], email: email });
  });
};
