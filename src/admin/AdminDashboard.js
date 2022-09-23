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
import Text from '../layout/Text';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


import { useState } from "react";
import Navbar from "../base/NavBar";
import { getRequests } from "../helper";
import { API } from "../backend";

import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";


const axios = require('axios').default;

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
    branch: "CSE"

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
    branch: "ISE"
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
    branch: "ECE"
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
    branch: "CIVIL"
  }
];

var options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};

let timings = [];

for (let i = 0; i < rows.length; i++) {
  let temp = [];
  for (let j = 0; j < rows[i].dates.length; j++) {
    temp.push({
      date: rows[i].dates[j],
      from: rows[i].fromtimes[j],
      to: rows[i].totimes[j]
    });
  }
  timings.push(temp);
}

console.log(timings);


for (let i = 0; i < rows.length; i++) {
  rows[i] = { ...rows[i], timings: timings[i] };
}

console.log(rows);

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const getData = axios.get(`${API}/requests`).then(response => response.data);

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
          {row.capacity}
        </TableCell>

        <TableCell align="center" sx={{ color: "white" }}>
          {row.description}
        </TableCell>

        <TableCell align="center" sx={{ color: "white" }}>
          {row.status}
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

                  <TableRow key={row.phone}>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ color: "white" }}
                    >
                      {row.name}
                    </TableCell>
                    {console.log(getData)}
                    <TableCell align="center" sx={{ color: "white" }}>
                      {row.email}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {row.phone}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {row.branch}
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

                  <TableRow key={row.phone}>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      sx={{ color: "white" }}
                    >
                      {row.preference_1}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {row.preference_2}
                    </TableCell>
                    <TableCell align="center" sx={{ color: "white" }}>
                      {row.preference_3}
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
                  {row.timings.map((timing) => (
                    <TableRow key={timing.date}>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        sx={{ color: "white" }}
                      >
                        {new Date(timing.date).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        {new Date(timing.from).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true
                        })}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        {new Date(timing.to).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>






      <TableRow>
        <TableCell align="center" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 6 }}>
              <div className='admin-buttons'>
                <button className="approve"><TaskAltIcon sx={{ marginRight: "6px" }} />Approve</button>
                <button className="decline"><CancelOutlinedIcon sx={{ marginRight: "6px" }} />Decline</button>
              </div>
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
  window.gapi.load('client:auth2', () => {
    window.gapi.client.init({
      clientId: '431101491201-0hl2j7m281i9pt6dp6hk4fu9jbv9rkk3.apps.googleusercontent.com',
      plugin_name: "chat"
    })
  })
  const responseGoogle = (response) => {
    console.log(response);
    const { code } = response;
    axios.post("/api/create-token", { code }).then(response => {
      console.log(response.data);
      setSignedIn(true);
    }).catch(error => {
      console.log(error.message);
    })
  }
  const responseError = (error) => {
    console.log(error);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(summary, description, location, startDateTime, endDateTime);
    axios.post("/api/create-event", { summary, description, location, startDateTime, endDateTime }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error.message);
    })
  }

  const [signedIn, setSignedIn] = useState(false);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  return (
    <>
      <Navbar />
      <Text text="User Requests" />
      {
        !signedIn ? (<div>
          <GoogleLogin clientId='431101491201-0hl2j7m281i9pt6dp6hk4fu9jbv9rkk3.apps.googleusercontent.com'
            buttonText='SignIn'
            onSuccess={responseGoogle}
            onFailure={responseError}
            cookiePolicy={'single_host_origin'}
            responseType="code"
            accessType='offline'
            scope='openid email profile https://www.googleapis.com/auth/calendar' />
        </div>) : (<div className="user-request-table-container">
          <TableContainer component={Paper}>
            <Table
              aria-label="collapsible table"
              sx={{ backgroundColor: "black" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontSize: "1.3em" }}
                  >
                    DETAILS
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontSize: "1.3em" }}
                  >
                    CAPACITY
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontSize: "1.3em" }}
                  >
                    DESCRIPTION
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: "white", fontSize: "1.3em" }}
                  >
                    STATUS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.capacity} row={row} />
                ))}
              </TableBody>

            </Table>
          </TableContainer>
        </div>)
      }
    </>
  );
}
