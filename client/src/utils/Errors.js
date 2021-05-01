exports.unauthorized = (error, history) => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("username");
  localStorage.removeItem("userid");
  alert("You are not authorized please login");
  history.push("/login");
};
