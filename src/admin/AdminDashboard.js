import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./AdminDashboard.css";
import Text from "../layout/Text";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import { useState, useEffect } from "react";
import Navbar from "../base/NavBar";
import { getRequests, isAutheticated } from "../helper";
import { API } from "../backend";

import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { Redirect } from "react-router";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const axios = require("axios").default;

const rows = [
  {
    capacity: "100",
    description: "first-for-testing",
    status: "PENDING",

    dates: ["2002-12-09", "2022-12-09", "2032-12-09"],
    fromtimes: ["2002-12-09T12:00", "2022-12-09T13:00", "2032-12-09T18:00"],
    totimes: ["2002-12-09T13:00", "2022-12-09T14:30", "2032-12-09T20:00"],

    preference_1: "bio seminar hall",
    preference_2: "ece seminar hall",
    preference_3: "cse seminar hall",

    name: "Rahul",
    email: "rahul@gmail.com",
    phone: "9234812434",
    branch: "CSE",
  },
  {
    capacity: "200",
    description: "second-for-testing",
    status: "APPROVED",

    dates: ["2002-12-09", "2022-12-09", "2032-12-09"],
    fromtimes: ["2002-12-09T13:00", "2022-12-09T13:00", "2032-12-09T18:00"],
    totimes: ["2002-12-09T13:00", "2022-12-09T13:30", "2032-12-09T19:00"],

    preference_1: "mechanical seminar hall",
    preference_2: "civil seminar hall",
    preference_3: "cse seminar hall",

    name: "Kunal",
    email: "kunal@gmail.com",
    phone: "9344812434",
    branch: "ISE",
  },
  {
    capacity: "300",
    description: "third-for-testing",
    status: "DECLINED",

    dates: ["2002-12-09", "2022-12-09", "2032-12-09"],
    fromtimes: ["2002-12-09T12:00", "2022-12-09T10:00", "2032-12-09T10:00"],
    totimes: ["2002-12-09T13:20", "2022-12-09T14:30", "2032-12-09T20:00"],

    preference_1: "eee seminar hall",
    preference_2: "ece seminar hall",
    preference_3: "ase seminar hall",

    name: "Rakesh",
    email: "rakesh@gmail.com",
    phone: "9234322434",
    branch: "ECE",
  },
  {
    capacity: "400",
    description: "fourth-for-testing",
    status: "PENDING",

    dates: ["2002-12-09", "2022-12-09", "2032-12-09"],
    fromtimes: ["2002-12-09T12:00", "2022-12-09T13:00", "2032-12-09T17:00"],
    totimes: ["2002-12-09T15:00", "2022-12-09T16:30", "2032-12-09T20:00"],

    preference_1: "bio seminar hall",
    preference_2: "ece seminar hall",
    preference_3: "cse seminar hall",

    name: "Venkat",
    email: "venkat@gmail.com",
    phone: "9234432434",
    branch: "CIVIL",
  },
];

var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

let timings = [];

for (let i = 0; i < rows.length; i++) {
  let temp = [];
  for (let j = 0; j < rows[i].dates.length; j++) {
    temp.push({
      date: rows[i].dates[j],
      from: rows[i].fromtimes[j],
      to: rows[i].totimes[j],
    });
  }
  timings.push(temp);
}

for (let i = 0; i < rows.length; i++) {
  rows[i] = { ...rows[i], timings: timings[i] };
}

