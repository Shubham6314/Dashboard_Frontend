const localStorageData = () => {
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  return { token, user };
};
export default localStorageData;
