import { API } from "../backend";
const axios = require("axios").default;

export const signup = (user) => {
  console.log(user);
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const checkEmail =  (email) => {
 
   return  fetch(`${API}/checkEmail`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) =>{
      console.log(err)
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};





export const updatePassword = (data) => {
  return  fetch(`${API}/updatePassword`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) =>{
      console.log(err)
    });
}




export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => console.log("signout success"))
      .catch((err) => console.log(err));
  }
};

export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const submitRequest = (userId, token, requestData) => {
  console.log(userId, token, requestData);
  let dates = [];
  let fromtimes = [];
  let totimes = [];
  requestData.dates.forEach(function (item, index) {
    dates.push(item.date);
    fromtimes.push(item.fromTime);
    totimes.push(item.toTime);
  });
  requestData.dates = dates;
  requestData.fromtimes = fromtimes;
  requestData.totimes = totimes;
  requestData.date = undefined;
  console.log(userId, token, requestData);
  return fetch(`${API}/request/${userId}/submit`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestData),
  })
    .then((reponse) => {
      return reponse.json();
    })
    .catch((err) => console.log(err));
};

export const getRequests = () => {
  return axios
    .get(`${API}/requests`)
    .then(function (response) {
      // console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  // return fetch(`${API}/requests`);
};
