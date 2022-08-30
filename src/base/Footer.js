import { Typography } from "@mui/material";
import "./Footer.css";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LinkIcon from "@mui/icons-material/Link";

function Footer() {
  return (


    <div className="footer-container">
      <div className="contact-developers">

        <div>
          <MailOutlineOutlinedIcon
            sx={{ color: "white", marginRight: "1rem" }}
          />
          <a href="#">Contact Developers</a>
        </div>
        <div>
          <LinkIcon sx={{ color: "white", marginRight: "1rem" }} />
          <a href="#">RVCE Website</a>
        </div>
      </div>

      <div className="logo">
        <Typography
          variant="h5"
          sx={{ color: "white", fontFamily: "Ubuntu", marginBottom: "0.5rem" }}
        >
          RV College Of Engineering
        </Typography>
        <Typography variant="h6" sx={{ color: "white", fontFamily: "Ubuntu" }}>
          Seminar Hall Booking
        </Typography>
      </div>

      <div className="contact-admin">
        <div className="admin-logo">
          <LocalPhoneOutlinedIcon
            sx={{ color: "white", marginRight: "1rem" }}
          />
          <MailOutlineOutlinedIcon sx={{ color: "white" }} />
        </div>
        <a href="#">Contact Admin</a>
      </div>
    </div>
  
   
  );
}

export default Footer;