function Row(props) {
  const data = props.data;
  const d = props.d;
  const setD = props.setD;
  const [open, setOpen] = useState(false);
  const [hall, setHall] = useState(data.approvedHall);

  let statusvar;

  if (data.approved === "true") statusvar = "Approved";
  else if (data.approved === "false") statusvar = "Declined";
  else if (data.approved === "pending") statusvar = "Pending";

  const [status, setStatus] = useState(statusvar);

  // let statusColor;

  // if(status==="Pending") statusColor="rgb(255, 238, 0)";
  // else if(status === "Declined") statusColor =" rgb(255, 0, 0)";
  // else statusColor = "rgb(0, 255, 64);";

  // ()=>{setStatus("Approved"); setOpen(!open); data.approved="true"; console.log(data)}

  // const handleApprove = async (data) => {
  //   setOpen(!open);

  //   const res = await axios.put(`${API}/request/${data._id}`, {
  //     approved: "true",
  //   });
  //   console.log("jhjhfj", data);
  //   setStatus("Approved");
  //   // console.log(summary, description, location, startDateTime, endDateTime);
  //   let description = "";
  //   let summary = data.description;
  //   let location = data.preference_1;
  //   let startDateTime = data.timefrom;
  //   let endDateTime = data.timeto;

  //   axios
  //     .post("/api/create-event", {
  //       summary,
  //       description,
  //       location,
  //       startDateTime,
  //       endDateTime,
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };

  

  const sendEmail = async (data) => {

    const username = data.user.name;
    const recipientEmail = data.user.email;
    const date = new Date(data.date).toLocaleDateString("en-US", options);
    const fromtime = new Date(data.timefrom).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const totime = new Date(data.timeto).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const approved = data.approved;
    const approvedHall = data.approvedHall;


    console.log("in sendemail");
    console.log(data);

    let message = "";

    if(approved==="true"){
      message = `Hey ${username},\n\nYour request to book a seminar hall on, \n\nDate : ${date}\nFrom : ${fromtime}\nTo : ${totime}\nhas been approved by the admin.\n\nThe seminar hall approved to you is ${approvedHall}. We will notify you, in case any changes are made by the admin.\n\nThank you.`;
    }else{
      message = `Hey ${username},\n\nYour request to book a seminar hall on \n\nDate : ${date}\nFrom : ${fromtime}\nTo : ${totime}\n\nwas declined by the admin. We will notify you, in case any changes are made by the admin.\n\nThank you.`;
    }
    console.log(message);
    const response = await fetch(`${API}/send`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        recipientEmail: recipientEmail,
        subject: "Regarding Seminar Hall Booking",
        message: message,
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        console.log(resData);
        if (resData.status === "success") {
          // alert("Message Sent");
        } else if (resData.status === "fail") {
          // alert("Message failed to send");
        }
      });
  };

  const handleHallChange = async (e, data) => {
    e.preventDefault();
    setOpen(!open);

    setHall(e.target.value);

    const res = await axios.put(`${API}/request/${data._id}`, {
      approved: "true",
      approvedHall: e.target.value,
    });
    setStatus("Approved");
    let description = "";
    let summary = data.description;
    let location = data.preference_1;
    let startDateTime = data.timefrom;
    let endDateTime = data.timeto;

    data.approved = "true";
    data.approvedHall = e.target.value;

    await sendEmail(data);


    // TO DO :

    // axios
    //   .post("/api/create-event", {
    //     summary,
    //     description,
    //     location,
    //     startDateTime,
    //     endDateTime,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });
      
  };

  const handleDecline = async (data) => {
    setOpen(!open);
    const res = await axios.put(`${API}/request/${data._id}`, {
      approved: "false",
      approvedHall: "NA",
    });
    data.approved="false";
    data.approvedHall="NA";
    await sendEmail(data);
    setStatus("Declined");
    setHall("NA");
   
  };

  


  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ color: "white" }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          align="center"
          sx={{ color: "white" }}
        >
          {data.capacity}
        </TableCell>

        <TableCell align="center" sx={{ color: "white" }}>
          {data.description}
        </TableCell>

        <TableCell
          align="center"
          sx={{
            color:
              status === "Approved"
                ? "rgb(0, 255, 64)"
                : status === "Declined"
                ? "rgb(255, 0, 0)"
                : "rgb(255, 238, 0)",
          }}
        >
          {/* {status==="true" && "Approved"}
          {status==="false" && "Declined"}
          {status==="pending" && "Pending"} */}
          {status}
        </TableCell>
        <TableCell align="center" sx={{ color: "white" }}>
          {hall}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 6 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ color: "white" }}
              >
                User Credentials
              </Typography>
              <Table
                size="medium"
                sx={{ margin: "auto", width: "70%", align: "center" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ color: "white" }}>
                      NAME
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      EMAIL
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      PHONE NO.
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      BRANCH
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ color: "white" }}
                    >
                      {data.user.name}
                    </TableCell>

                    <TableCell align="center" sx={{ color: "white" }}>
                      {data.user.email}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {data.user.phone_number}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {data.user.branch}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 6 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ color: "white" }}
              >
                Preferences
              </Typography>
              <Table
                size="medium"
                sx={{ margin: "auto", width: "70%", align: "center" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ color: "white" }}>
                      One
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      Two
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      Three
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ color: "white" }}
                    >
                      {data.preference_1}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {data.preference_2}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {data.preference_3}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 6 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ color: "white" }}
              >
                Booking Timings
              </Typography>
              <Table
                size="medium"
                sx={{ margin: "auto", width: "70%", align: "center" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ color: "white" }}>
                      DATE
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      FROM
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      TO
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={data._id}>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ color: "white" }}
                    >
                      {new Date(data.date).toLocaleDateString("en-US", options)}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {new Date(data.timefrom).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {new Date(data.timeto).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          align="center"
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 6 }}>
              <div className="admin-buttons">
                {/* {(status === "Pending" || status === "Declined") && (
                  <button
                    className="approve"
                    onClick={() => handleApprove(data)}
                  >
                    <TaskAltIcon sx={{ marginRight: "6px" }} />
                    Approve
                  </button>
                )} */}
                {(status === "Pending" || status === "Approved") && (
                  <button
                    className="decline"
                    onClick={() => handleDecline(data)}
                  >
                    <CancelOutlinedIcon sx={{ marginRight: "6px" }} />
                    Decline
                  </button>
                )}
              </div>

              <FormControl sx={{ marginBottom: "7px", marginTop: "8px" }}>
                <InputLabel
                  id="demo-simple-select-helper-label"
                  sx={{ color: "#3ee988" }}
                >
                  Select Hall to Approve
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Select Hall to Approve"
                  onChange={(e) => handleHallChange(e, data)}
                  sx={{
                    color: "#00ff6f",
                    borderRadius: "14px",
                    width: "250px",
                    height: "52px",
                    transition: "0.25s",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#00ff6f",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#00ff6f",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#00ff6f",
                    },
                    ".MuiSvgIcon-root ": {
                      fill: "#00ff6f",
                    },
                  }}
                >
                  <MenuItem value={"CSE Seminar Hall"}>
                    CSE Seminar Hall
                  </MenuItem>
                  <MenuItem value={"ISE Seminar Hall"}>
                    ISE Seminar Hall
                  </MenuItem>
                  <MenuItem value={"ECE Seminar Hall"}>
                    ECE Seminar Hall
                  </MenuItem>
                  <MenuItem value={"ACE Seminar Hall"}>
                    ACE Seminar Hall
                  </MenuItem>
                  <MenuItem value={"EEE Seminar Hall"}>
                    EEE Seminar Hall
                  </MenuItem>
                  <MenuItem value={"ETE Seminar Hall"}>
                    ETE Seminar Hall
                  </MenuItem>
                  <MenuItem value={"EIE Seminar Hall"}>
                    EIE Seminar Hall
                  </MenuItem>
                  <MenuItem value={"MECHANICAL Seminar Hall"}>
                    MECHANICAL Seminar Hall
                  </MenuItem>
                  <MenuItem value={"CIVIL Seminar Hall"}>
                    CIVIL Seminar Hall
                  </MenuItem>
                  <MenuItem value={"BIOTECH Seminar Hall"}>
                    BIOTECH Seminar Hall
                  </MenuItem>
                  <MenuItem value={"IEM Seminar Hall"}>
                    IEM Seminar Hall
                  </MenuItem>
                  <MenuItem value={"CHEMICAL Seminar Hall"}>
                    CHEMICAL Seminar Hall
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default function AdminDashboard() {
  window.gapi.load("client:auth2", () => {
    window.gapi.client.init({
      clientId:
        "431101491201-0hl2j7m281i9pt6dp6hk4fu9jbv9rkk3.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });
  const responseGoogle = (response) => {
    console.log(response);
    const { code } = response;
    axios
      .post("/api/create-token", { code })
      .then((response) => {
        console.log(response.data);
        setSignedIn(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const responseError = (error) => {
    console.log(error);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(summary, description, location, startDateTime, endDateTime);
    axios
      .post("/api/create-event", {
        summary,
        description,
        location,
        startDateTime,
        endDateTime,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const [signedIn, setSignedIn] = useState(false);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [d, setD] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      const res = await axios.get(`${API}/requests`);
      setD(res);
      console.log("printing req");
      console.log(res);
    };
    getdata();
  }, []);

  return isAutheticated() && isAutheticated().user.role === 1 ? (
    <>
      <Navbar />
      <Text text="User Requests" />
      {signedIn ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GoogleLogin
            clientId="431101491201-0hl2j7m281i9pt6dp6hk4fu9jbv9rkk3.apps.googleusercontent.com"
            buttonText="Sign in to Google Calendar"
            onSuccess={responseGoogle}
            onFailure={responseError}
            cookiePolicy={"single_host_origin"}
            responseType="code"
            accessType="offline"
            scope="openid email profile https://www.googleapis.com/auth/calendar"
          />
        </div>
      ) : (
        <div className="user-request-table-container">
          <TableContainer component={Paper}>
            <Table
              aria-label="collapsible table"
              sx={{ backgroundColor: "black" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontSize: "1.1em" }}
                  >
                    DETAILS
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontSize: "1.1em" }}
                  >
                    CAPACITY
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontSize: "1.1em" }}
                  >
                    DESCRIPTION
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontSize: "1.1em" }}
                  >
                    STATUS
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontSize: "1.1em" }}
                  >
                    APPROVED HALL
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {d.data &&
                  d.data
                    .slice(0)
                    .reverse()
                    .map((data) => (
                      <Row key={data._id} data={data} d={d} setD={setD} />
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  ) : !isAutheticated() ? (
    <Redirect
      to={{
        pathname: "/signin",
      }}
    ></Redirect>
  ) : (
    <Redirect to={{ pathname: "/" }}></Redirect>
  );
}
