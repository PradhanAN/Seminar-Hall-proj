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
import './MyRequests.css';
import Navbar from "../base/NavBar";
import Text from '../layout/Text';
import { useState } from "react";
import { API } from "../backend";
import { isAutheticated } from "../helper";
import { useEffect } from "react";

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Redirect } from "react-router";


const axios = require('axios').default;

const rows = [
  {
    capacity: "100",
    description: "first-for-testing",
    dates: ["2002-12-09", "2022-12-09", "2032-12-09"],
    fromtimes: ["2002-12-09T12:00", "2022-12-09T13:00", "2032-12-09T18:00"],
    totimes: ["2002-12-09T13:00", "2022-12-09T14:30", "2032-12-09T20:00"],
    preference_1: "bio seminar hall",
    preference_2: "ece seminar hall",
    preference_3: "cse seminar hall"
  },
  {
    capacity: "200",
    description: "second-for-testing",
    dates: ["2002-12-09", "2022-12-09", "2032-12-09"],
    fromtimes: ["2002-12-09T13:00", "2022-12-09T14:00", "2032-12-09T18:00"],
    totimes: ["2002-12-09T13:00", "2022-12-09T14:30", "2032-12-09T19:00"],
    preference_1: "mechanical seminar hall",
    preference_2: "civil seminar hall",
    preference_3: "cse seminar hall"
  },
  {
    capacity: "300",
    description: "third-for-testing",
    dates: ["2002-12-09", "2022-12-09", "2032-12-09"],
    fromtimes: ["2002-12-09T12:00", "2022-12-09T13:00", "2032-12-09T18:00"],
    totimes: ["2002-12-09T13:00", "2022-12-09T14:30", "2032-12-09T20:00"],
    preference_1: "eee seminar hall",
    preference_2: "ece seminar hall",
    preference_3: "ase seminar hall"
  },
  {
    capacity: "400",
    description: "fourth-for-testing",
    dates: ["2002-12-09", "2022-12-09", "2032-12-09"],
    fromtimes: ["2002-12-09T12:00", "2022-12-09T13:00", "2032-12-09T18:00"],
    totimes: ["2002-12-09T13:00", "2022-12-09T14:30", "2032-12-09T20:00"],
    preference_1: "bio seminar hall",
    preference_2: "ece seminar hall",
    preference_3: "cse seminar hall"
  }
];

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

let timings = [];

for (let i = 0; i < rows.length; i++) {
  let temp = [];
  for (let j = 0; j < rows[i].dates.length; j++) {
    temp.push({
      date: rows[i].dates[j],
      from: rows[i].fromtimes[j],
      to: rows[i].totimes[j]
    })
  }
  timings.push(temp);
}

for (let i = 0; i < rows.length; i++) {
  rows[i] = { ...rows[i], timings: timings[i] };
}

console.log(rows);


function Row(props) {
  const { data } = props;
  const [open, setOpen] = useState(false);
  
  
  
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

        <TableCell align="center" sx={{ color: data.approved==="true"?"rgb(0, 255, 64)": (data.approved==="false"?"rgb(255, 0, 0)":"rgb(255, 238, 0)") }}>
          {data.approved==="pending" && "Pending"}
          {data.approved==="true" && "Approved"}
          {data.approved==="false" && "Declined"}
        </TableCell>

        <TableCell align="center" sx={{ color: "white" }}>
          {data.approvedHall}
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

                  <TableRow key={data._id}>
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
                        {new Date(data.date).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        {new Date(data.timefrom).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true
                        })}
                      </TableCell>
                      <TableCell align="center" sx={{ color: "white" }}>
                        {new Date(data.timeto).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true
                        })}
                      </TableCell>
                    </TableRow>
                  
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      




      
    </React.Fragment>
  );
}



export default function CollapsibleTable() {
 
  const userId = isAutheticated() && isAutheticated().user._id;
  const token = isAutheticated() && isAutheticated().token;
  const [d, setD] = useState([]);
  
  
  
  useEffect(() => {
    const getdata= async () => {
      const res = await axios.get(`${API}/requests/${userId}`);
      setD(res)
      // console.log(res);
    }
    getdata();
  }, [userId]);

  


  return (
    (isAutheticated() && isAutheticated().user.role === 0) ? (
    <>
      <Navbar />
      <Text text="My Requests" />
      <div className='request-table-container'>
        <TableContainer component={Paper} >
          <Table aria-label="collapsible table" sx={{ backgroundColor: "black" }} >
            <TableHead >
              <TableRow>
                <TableCell align="center" sx={{ color: "white", fontSize: "1.3em" }}>TIMINGS</TableCell>
                <TableCell align="center" sx={{ color: "white", fontSize: "1.3em" }}>CAPACITY</TableCell>
                <TableCell align="center" sx={{ color: "white", fontSize: "1.3em" }} >DESCRIPTION </TableCell>
                <TableCell align="center" sx={{ color: "white", fontSize: "1.3em" }} >STATUS </TableCell>
                <TableCell align="center" sx={{ color: "white", fontSize: "1.3em" }} >APPROVED HALL</TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody >
              {d.data && d.data.slice(0).reverse().map((data) => (
                <Row key={data._id} data={data} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>) : (
      <Redirect to={{
        pathname : '/signin'
    }}></Redirect>
    )

  );
}
