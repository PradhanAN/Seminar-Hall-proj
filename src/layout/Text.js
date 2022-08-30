import React from 'react'
import './Text.css';
import { Typography } from "@mui/material";

export default function text() {
    return (
        <div className="title">
        <Typography
          variant="h1"
          sx={{
            color: "white",
            fontFamily: "PT Sans",
            fontSize:{xs: '3.3rem' , md: '5rem'}
            
          }}
        >
          Our Seminar Halls
        </Typography>
      </div>
    )
}
