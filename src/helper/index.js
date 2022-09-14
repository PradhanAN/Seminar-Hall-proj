import { API } from "../backend";

export const signup = user => {
  console.log(user)
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const signin = user => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET"
    })
      .then(response => console.log("signout success"))
      .catch(err => console.log(err));
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
    totimes.push(item.toTime)
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
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(requestData)
  })
    .then(reponse => {
      return reponse.json();
    })
    .catch(err => console.log(err));
};
