import React, { useEffect, useState } from "react";
import { Box, InputLabel, TextField, Typography } from "@mui/material";
import "./Request.css";
import { useForm } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import {
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { isAutheticated, submitRequest } from "../helper";
import { raw } from "body-parser";
import { Redirect } from "react-router";




const Request = () => {
 let temp= 0;
  const currDate = new Date();
  const [fromTime, setFromTime] = useState(currDate);
  const [toTime, setToTime] = useState(currDate);
  const [rawData, setRawData] = useState([]);
  const [renderedDates, setRenderedDates] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const renderDateTimes = (data) => {
  

    return data.map((entry) => {
      return (
        <>
          <div key={entry._id} className="rendered-dates">
            
            <p><span>Date &nbsp;:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{entry.date.toDateString()}</p>
            <p><span>From &nbsp;:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {entry.fromTime.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
            <p><span>To &nbsp;:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {entry.toTime.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
            
            <button className="cancel-button" onClick = {(event)=>{removeDate(event,entry._id)}}><CancelOutlinedIcon sx={{ marginRight: "6px"}} />Cancel</button>
          </div>
          <hr></hr>
        </>
      );
    });
  };

  const removeDate = async (e,id) => {
    e.preventDefault();
    const temp = rawData.filter((item)=>item._id!==id);
    await setRawData(temp);
  }



  const dates = async (e) => {
    e.preventDefault();

    
      toTime.setFullYear(
        fromTime.getFullYear(),
        fromTime.getMonth(),
        fromTime.getDate()
      );
  
      const currData = {
        _id : Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36),
        date: fromTime,
        fromTime: fromTime,
        toTime: toTime,
      };
      await setRawData([...rawData, currData]);
    

    
    // setRenderedDates(renderDateTimes(rawData));
  };

  useEffect(() => {
    console.log("hello");
    console.log(rawData);
    setRenderedDates(renderDateTimes(rawData));
    
  }, [rawData]);




  const onSubmit = (data,e) => {
   

    e.preventDefault();
    // let dateString = "";
    // for (let i = 0; i < rawData.length; i++) {
   
    //   dateString += `Date : ${rawData[i].date.toDateString()} \nFrom : ${rawData[i].fromTime.toLocaleString("en-US", {
    //     hour: "numeric",
    //     minute: "numeric",
    //     hour12: true,
    //   })}\nTo : ${rawData[i].toTime.toLocaleString("en-US", {
    //     hour: "numeric",
    //     minute: "numeric",
    //     hour12: true,
    //   })}\n\n`
    // }
    
    if(rawData.length===0){
      alert("You haven't selected any dates");
      return;
    }
    const answer = window.confirm(`Note : Only the dates displayed in YELLOW will be sent as requests. \n\nYou will be notified via email when the admin approves/declines your requests.\n\nAre you sure you want to submit?`);

    if(answer){
      console.log(isAutheticated());
    const userId = isAutheticated() && isAutheticated().user._id;
    const token = isAutheticated() && isAutheticated().token;

    const curatedData = {
      ...data,
      date: currDate,
      dates: rawData,
    };
    console.log(curatedData);
    submitRequest(userId, token, curatedData)
      .then(data => {
        if (data.error) {
          console.log(data);
        }
      })
      .catch(console.log("request failed to submit"));

      window.location.href='/';
    }else{
      console.log("wait");
    }

    
    
    
  };




  return (
    (isAutheticated() && isAutheticated().user.role === 0) ? (
    <form onSubmit={handleSubmit(onSubmit)} className="request-form">
      <Typography
        variant="h3"
        sx={{ color: "white", fontFamily: "Ubuntu", margin: "22px auto" }}
      >
        Request Booking
      </Typography>

      <input
        placeholder="Capacity"
        autoComplete="off"
        type="number"
        {...register("capacity", { required: "* capacity is required" })}
      />
      <p>{errors.capacity?.message}</p>

      <textarea
        rows="5"
        placeholder="Purpose of Booking :  "
        autoComplete="off"
        {...register("description", {
          required: "* Purpose of Booking is required",
        })}
      />
      <p>{errors.description?.message}</p>

      <hr />

      <FormControl sx={{ marginBottom: "17px", marginTop: "14px" }}>
        <InputLabel
          id="demo-simple-select-helper-label"
          sx={{ color: "#747474e5" }}
        >
          Prefernce 1
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Preference 1"
          inputProps={{
            ...register("preference_1", {
              required: "* Preference 1 is required",
            }),
          }}
          sx={{
            color: "white",
            borderRadius: "14px",

            width: "300px",
            height: "52px",
            transition: "0.25s",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            ".MuiSvgIcon-root ": {
              fill: "white",
            },
          }}
        >
          <MenuItem value={""}>NONE</MenuItem>
          <MenuItem value={"ANY"}>ANY</MenuItem>
          <MenuItem value={"CSE Seminar Hall"}>CSE Seminar Hall</MenuItem>
          <MenuItem value={"ISE Seminar Hall"}>ISE Seminar Hall</MenuItem>
          <MenuItem value={"ECE Seminar Hall"}>ECE Seminar Hall</MenuItem>
          <MenuItem value={"ACE Seminar Hall"}>ACE Seminar Hall</MenuItem>
          <MenuItem value={"EEE Seminar Hall"}>EEE Seminar Hall</MenuItem>
          <MenuItem value={"ETE Seminar Hall"}>ETE Seminar Hall</MenuItem>
          <MenuItem value={"EIE Seminar Hall"}>EIE Seminar Hall</MenuItem>
          <MenuItem value={"MECHANICAL Seminar Hall"}>
            MECHANICAL Seminar Hall
          </MenuItem>
          <MenuItem value={"CIVIL Seminar Hall"}>CIVIL Seminar Hall</MenuItem>
          <MenuItem value={"BIOTECH Seminar Hall"}>
            BIOTECH Seminar Hall
          </MenuItem>
          <MenuItem value={"IEM Seminar Hall"}>IEM Seminar Hall</MenuItem>
          <MenuItem value={"CHEMICAL Seminar Hall"}>
            CHEMICAL Seminar Hall
          </MenuItem>
        </Select>
      </FormControl>
      <p>{errors.preference_1?.message}</p>

      <FormControl sx={{ marginBottom: "17px", marginTop: "8px" }}>
        <InputLabel
          id="demo-simple-select-helper-label"
          sx={{ color: "#747474e5" }}
        >
          Prefernce 1
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Preference 2"
          inputProps={{
            ...register("preference_2", {
              required: "* Preference 2 is required",
            }),
          }}
          sx={{
            color: "white",
            borderRadius: "14px",

            width: "300px",
            height: "52px",
            transition: "0.25s",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            ".MuiSvgIcon-root ": {
              fill: "white",
            },
          }}
        >
          <MenuItem value={""}>NONE</MenuItem>
          <MenuItem value={"ANY"}>ANY</MenuItem>
          <MenuItem value={"CSE Seminar Hall"}>CSE Seminar Hall</MenuItem>
          <MenuItem value={"ISE Seminar Hall"}>ISE Seminar Hall</MenuItem>
          <MenuItem value={"ECE Seminar Hall"}>ECE Seminar Hall</MenuItem>
          <MenuItem value={"ACE Seminar Hall"}>ACE Seminar Hall</MenuItem>
          <MenuItem value={"EEE Seminar Hall"}>EEE Seminar Hall</MenuItem>
          <MenuItem value={"ETE Seminar Hall"}>ETE Seminar Hall</MenuItem>
          <MenuItem value={"EIE Seminar Hall"}>EIE Seminar Hall</MenuItem>
          <MenuItem value={"MECHANICAL Seminar Hall"}>
            MECHANICAL Seminar Hall
          </MenuItem>
          <MenuItem value={"CIVIL Seminar Hall"}>CIVIL Seminar Hall</MenuItem>
          <MenuItem value={"BIOTECH Seminar Hall"}>
            BIOTECH Seminar Hall
          </MenuItem>
          <MenuItem value={"IEM Seminar Hall"}>IEM Seminar Hall</MenuItem>
          <MenuItem value={"CHEMICAL Seminar Hall"}>
            CHEMICAL Seminar Hall
          </MenuItem>
        </Select>
      </FormControl>
      <p>{errors.preference_2?.message}</p>

      <FormControl sx={{ marginBottom: "7px", marginTop: "8px" }}>
        <InputLabel
          id="demo-simple-select-helper-label"
          sx={{ color: "#747474e5" }}
        >
          Prefernce 3
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Preference 3"
          inputProps={{
            ...register("preference_3", {
              required: "* Preference 3 is required",
            }),
          }}
          sx={{
            color: "white",
            borderRadius: "14px",

            width: "300px",
            height: "52px",
            transition: "0.25s",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            ".MuiSvgIcon-root ": {
              fill: "white",
            },
          }}
        >
          <MenuItem value={""}>NONE</MenuItem>
          <MenuItem value={"ANY"}>ANY</MenuItem>
          <MenuItem value={"CSE Seminar Hall"}>CSE Seminar Hall</MenuItem>
          <MenuItem value={"ISE Seminar Hall"}>ISE Seminar Hall</MenuItem>
          <MenuItem value={"ECE Seminar Hall"}>ECE Seminar Hall</MenuItem>
          <MenuItem value={"ACE Seminar Hall"}>ACE Seminar Hall</MenuItem>
          <MenuItem value={"EEE Seminar Hall"}>EEE Seminar Hall</MenuItem>
          <MenuItem value={"ETE Seminar Hall"}>ETE Seminar Hall</MenuItem>
          <MenuItem value={"EIE Seminar Hall"}>EIE Seminar Hall</MenuItem>
          <MenuItem value={"MECHANICAL Seminar Hall"}>
            MECHANICAL Seminar Hall
          </MenuItem>
          <MenuItem value={"CIVIL Seminar Hall"}>CIVIL Seminar Hall</MenuItem>
          <MenuItem value={"BIOTECH Seminar Hall"}>
            BIOTECH Seminar Hall
          </MenuItem>
          <MenuItem value={"IEM Seminar Hall"}>IEM Seminar Hall</MenuItem>
          <MenuItem value={"CHEMICAL Seminar Hall"}>
            CHEMICAL Seminar Hall
          </MenuItem>
        </Select>
      </FormControl>
      <p>{errors.preference_3?.message}</p>

      <hr />
      {renderedDates}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ margin: "40px auto" }}>
          <DateTimePicker
            label="Date and Time"
            // {...register("startDateAndTime", {
            // 	required: true,
            // })}
            value={fromTime}
            onChange={(value) => setFromTime(value.$d)}

            renderInput={(params) => (
              <TextField
                {...params}
                className="date-picker"
                sx={{
                  ".MuiInputBase-input": { color: "white" },
                  "& label.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white"
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },

                  ".MuiSvgIcon-root ": {
                    fill: "white",
                  },
                  label: { color: "rgb(226, 226, 226)" },
                  width: "300px",

                }}

              />
            )}

          />
        </Box>

        <Box sx={{ margin: "30px auto" }}>
          <TimePicker
            label="End Time"
            // {...register("endTime", {
            // 	required: true,
            //     min:{
            //         value:getValues("endTime"),
            //         message:"* End time should be greater than Start time"
            //     }
            // })}
            value={toTime}
            onChange={(value) => setToTime(value.$d)}
            renderInput={(props) => (
              <TextField
                {...props}
                sx={{
                  ".MuiInputBase-input": { color: "white" },
                  "& label.Mui-focused": {
                    color: "white",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },

                  ".MuiSvgIcon-root ": {
                    fill: "white",
                  },
                  label: { color: "rgb(226, 226, 226)" },
                }}

              />
            )}
          />
        </Box>

      </LocalizationProvider>



      <button className="add-date" onClick={dates}>
        Add Date +
      </button>



      <hr />


      <button type="submit">Submit</button>
    </form>) : (
      <Redirect to={{
        pathname : '/signin'
    }}></Redirect>
    )
  );
};

export default Request;
