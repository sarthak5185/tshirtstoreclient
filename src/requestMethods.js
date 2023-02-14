import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1";
const TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDBlNjY0ODQ1NmFlMDM5YjMwYjJlMSIsImlhdCI6MTY3NjM1MDMzOSwiZXhwIjoxNjc2NjA5NTM5fQ.C5B0xa8yjgx0ez2U5--L8zIuwjSObBMoWSW4CHBSE7A";
// // const TOKEN =
// //   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
// //     .accessToken || "";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.token;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
