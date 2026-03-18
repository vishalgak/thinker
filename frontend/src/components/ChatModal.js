import React, { useState, useEffect, useRef } from "react";
import BASE_URL from "../config/api";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
  Modal,
  Fade,
} from "@mui/material";
import { Close, Send, SmartToy, Person } from "@mui/icons-material";
import axios from "axios";
import { keyframes } from "@emotion/react";

// --- Animation ---
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const ChatModal = ({ theme, open, onClose, initialMessage }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // --- Theme Palette (Cyberpunk Blue) ---
  const palette = {
    background: "#030712",
    surface: "rgba(15, 23, 42, 0.85)",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    accent: "#00e0ff",
    secondary: "#a855f7",
    border: "rgba(0, 224, 255, 0.2)",
    glow: "rgba(0, 224, 255, 0.5)",
  };

  // --- Mouse Move Effect ---
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- Effects ---
  useEffect(() => {
    if (open && initialMessage) {
      setMessage(initialMessage);
    }
  }, [open, initialMessage]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // --- Handlers ---
  const handleChat = async () => {
    const originalText = localStorage.getItem("originalText");
    let sessionId = localStorage.getItem("sessionId");

    if (!message || !originalText) return;

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("sessionId", sessionId);
    }

    try {
      setLoading(true);
      const res = await axios.post(
  `${BASE_URL}`,
  { message, originalText, sessionId }
);
      
      setChatHistory((prev) => [
        ...prev,
        { sender: "User", text: message },
        { sender: "AI", text: res.data.response },
      ]);
      setMessage("");
    } catch (error) {
      console.error("Chat failed:", error);
      setChatHistory((prev) => [
        ...prev,
        { sender: "AI", text: "Error: Failed to connect to the neural network." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !loading) handleChat();
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", md: "500px" },
            height: { xs: "90vh", md: "80vh" },
            bgcolor: palette.surface,
            backdropFilter: "blur(20px)",
            border: `1px solid ${palette.border}`,
            boxShadow: `0 0 40px ${palette.glow}`,
            borderRadius: "24px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            color: palette.textPrimary,
            cursor: "none",
            fontFamily: '"Poppins", sans-serif',
          }}
        >
          {/* Custom Cursor */}
          <Box
            sx={{
              position: "fixed",
              left: mousePos.x,
              top: mousePos.y,
              width: "300px",
              height: "300px",
              background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 2000,
              mixBlendMode: "screen",
            }}
          />

          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2.5,
              borderBottom: `1px solid ${palette.border}`,
              background: "rgba(0,0,0,0.2)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  background: `linear-gradient(135deg, ${palette.accent}, ${palette.secondary})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 15px ${palette.accent}`,
                }}
              >
                <SmartToy sx={{ color: palette.background }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: `linear-gradient(90deg, ${palette.textPrimary}, ${palette.accent})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Neural Interface
              </Typography>
            </Box>
            <IconButton onClick={onClose} sx={{ color: palette.textSecondary, "&:hover": { color: palette.accent } }}>
              <Close />
            </IconButton>
          </Box>

          {/* Chat History */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-thumb": { background: palette.border, borderRadius: "3px" },
            }}
          >
            {chatHistory.length === 0 && (
              <Box sx={{ textAlign: "center", mt: 4, opacity: 0.5 }}>
                <Typography variant="body2" sx={{ color: palette.textSecondary }}>
                  System Ready. Awaiting Input...
                </Typography>
              </Box>
            )}
            {chatHistory.map((chat, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf: chat.sender === "User" ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                    flexDirection: chat.sender === "User" ? "row-reverse" : "row",
                  }}
                >
                  <Typography variant="caption" sx={{ color: palette.textSecondary, fontWeight: 600 }}>
                    {chat.sender === "User" ? "You" : "AI"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: chat.sender === "User" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                    bgcolor: chat.sender === "User" ? palette.secondary : "rgba(255,255,255,0.05)",
                    border: chat.sender === "AI" ? `1px solid ${palette.border}` : "1px solid transparent",
                    color: palette.textPrimary,
                    boxShadow: chat.sender === "User" ? `0 0 15px rgba(168, 85, 247, 0.3)` : "none",
                    font: "inherit",
                    fontSize: "0.9rem",
                  }}
                >
                  {chat.text}
                </Box>
              </Box>
            ))}
            <div ref={chatEndRef} />
          </Box>

          {/* Input Area */}
          <Box
            sx={{
              p: 2,
              borderTop: `1px solid ${palette.border}`,
              background: "rgba(0,0,0,0.2)",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter query..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.03)",
                    fieldset: { borderColor: palette.border },
                    "&:hover fieldset": { borderColor: palette.accent },
                    "&.Mui-focused fieldset": { borderColor: palette.accent, boxShadow: `0 0 10px ${palette.glow}` },
                  },
                  input: { color: palette.textPrimary, py: 1.5 },
                }}
                InputProps={{
                  style: { padding: "0 14px" }
                }}
              />
              <Button
                variant="contained"
                onClick={handleChat}
                disabled={loading || !message}
                sx={{
                  minWidth: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  background: `linear-gradient(135deg, ${palette.secondary}, ${palette.accent})`,
                  boxShadow: `0 0 15px ${palette.glow}`,
                  "&:hover": {
                    boxShadow: `0 0 20px ${palette.accent}`,
                    transform: "scale(1.05)",
                  },
                  "&:disabled": {
                    background: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.3)",
                  },
                }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: palette.textPrimary }} /> : <Send sx={{ color: palette.background }} />}
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ChatModal;