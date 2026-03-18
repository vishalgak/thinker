import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import HomeIcon from "@mui/icons-material/Home";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const Navbar = ({ theme, onThemeToggle, onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width:1111px)");

  // --- Theme Palette (Cyberpunk Blue) ---
  const palette = {
    background: "#030712",
    surface: "rgba(15, 23, 42, 0.8)",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    accent: "#00e0ff",
    secondary: "#a855f7",
    border: "rgba(0, 224, 255, 0.15)",
    glow: "rgba(0, 224, 255, 0.4)",
    danger: "#f43f5e",
  };

  // --- Effects ---
  useEffect(() => {
    const checkLoggedInStatus = () => {
      const userId = localStorage.getItem("userId");
      setIsLoggedIn(!!userId);
    };
    checkLoggedInStatus();
    const interval = setInterval(checkLoggedInStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    onLogout();
    navigate("/login");
    setIsLoggedIn(false);
  };

  // --- Styling Constants ---
  const navLinkStyle = {
    color: palette.textSecondary,
    marginRight: 2,
    fontFamily: '"Poppins", sans-serif',
    textTransform: "none",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
    padding: "6px 12px",
    borderRadius: "8px",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      color: palette.accent,
      backgroundColor: "rgba(0, 224, 255, 0.05)",
      textShadow: `0 0 8px ${palette.glow}`,
    },
  };

  const activeStyle = {
    ...navLinkStyle,
    color: palette.accent,
    borderBottom: `2px solid ${palette.accent}`,
    borderRadius: "0",
    backgroundColor: "transparent",
    boxShadow: `0 4px 10px ${palette.glow}`,
  };

  const navLinksData = [
    { to: "/home", label: "Home", icon: <HomeIcon /> },
    { to: "/how-to-use", label: "How to Use", icon: <HelpOutlineIcon /> },
    { to: "/documents", label: "Documents", icon: <DescriptionIcon /> },
    { to: "/profile", label: "Profile", icon: <PersonIcon /> },
  ];

  const renderNavLinks = (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {navLinksData.map((link) => (
        <Button
          key={link.to}
          component={NavLink}
          to={link.to}
          style={({ isActive }) => (isActive ? activeStyle : navLinkStyle)}
          sx={navLinkStyle}
          startIcon={link.icon}
        >
          {link.label}
        </Button>
      ))}
      
      {isLoggedIn ? (
        <Button
          onClick={handleLogout}
          startIcon={<ExitToAppIcon />}
          sx={{
            ...navLinkStyle,
            color: palette.danger,
            "&:hover": {
              backgroundColor: "rgba(244, 63, 94, 0.1)",
              color: palette.danger,
              textShadow: `0 0 8px rgba(244, 63, 94, 0.4)`,
            },
          }}
        >
          Logout
        </Button>
      ) : (
        <>
          <Button
            component={NavLink}
            to="/login"
            style={({ isActive }) => (isActive ? activeStyle : navLinkStyle)}
            sx={navLinkStyle}
            startIcon={<LoginIcon />}
          >
            Login
          </Button>
          <Button
            component={NavLink}
            to="/register"
            style={({ isActive }) => (isActive ? activeStyle : navLinkStyle)}
            sx={navLinkStyle}
            startIcon={<AppRegistrationIcon />}
          >
            Register
          </Button>
        </>
      )}
    </Box>
  );

  return (
    <AppBar
      position="fixed" // Fixed for better glass effect overlay
      elevation={0}
      sx={{
        bgcolor: palette.surface,
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${palette.border}`,
        boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1)`,
        zIndex: 1200,
      }}
    >
      <Toolbar sx={{ py: 0.5 }}>
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={{
            flexGrow: 1,
            fontWeight: 800,
            fontSize: "1.5rem",
            fontFamily: '"Poppins", sans-serif',
            textDecoration: "none",
            background: `linear-gradient(135deg, ${palette.textPrimary}, ${palette.accent})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          DocuThinker
        </Typography>

        {/* Desktop Nav */}
        <Box sx={{ display: isLargeScreen ? "flex" : "none" }}>
          {renderNavLinks}
        </Box>

        {/* Theme Toggle */}
        <IconButton
          onClick={onThemeToggle}
          sx={{
            ml: 2,
            color: palette.textSecondary,
            border: `1px solid ${palette.border}`,
            borderRadius: "10px",
            padding: "8px",
            transition: "all 0.3s ease",
            "&:hover": {
              color: palette.accent,
              borderColor: palette.accent,
              boxShadow: `0 0 15px ${palette.glow}`,
            },
          }}
        >
          {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {/* Mobile Menu Button */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          sx={{
            display: isLargeScreen ? "none" : "flex",
            ml: 1,
            color: palette.textSecondary,
            border: `1px solid ${palette.border}`,
            borderRadius: "10px",
            "&:hover": { color: palette.accent, borderColor: palette.accent },
          }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            bgcolor: palette.background,
            borderLeft: `1px solid ${palette.border}`,
            boxShadow: `-10px 0 30px rgba(0,0,0,0.5)`,
          },
        }}
      >
        <Box
          sx={{
            width: 280,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {/* Drawer Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, px: 1 }}>
            <Typography sx={{ fontWeight: 800, color: palette.accent, fontSize: "1.2rem" }}>
              Menu
            </Typography>
            <IconButton onClick={toggleDrawer(false)} sx={{ color: palette.textSecondary }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Drawer Links */}
          <List sx={{ p: 0 }}>
            {navLinksData.map((link) => (
              <ListItem
                key={link.to}
                component={NavLink}
                to={link.to}
                sx={{
                  color: palette.textSecondary,
                  borderRadius: "12px",
                  mb: 1,
                  "&.active": {
                    color: palette.accent,
                    backgroundColor: "rgba(0, 224, 255, 0.1)",
                    boxShadow: `inset 3px 0 0 ${palette.accent}`,
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    color: palette.textPrimary,
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
            
            <Box sx={{ mt: 2, borderTop: `1px solid ${palette.border}`, pt: 2 }}>
              {isLoggedIn ? (
                <ListItem
                  onClick={handleLogout}
                  sx={{
                    color: palette.danger,
                    borderRadius: "12px",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "rgba(244, 63, 94, 0.1)" },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: palette.danger }}>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              ) : (
                <>
                  <ListItem
                    component={NavLink}
                    to="/login"
                    sx={{
                      color: palette.textSecondary,
                      borderRadius: "12px",
                      mb: 1,
                      "&.active": { color: palette.accent },
                      "&:hover": { color: palette.textPrimary },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}><LoginIcon /></ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItem>
                  <ListItem
                    component={NavLink}
                    to="/register"
                    sx={{
                      color: palette.textSecondary,
                      borderRadius: "12px",
                      "&.active": { color: palette.accent },
                      "&:hover": { color: palette.textPrimary },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}><AppRegistrationIcon /></ListItemIcon>
                    <ListItemText primary="Register" />
                  </ListItem>
                </>
              )}
            </Box>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;