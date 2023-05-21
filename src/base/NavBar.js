import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { signout, isAutheticated } from "../helper/index";
import rvceLogo from './rvceLogo.png';
import "./NavBar.css";

const Navbar = (props) => {
  const pages = ["Request Booking", "My Requests","User Requests", "LogOut", "SignIn"];
  const settings = ["Request Booking", "My Requests","User Requests", "LogOut", "SignIn"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (key) => {
    setAnchorElNav(null);
    if (key === "Request Booking") window.location.href = "/request";
    else if (key === "My Requests") window.location.href = "/myRequests";
    else if (key === "LogOut") {
      signout(() => {
        window.location.href = "/";
      });
    } else if (key === "SignIn") {
      window.location.href = "/signin";
    }else if(key === 'User Requests') {
      window.location.href = "/adminDashboard";
    }else if(key === 'Add Hall'){
      window.location.href = "/addHall";
    }
  };

  const handleCloseUserMenu = (key) => {
    setAnchorElUser(null);
    if (key === "Request Booking") window.location.href = "/request";
    else if (key === "My Requests") window.location.href = "/myRequests";
    else if (key === "LogOut") {
      signout(() => {
        window.location.href = "/signin";
      });
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "rgba(0, 0, 0, 0.90)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img src={rvceLogo} alt="" width="50" height="50" style={{marginRight:'10px', opacity:'0.95'}} />
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h7"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Ubuntu",
              fontWeight: 400,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            
            Seminar Hall Booking
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(
                (page) =>
                  (
                    (page === "LogOut" && isAutheticated()) ||
                    (page === "SignIn" && !isAutheticated()) ||
                    (page === 'User Requests' && isAutheticated() && isAutheticated().user.role===1) ||
                    (page === 'Add Hall' && isAutheticated() && isAutheticated().user.role===1) ||
                    (page === 'Request Booking' && (!isAutheticated() || (isAutheticated() && isAutheticated().user.role===0))) || 
                    (page === 'My Requests' && (!isAutheticated() || (isAutheticated() && isAutheticated().user.role===0))
                    )) && (
                    <MenuItem
                      key={page}
                      onClick={() => {
                        handleCloseNavMenu(page);
                      }}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgb(20,20,20)",
                          color: "white",
                        },
                      }}
                    >
                      <Typography  textAlign="center">{page}</Typography>
                    </MenuItem>
                  )
              )}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Ubuntu",
              fontWeight: 400,
              color: "inherit",
              textDecoration: "none",
              //   marginRight:{md:"300px"}
            }}
          >
            Seminar Hall Booking
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}>
            <div className="navbar-items">
              {pages.map(
                (page) =>
                  (
                    (page === "LogOut" && isAutheticated()) ||
                    (page === "SignIn" && !isAutheticated()) || 
                    (page === 'User Requests' && isAutheticated() && isAutheticated().user.role===1) ||
                    (page === 'Add Hall' && isAutheticated() && isAutheticated().user.role===1) ||
                    (page === 'Request Booking' && (!isAutheticated() || (isAutheticated() && isAutheticated().user.role===0))) || 
                    (page === 'My Requests' && (!isAutheticated() || (isAutheticated() && isAutheticated().user.role===0))
                    )) && (
                    <Button
                      key={page}
                      onClick={() => {
                        handleCloseNavMenu(page);
                      }}
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        fontFamily: "Ubuntu",
                        textTransform: "capitalize",
                        fontWeight: "400",
                        fontSize: "1.1rem",
                        marginLeft: "4rem",
                      }}
                    >
                      {page}
                    </Button>
                  )
              )}
            </div>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip> */}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(
                (setting) =>
                  (
                    (setting === "LogOut" && isAutheticated()) ||
                    (setting === "SignIn" && !isAutheticated()) || 
                    (setting === 'User Requests' && isAutheticated() && isAutheticated().user.role===1) ||
                    (setting === 'Add Hall' && isAutheticated() && isAutheticated().user.role===1) ||
                    (setting === 'Request Booking' && (!isAutheticated() || (isAutheticated() && isAutheticated().user.role===0))) || 
                    (setting === 'My Requests' && (!isAutheticated() || (isAutheticated() && isAutheticated().user.role===0))
                    )) && (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu(setting);
                      }}
                    >
                      <Typography
                   
                        textAlign="center"
                        sx={{ fontFamily: "Ubuntu" }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  )
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
