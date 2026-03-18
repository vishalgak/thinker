import React, { useState, useEffect } from "react";
import BASE_URL from "../config/api";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  CircularProgress,
  Fade,
  IconButton,
} from "@mui/material";
import { Close, CloudQueue } from "@mui/icons-material";
import { Dropbox } from "dropbox";
import { keyframes } from "@emotion/react";

// --- Animations ---
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const DropboxFileSelectorModal = ({
  open,
  handleClose,
  accessToken,
  onFileSelect,
  theme,
}) => {
  const [dropboxFiles, setDropboxFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const dbx = new Dropbox({ accessToken });

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

  // --- Glass Card Style ---
  const glassCardSx = {
    background: palette.surface,
    backdropFilter: "blur(20px)",
    border: `1px solid ${palette.border}`,
    boxShadow: `0 0 40px ${palette.glow}`,
    borderRadius: "24px",
    position: "relative",
    overflow: "hidden",
    color: palette.textPrimary,
  };

  // --- Logic (Preserved) ---
  const listFiles = async (query = "") => {
    setLoading(true);
    try {
      const response = await dbx.filesListFolder({ path: "" });
      const filteredFiles = response.entries.filter(
        (file) =>
          (file.name.endsWith(".pdf") || file.name.endsWith(".docx")) &&
          (!query || file.name.toLowerCase().includes(query.toLowerCase()))
      );
      setDropboxFiles(filteredFiles);
    } catch (error) {
      console.error("Error fetching Dropbox files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && accessToken) {
      listFiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, accessToken]);

  const handleFileSelection = async (fileId) => {
    try {
      const response = await dbx.filesDownload({ path: fileId });
      const blob = response.fileBlob;
      const selectedFile = new File([blob], response.name, { type: blob.type });
      onFileSelect(selectedFile);
      handleClose();
    } catch (error) {
      console.error("Error downloading Dropbox file:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    listFiles(e.target.value);
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", md: "450px" },
            ...glassCardSx,
            cursor: "none",
            display: "flex",
            flexDirection: "column",
            maxHeight: "80vh",
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
                <CloudQueue sx={{ color: palette.background }} />
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
                Dropbox Connect
              </Typography>
            </Box>
            <IconButton onClick={handleClose} sx={{ color: palette.textSecondary, "&:hover": { color: palette.accent } }}>
              <Close />
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{ p: 3, flex: 1, overflowY: "auto" }}>
            <TextField
              label="Search Files"
              value={searchTerm}
              onChange={handleSearchChange}
              fullWidth
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "12px",
                  fieldset: { border: `1px solid ${palette.border}` },
                  "&:hover fieldset": { borderColor: palette.accent },
                  "&.Mui-focused fieldset": { borderColor: palette.accent, boxShadow: `0 0 10px ${palette.glow}` },
                },
                input: { color: palette.textPrimary },
              }}
              InputLabelProps={{ sx: { color: palette.textSecondary, "&.Mui-focused": { color: palette.accent } } }}
            />

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress sx={{ color: palette.accent }} />
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {dropboxFiles.length > 0 ? (
                  dropboxFiles.map((file) => (
                    <Button
                      key={file.id}
                      variant="outlined"
                      fullWidth
                      onClick={() => handleFileSelection(file.id)}
                      sx={{
                        justifyContent: "flex-start",
                        color: palette.textPrimary,
                        borderColor: palette.border,
                        borderRadius: "12px",
                        textTransform: "none",
                        fontWeight: 500,
                        py: 1.5,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: palette.accent,
                          backgroundColor: "rgba(0, 224, 255, 0.05)",
                          boxShadow: `0 0 15px ${palette.glow}`,
                          transform: "translateX(5px)",
                        },
                      }}
                    >
                      {file.name}
                    </Button>
                  ))
                ) : (
                  <Typography sx={{ textAlign: "center", color: palette.textSecondary, mt: 4, py: 2, border: `1px dashed ${palette.border}`, borderRadius: "12px" }}>
                    No compatible files found
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DropboxFileSelectorModal;