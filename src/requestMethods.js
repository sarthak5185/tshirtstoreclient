import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1";

// console.log(JSON.parse(localStorage.getItem("persist:root")));
const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// console.log((JSON.parse(user).currentUser).token);
const currentUser = user && JSON.parse(user).currentUser;
const jwttoken =currentUser?(JSON.parse(user).currentUser).token:null;
console.log(`INSIDE REQUEST ${jwttoken}`);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    "Authorization": `Bearer ${jwttoken}`
  }
});