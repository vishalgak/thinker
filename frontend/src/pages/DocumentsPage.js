import React, { useEffect, useState } from "react";
import BASE_URL from "../config/api";
import Divider from '@mui/material/Divider';
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip,
  Stack,
  Fade,
} from "@mui/material";
import { Delete, Visibility, Edit, Save, Search, CloudUpload, Warning } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";

// --- Animations ---
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 15px rgba(0, 224, 255, 0.1); }
  50% { box-shadow: 0 0 30px rgba(0, 224, 255, 0.4); }
  100% { box-shadow: 0 0 15px rgba(0, 224, 255, 0.1); }
`;

const DocumentsPage = ({ theme }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingDocId, setEditingDocId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage] = useState(5);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [openDeleteAllDialog, setOpenDeleteAllDialog] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
    background: "#030712", // Deep black/blue
    surface: "rgba(15, 23, 42, 0.6)", // Glass
    surfaceHover: "rgba(30, 41, 59, 0.8)",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    accent: "#00e0ff", // Neon Cyan
    secondary: "#a855f7", // Neon Purple
    border: "rgba(0, 224, 255, 0.15)",
    glow: "rgba(0, 224, 255, 0.4)",
    danger: "#f43f5e",
  };

  // --- Glass Card Style ---
  const glassCardSx = {
    background: palette.surface,
    backdropFilter: "blur(20px)",
    border: `1px solid ${palette.border}`,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    borderRadius: "16px",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    "&:hover": {
      border: `1px solid ${palette.accent}`,
      boxShadow: `0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px ${palette.glow}`,
      transform: "translateY(-2px)",
    },
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

  // --- Logic (Preserved from original) ---
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        handleSearchChange();
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSearchChange = async () => {
    setSearchLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/search-documents/${userId}?searchTerm=${encodeURIComponent(searchTerm)}`
      );
      const results = Object.keys(response.data)
        .filter((key) => key !== "message")
        .map((key) => {
          const title = Array.isArray(response.data[key].title)
            ? response.data[key].title.join(" ")
            : response.data[key].title;
          return {
            docId: response.data[key].docId,
            title: title,
            snippet: response.data[key].snippet,
          };
        });
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching documents:", error);
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/documents/${userId}`);
        const documentsData = response.data;
        const documentsList = Object.keys(documentsData)
          .filter((key) => key !== "message")
          .map((key) => documentsData[key]);
        setDocuments(documentsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [userId]);

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(indexOfFirstDocument, indexOfLastDocument);

  const handleViewDocument = async (docId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/document-details/${userId}/${docId}`
      );
      const { summary, originalText } = response.data;
      navigate("/home", { state: { summary, originalText } });
    } catch (error) {
      console.error("Error viewing document:", error);
    }
  };

  const handleNewDocClick = () => navigate("/home");

  const handleDeleteDocument = async (docId) => {
    try {
      await axios.delete(`${BASE_URL}/documents/${userId}/${docId}`);
      setDocuments(documents.filter((doc) => doc.id !== docId));
      setSearchResults(searchResults.filter((doc) => doc.docId !== docId));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleConfirmDeleteAllDocuments = async () => {
    try {
      await axios.delete(`${BASE_URL}/documents/${userId}`);
      setDocuments([]);
      handleCloseDeleteAllDialog();
    } catch (error) {
      console.error("Error deleting all documents:", error);
      handleCloseDeleteAllDialog();
    }
  };

  const handleEditDocument = (docId, currentTitle) => {
    setEditingDocId(docId);
    setNewTitle(currentTitle);
  };

  const handleSaveTitle = async (docId) => {
    try {
      const currentDoc = documents.find((doc) => doc.id === docId || doc.docId === docId);
      if (currentDoc && currentDoc.title === newTitle) {
        setEditingDocId(null);
        setNewTitle("");
        return;
      }
      await axios.post(`${BASE_URL}/update-document-title`, {
        userId,
        docId,
        newTitle,
      });
      const updatedDocuments = documents.map((doc) =>
        doc.id === docId || doc.docId === docId ? { ...doc, title: newTitle } : doc
      );
      setDocuments(updatedDocuments);
      const updatedSearchResults = searchResults.map((doc) =>
        doc.docId === docId ? { ...doc, title: newTitle } : doc
      );
      setSearchResults(updatedSearchResults);
      setEditingDocId(null);
      setNewTitle("");
    } catch (error) {
      console.error("Error updating document title:", error);
    }
  };

  const handleKeyPress = (event, docId) => {
    if (event.key === "Enter") handleSaveTitle(docId);
  };

  const handlePageChange = (event, value) => setCurrentPage(value);

  const handleCloseDeleteAllDialog = () => setOpenDeleteAllDialog(false);

  // --- Render Guards ---
  if (!userId) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: palette.background,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: palette.textPrimary,
          cursor: "none",
          position: "relative",
        }}
      >
        {/* Cursor */}
        <Box sx={{ position: "fixed", left: mousePos.x, top: mousePos.y, width: "400px", height: "400px", background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`, transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 1, mixBlendMode: "screen" }} />
        
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, background: `linear-gradient(135deg, ${palette.textPrimary}, ${palette.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Access Restricted
        </Typography>
        <Typography variant="h6" sx={{ color: palette.textSecondary, mb: 4 }}>
          Please sign in to view your documents.
        </Typography>
        <Button
          href="/login"
          sx={{
            background: `linear-gradient(135deg, ${palette.accentDark}, ${palette.accent})`,
            color: palette.background,
            fontWeight: 700,
            px: 6,
            py: 1.5,
            borderRadius: "16px",
            boxShadow: `0 0 20px ${palette.glow}`,
            "&:hover": { boxShadow: `0 0 30px ${palette.glow}` },
          }}
        >
          Sign In
        </Button>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: palette.background, display: "flex", justifyContent: "center", alignItems: "center", cursor: "none" }}>
        <Box sx={{ position: "fixed", left: mousePos.x, top: mousePos.y, width: "400px", height: "400px", background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`, transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 1, mixBlendMode: "screen" }} />
        <CircularProgress sx={{ color: palette.accent }} size={60} thickness={2} />
      </Box>
    );
  }

  // --- Render Document Item (Reusable) ---
  const renderDocumentItem = (doc, isSearchResult = false) => {
    const docId = isSearchResult ? doc.docId : doc.id;
    const docTitle = doc.title;
    const docSnippet = doc.snippet;

    return (
      <Fade in key={docId}>
        <ListItem
          sx={{
            ...glassCardSx,
            mb: 2,
            p: 3,
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
            "@media (min-width:600px)": {
              flexDirection: "row",
              alignItems: "center",
            },
          }}
        >
          {editingDocId === docId ? (
            <TextField
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, docId)}
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                input: { color: palette.textPrimary, fontFamily: "Poppins" },
                fieldset: { borderColor: `${palette.accent} !important` },
              }}
              autoFocus
            />
          ) : (
            <ListItemText
              primary={
                <Typography variant="h6" sx={{ fontWeight: 700, color: palette.textPrimary, wordBreak: "break-word" }}>
                  {docTitle}
                </Typography>
              }
              secondary={
                docSnippet ? (
                  <Typography variant="body2" sx={{ color: palette.textSecondary, mt: 0.5 }} noWrap>
                    {docSnippet}
                  </Typography>
                ) : null
              }
            />
          )}
          <Stack direction="row" spacing={1}>
            {editingDocId === docId ? (
              <IconButton onClick={() => handleSaveTitle(docId)} sx={{ color: palette.accent, "&:hover": { background: "rgba(0,224,255,0.1)" } }}>
                <Save />
              </IconButton>
            ) : (
              <>
                <IconButton onClick={() => handleViewDocument(docId)} sx={{ color: palette.textPrimary, "&:hover": { color: palette.accent, transform: "scale(1.2)" }, transition: "all 0.2s" }}>
                  <Visibility />
                </IconButton>
                <IconButton onClick={() => handleEditDocument(docId, docTitle)} sx={{ color: palette.textPrimary, "&:hover": { color: palette.secondary, transform: "scale(1.2)" }, transition: "all 0.2s" }}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteDocument(docId)} sx={{ color: palette.danger, "&:hover": { background: "rgba(244,63,94,0.1)", transform: "scale(1.2)" }, transition: "all 0.2s" }}>
                  <Delete />
                </IconButton>
              </>
            )}
          </Stack>
        </ListItem>
      </Fade>
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: palette.background,
        color: palette.textPrimary,
        position: "relative",
        overflow: "hidden",
        fontFamily: '"Poppins", sans-serif',
        cursor: "none",
        pt: 10,
        pb: 10,
      }}
    >
      {/* Custom Cursor */}
      <Box sx={{ position: "fixed", left: mousePos.x, top: mousePos.y, width: "400px", height: "400px", background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`, transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 1, mixBlendMode: "screen" }} />

      {/* Background Elements */}
      <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
        <Box sx={{ position: "absolute", top: "10%", left: "10%", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, ${palette.accent} 0%, transparent 70%)`, opacity: 0.1, filter: "blur(80px)", animation: `${float} 15s ease-in-out infinite` }} />
        <Box sx={{ position: "absolute", bottom: "20%", right: "10%", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, ${palette.secondary} 0%, transparent 70%)`, opacity: 0.1, filter: "blur(80px)", animation: `${float} 20s ease-in-out infinite reverse` }} />
      </Box>

      <Box sx={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 2, px: 3 }}>
        {/* Header Section */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", mb: 6, gap: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.2, background: `linear-gradient(135deg, ${palette.textPrimary} 0%, ${palette.accent} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Document Vault
            </Typography>
            <Typography variant="body1" sx={{ color: palette.textSecondary, mt: 1 }}>
              Securely access and manage your analyzed files.
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box sx={{ position: "relative", width: { xs: "100%", md: "350px" } }}>
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              size="small"
              placeholder="Search documents..."
              sx={{
                width: "100%",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "12px",
                border: `1px solid ${palette.border}`,
                input: { color: palette.textPrimary, pl: 2 },
                fieldset: { border: "none" },
                "&:hover": { border: `1px solid ${palette.accent}` },
              }}
              InputProps={{
                startAdornment: <Search sx={{ color: palette.textSecondary, mr: 1 }} />,
              }}
            />
          </Box>
        </Box>

        {/* Search Results Section */}
        {searchLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress sx={{ color: palette.accent }} />
          </Box>
        ) : (
          searchTerm &&
          (searchResults.length === 0 ? (
            <Typography sx={{ textAlign: "center", color: palette.textSecondary, my: 4 }}>
              No results found for "{searchTerm}"
            </Typography>
          ) : (
            <Box sx={{ mb: 6 }}>
              <Chip label="Search Results" sx={{ mb: 2, background: "rgba(255,255,255,0.1)", color: palette.accent, border: `1px solid ${palette.accent}` }} />
              <List sx={{ p: 0 }}>{searchResults.slice(0, 5).map((doc) => renderDocumentItem(doc, true))}</List>
            </Box>
          ))
        )}

        {/* Divider */}
        {searchTerm && searchResults.length > 0 && <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />}

        {/* Document List Section */}
        {documents.length === 0 && !searchTerm ? (
          <Box sx={{ textAlign: "center", mt: 10 }}>
            <Box
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                mb: 4,
                borderRadius: "50%",
                background: `linear-gradient(135deg, rgba(0,224,255,0.1), rgba(168,85,247,0.1))`,
                border: `1px solid ${palette.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: `${float} 4s ease-in-out infinite`,
              }}
            >
              <CloudUpload sx={{ fontSize: 50, color: palette.accent }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: palette.textPrimary, mb: 2 }}>
              Vault Empty
            </Typography>
            <Typography sx={{ color: palette.textSecondary, mb: 4 }}>
              Upload your first document to get started.
            </Typography>
            <Button
              onClick={handleNewDocClick}
              sx={{
                background: `linear-gradient(135deg, ${palette.accentDark}, ${palette.accent})`,
                color: palette.background,
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: "12px",
                boxShadow: `0 0 15px ${palette.glow}`,
                "&:hover": { boxShadow: `0 0 25px ${palette.glow}` },
              }}
            >
              Upload Document
            </Button>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>{currentDocuments.map((doc) => renderDocumentItem(doc))}</List>
        )}

        {/* Pagination */}
        {documents.length > documentsPerPage && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Pagination
              count={Math.ceil(documents.length / documentsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: palette.textSecondary,
                  borderColor: palette.border,
                },
                "& .Mui-selected": {
                  background: `linear-gradient(135deg, ${palette.accentDark}, ${palette.accent})`,
                  color: palette.background,
                  fontWeight: "bold",
                  borderColor: palette.accent,
                },
              }}
            />
          </Box>
        )}

        {/* Action Buttons */}
        {documents.length > 0 && (
          <Box sx={{ mt: 6, display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              startIcon={<CloudUpload />}
              onClick={handleNewDocClick}
              sx={{
                borderColor: palette.accent,
                color: palette.accent,
                fontWeight: 600,
                px: 3,
                borderRadius: "12px",
                "&:hover": { background: "rgba(0,224,255,0.1)", borderColor: palette.accent },
              }}
            >
              Upload New
            </Button>
            <Button
              variant="outlined"
              startIcon={<Delete />}
              onClick={() => setOpenDeleteAllDialog(true)}
              sx={{
                borderColor: palette.danger,
                color: palette.danger,
                fontWeight: 600,
                px: 3,
                borderRadius: "12px",
                "&:hover": { background: "rgba(244,63,94,0.1)", borderColor: palette.danger },
              }}
            >
              Delete All
            </Button>
          </Box>
        )}
      </Box>

      {/* Delete All Dialog */}
      <Dialog
        open={openDeleteAllDialog}
        onClose={() => setOpenDeleteAllDialog(false)}
        PaperProps={{
          sx: {
            ...glassCardSx,
            border: `1px solid ${palette.danger}`,
            boxShadow: `0 0 30px rgba(244, 63, 94, 0.2)`,
            maxWidth: "400px",
          },
        }}
      >
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Warning sx={{ fontSize: 50, color: palette.danger, mb: 2 }} />
          <DialogTitle sx={{ color: palette.textPrimary, fontWeight: 800, fontSize: "1.5rem" }}>
            Confirm Delete All
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: palette.textSecondary, mb: 2 }}>
              Are you sure you want to permanently delete all your documents? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", gap: 2 }}>
            <Button
              onClick={() => setOpenDeleteAllDialog(false)}
              sx={{ color: palette.textSecondary, fontWeight: 600 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDeleteAllDocuments}
              sx={{
                background: palette.danger,
                color: "white",
                fontWeight: 600,
                px: 3,
                py: 1,
                borderRadius: "8px",
                "&:hover": { background: "#e11d48" },
              }}
            >
              Delete All
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DocumentsPage;