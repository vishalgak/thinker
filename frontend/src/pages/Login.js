import React, { useState, useEffect } from "react";
import BASE_URL from "../config/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOpen } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { keyframes } from "@emotion/react";

// --- Animations ---
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const Login = ({ theme, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      onLogin();
      setLoading(false);

      const { customToken, userId } = response.data;
      localStorage.setItem("token", customToken);
      localStorage.setItem("userId", userId);
      navigate("/home");
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
              background: `linear-gradient(135deg, rgba(0,224,255,0.2), rgba(168,85,247,0.2))`,
              border: `1px solid ${palette.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: palette.accent,
            }}
          >
            <LockOpen />
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
            Welcome Back
          </Typography>
          <Typography sx={{ color: palette.textSecondary }}>
            Sign in to access your dashboard
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
              "& .MuiAlert-icon": {
                color: palette.errorText,
              },
            }}
          >
            {error}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleLogin}>
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
              Password
            </Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              placeholder="Enter your password"
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
                      onClick={handleTogglePasswordVisibility}
                      sx={{ color: palette.textSecondary, "&:hover": { color: palette.accent } }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Forgot Password Link */}
          <Box sx={{ textAlign: "right", mb: 3 }}>
            <Link
              component="button"
              type="button"
              onClick={() => navigate("/forgot-password")}
              sx={{
                color: palette.textSecondary,
                textDecoration: "none",
                fontSize: "0.85rem",
                transition: "color 0.2s",
                "&:hover": { color: palette.accent },
              }}
            >
              Forgot password?
            </Link>
          </Box>

          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.5,
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
            {loading ? <CircularProgress size={24} sx={{ color: palette.textPrimary }} /> : "Sign In"}
          </Button>
        </form>

        {/* Register Link */}
        <Typography sx={{ mt: 4, textAlign: "center", color: palette.textSecondary, fontSize: "0.9rem" }}>
          New to DocuThinker?{" "}
          <Link
            component="button"
            type="button"
            onClick={() => navigate("/register")}
            sx={{
              color: palette.accent,
              fontWeight: 600,
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Create an account
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;