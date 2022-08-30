import seminarPic from "../images/seminarHallImage.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import "./Item.css";

const Item = () => {
  return (
    <div className="card-container">
      <Card
        sx={{
          maxWidth: 380,
          background: "rgb(25,25,25)",
          color: "white",
          padding: "10px",
          borderRadius: "15px",
          border: "2px solid rgba(255, 255, 255, 0.177)",
        }}
      >
        <CardActionArea sx={{ borderRadius: "15px" }}>
          <CardMedia
            component="img"
            height="300rem"
            image={seminarPic}
            alt="Seminar Hall"
            sx={{ borderRadius: "10px" }}
          />
          <CardContent sx={{ textAlign: "center", marginTop: "1rem" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontFamily: "Ubuntu" }}
            >
              Seminar Hall Name
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontFamily: "Ubuntu" }}
            >
              BRANCH
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontFamily: "Ubuntu" }}
            >
              CAPACITY - 200
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default Item;
