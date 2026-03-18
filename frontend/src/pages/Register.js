import React, { useState, useEffect } from "react";
import BASE_URL from "../config/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, PersonAdd } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";

// --- Animations ---
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 20px rgba(0, 224, 255, 0.2); }
  50% { box-shadow: 0 0 40px rgba(0, 224, 255, 0.6); }
  100% { box-shadow: 0 0 20px rgba(0, 224, 255, 0.2); }
`;

const Register = ({ theme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // --- Mouse Move Effect for Custom Cursor ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    errorBg: "rgba(244, 63, 94, 0.1)",
    errorText: "#f43f5e",
    successBg: "rgba(16, 185, 129, 0.1)",
    successText: "#10b981",
  };

  // --- Glass Card Style ---
  const glassCardSx = {
    background: palette.surface,
    backdropFilter: "blur(20px)",
    border: `1px solid ${palette.border}`,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    borderRadius: "24px",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.4s ease",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "1px",
      background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
    },
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "${BASE_URL}/register",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      setLoading(false);
      setSuccess("User registered successfully! Redirecting to login...");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

      console.log(response.data);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data.details || err.message);
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: palette.background,
        color: palette.textPrimary,
        position: "relative",
        overflow: "hidden",
        fontFamily: '"Poppins", sans-serif',
        cursor: "none",
        py: 4,
      }}
    >
      {/* Custom Cursor Glow */}
      <Box
        sx={{
          position: "fixed",
          left: mousePos.x,
          top: mousePos.y,
          width: "400px",
          height: "400px",
          background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 1,
          mixBlendMode: "screen",
        }}
      />

      {/* Background Elements */}
      <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${palette.accent} 0%, transparent 70%)`,
            opacity: 0.1,
            filter: "blur(80px)",
            animation: `${float} 15s ease-in-out infinite`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            right: "5%",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${palette.secondary} 0%, transparent 70%)`,
            opacity: 0.1,
            filter: "blur(100px)",
            animation: `${float} 20s ease-in-out infinite reverse`,
          }}
        />
      </Box>

      <Box
        sx={{
          ...glassCardSx,
          maxWidth: "450px",
          width: "100%",
          padding: "3rem",
          zIndex: 2,
          "&:hover": {
            border: `1px solid ${palette.accent}`,
            boxShadow: `0 15px 40px rgba(0, 0, 0, 0.6), 0 0 30px ${palette.glow}`,
          },
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              mx: "auto",
              mb: 2,
              borderRadius: "16px",
              background: `linear-gradient(135deg, rgba(168,85,247,0.2), rgba(0,224,255,0.2))`,
              border: `1px solid ${palette.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: palette.secondary,
            }}
          >
            <PersonAdd />
          </Box>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: `linear-gradient(135deg, ${palette.textPrimary} 0%, ${palette.accent} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Create Account
          </Typography>
          <Typography sx={{ color: palette.textSecondary }}>
            Join DocuThinker to get started
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              backgroundColor: palette.errorBg,
              color: palette.errorText,
              border: `1px solid rgba(244, 63, 94, 0.3)`,
              borderRadius: "12px",
              "& .MuiAlert-icon": { color: palette.errorText },
            }}
          >
            {error}
          </Alert>
        )}

        {/* Success Alert */}
        {success && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              backgroundColor: palette.successBg,
              color: palette.successText,
              border: `1px solid rgba(16, 185, 129, 0.3)`,
              borderRadius: "12px",
              "& .MuiAlert-icon": { color: palette.successText },
            }}
          >
            {success}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleRegister}>
          {/* Email Input with Fixed Label */}
          <Box sx={{ mb: 3 }}>
            <Typography 
              sx={{ 
                color: palette.textSecondary, 
                fontWeight: 600, 
                mb: 1, 
                fontSize: "0.9rem",
                display: "block"
              }}
            >
              Email Address
            </Typography>
            <TextField
              type="email"
              fullWidth
              required
              placeholder="Enter your email"
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "12px",
                  fieldset: { border: `1px solid ${palette.border}` },
                  "&:hover fieldset": { borderColor: palette.accent },
                  "&.Mui-focused fieldset": { borderColor: palette.accent, boxShadow: `0 0 10px ${palette.glow}` },
                },
                input: { color: palette.textPrimary, "&::placeholder": { opacity: 0.5 } },
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>

          {/* Password Input with Fixed Label */}
          <Box sx={{ mb: 3 }}>
            <Typography 
              sx={{ 
                color: palette.textSecondary, 
                fontWeight: 600, 
                mb: 1, 
                fontSize: "0.9rem",
                display: "block"
              }}
            >
              Password
            </Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              placeholder="Create a password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "12px",
                  fieldset: { border: `1px solid ${palette.border}` },
                  "&:hover fieldset": { borderColor: palette.accent },
                  "&.Mui-focused fieldset": { borderColor: palette.accent, boxShadow: `0 0 10px ${palette.glow}` },
                },
                input: { color: palette.textPrimary },
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      sx={{ color: palette.textSecondary, "&:hover": { color: palette.accent } }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Confirm Password Input with Fixed Label */}
          <Box sx={{ mb: 1 }}>
            <Typography 
              sx={{ 
                color: palette.textSecondary, 
                fontWeight: 600, 
                mb: 1, 
                fontSize: "0.9rem",
                display: "block"
              }}
            >
              Confirm Password
            </Typography>
            <TextField
              type={showConfirmPassword ? "text" : "password"}
              fullWidth
              required
              placeholder="Confirm your password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "12px",
                  fieldset: { border: `1px solid ${palette.border}` },
                  "&:hover fieldset": { borderColor: palette.accent },
                  "&.Mui-focused fieldset": { borderColor: palette.accent, boxShadow: `0 0 10px ${palette.glow}` },
                },
                input: { color: palette.textPrimary },
              }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      sx={{ color: palette.textSecondary, "&:hover": { color: palette.accent } }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Register Button */}
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.5,
              mt: 4,
              background: `linear-gradient(135deg, ${palette.secondary}, ${palette.accent})`,
              color: palette.background,
              fontWeight: 700,
              fontSize: "1rem",
              borderRadius: "12px",
              boxShadow: `0 0 20px rgba(168, 85, 247, 0.3)`,
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: `0 0 30px rgba(0, 224, 255, 0.6)`,
                transform: "translateY(-2px)",
              },
              "&:disabled": {
                background: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.3)",
              },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: palette.textPrimary }} /> : "Create Account"}
          </Button>
        </form>

        {/* Login Link */}
        <Typography sx={{ mt: 4, textAlign: "center", color: palette.textSecondary, fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <Button
            onClick={() => navigate("/login")}
            sx={{
              color: palette.accent,
              fontWeight: 600,
              textTransform: "none",
              p: 0,
              ml: 0.5,
              "&:hover": { textDecoration: "underline", background: "transparent" },
            }}
          >
            Sign In
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;