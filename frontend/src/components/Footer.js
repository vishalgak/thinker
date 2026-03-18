import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";

const Footer = () => {
  const location = useLocation();

  const isLandingActive =
    location.pathname === "/" || location.pathname === "/landing";

  // --- Theme Palette (Cyberpunk Blue) ---
  const palette = {
    background: "#030712",
    surface: "rgba(15, 23, 42, 0.6)",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    accent: "#00e0ff",
    secondary: "#a855f7",
    border: "rgba(0, 224, 255, 0.15)",
    glow: "rgba(0, 224, 255, 0.4)",
  };

  // --- Link Styles ---
  const baseLinkStyle = {
    textDecoration: "none",
    fontFamily: '"Poppins", sans-serif',
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "0.5px",
    padding: "6px 12px",
    borderRadius: "8px",
    color: palette.textSecondary,
    transition: "all 0.3s ease",
  };

  const activeLinkStyle = {
    ...baseLinkStyle,
    color: palette.accent,
    background: "rgba(0, 224, 255, 0.1)",
    boxShadow: `0 0 10px rgba(0, 224, 255, 0.2)`,
    borderBottom: `2px solid ${palette.accent}`,
  };

  const getLinkStyle = ({ isActive, isLanding }) => {
    if ((isLanding && isLandingActive) || isActive) {
      return activeLinkStyle;
    }
    return baseLinkStyle;
  };

  return (
    <Box
      sx={{
        mt: "auto",
        pt: 6,
        pb: 3,
        px: 2,
        background: `linear-gradient(180deg, transparent 0%, ${palette.background} 20%)`,
        borderTop: `1px solid ${palette.border}`,
        backdropFilter: "blur(12px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Glow Orb */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "100px",
          background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`,
          opacity: 0.15,
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      {/* Navigation Links */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: { xs: 1, sm: 2, md: 3 },
          mb: 4,
          flexWrap: "wrap",
          position: "relative",
          zIndex: 1,
        }}
      >
        {[
          { to: "/home", label: "Home" },
          { to: "/how-to-use", label: "How to Use" },
          { to: "/documents", label: "Documents" },
          { to: "/profile", label: "Profile" },
          { to: "/login", label: "Login" },
          { to: "/register", label: "Register" },
          { to: "/", label: "Landing", isLanding: true },
          { to: "/privacy-policy", label: "Privacy" },
          { to: "/terms-of-service", label: "Terms" },
        ].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => getLinkStyle({ isActive, isLanding: link.isLanding })}
          >
            <Typography
              sx={{
                fontFamily: "inherit",
                fontSize: "inherit",
                fontWeight: "inherit",
                color: "inherit",
                "&:hover": {
                  textShadow: `0 0 8px ${palette.accent}`,
                },
              }}
            >
              {link.label}
            </Typography>
          </NavLink>
        ))}
      </Box>

      {/* Social Media Icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mb: 3,
          position: "relative",
          zIndex: 1,
        }}
      >
        {[
          { icon: <GitHubIcon />, href: "https://github.com/vishalkumar9887" },
          { icon: <LinkedInIcon />, href: "https://www.linkedin.com/in/vishal-offc/" },
          { icon: <EmailIcon />, href: "mailto:vk1062480@gmail.com" },
          { icon: <LanguageIcon />, href: "https://delightful-khapse-28e51f.netlify.app" },
        ].map((item, index) => (
          <IconButton
            key={index}
            component="a"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: palette.textSecondary,
              borderRadius: "12px",
              border: `1px solid transparent`,
              transition: "all 0.3s ease",
              "&:hover": {
                color: palette.accent,
                borderColor: palette.accent,
                background: "rgba(0, 224, 255, 0.05)",
                boxShadow: `0 0 15px ${palette.glow}`,
                transform: "translateY(-2px)",
              },
            }}
          >
            {item.icon}
          </IconButton>
        ))}
      </Box>

      {/* Footer Text */}
      <Typography
        variant="caption"
        sx={{
          display: "block",
          textAlign: "center",
          color: palette.textSecondary,
          fontFamily: '"Poppins", sans-serif',
          fontSize: "0.8rem",
          opacity: 0.6,
          position: "relative",
          zIndex: 1,
        }}
      >
        © {new Date().getFullYear()} DocuThinker. All rights reserved. Built with{" "}
        <Box component="span" sx={{ color: "#ef4444" }}>
          ❤️
        </Box>
      </Typography>
    </Box>
  );
};

export default Footer;