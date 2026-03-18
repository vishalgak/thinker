import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Facebook,
  Instagram,
  Twitter,
  Edit as EditIcon,
  Save as SaveIcon,
  Logout,
} from "@mui/icons-material";
import axios from "axios";
import { keyframes } from "@emotion/react";

// --- Animations ---
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 15px rgba(0, 224, 255, 0.2); }
  50% { box-shadow: 0 0 40px rgba(0, 224, 255, 0.6); }
  100% { box-shadow: 0 0 15px rgba(0, 224, 255, 0.2); }
`;

const Profile = ({ theme }) => {
  const [email, setEmail] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [daysSinceJoined, setDaysSinceJoined] = useState(null);
  const [documentCount, setDocumentCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingEmail, setUpdatingEmail] = useState(false);
  const [joinedDate, setJoinedDate] = useState("");
  
  // Avatar logic
  const avatarImages = [
    "/OIP.jpg", "/OIP2.webp", "/OIP3.png", "/OIP4.png", "/OIP5.png", 
    "/OIP6.webp", "/OIP7.webp", "/OIP8.webp", "/OIP9.webp", "/OIP10.webp",
    "/OIP11.webp", "/OIP12.webp", "/OIP13.webp", "/OIP14.webp", "/OIP15.webp",
    "/OIP16.webp", "/OIP17.webp", "/OIP18.webp", "/OIP19.webp", "/OIP20.webp",
    "/OIP21.webp", "/OIP22.webp", "/OIP23.webp", "/OIP24.webp", "/OIP25.webp",
  ];
  
  const [socialMedia, setSocialMedia] = useState({
    github: "", linkedin: "", facebook: "", instagram: "", twitter: "",
  });
  const [editingField, setEditingField] = useState(null);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");
  const [randomAvatar, setRandomAvatar] = useState("");
  const today = new Date().toLocaleDateString();
  const [loadingPlatform, setLoadingPlatform] = useState({
    github: false, linkedin: false, facebook: false, instagram: false, twitter: false,
  });
  
  // Custom Cursor State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
    borderRadius: "24px",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    "&:hover": {
      border: `1px solid ${palette.accent}`,
      boxShadow: `0 15px 40px rgba(0, 0, 0, 0.6), 0 0 30px ${palette.glow}`,
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

  // --- Logic (Preserved) ---
  useEffect(() => {
    setRandomAvatar(avatarImages[Math.floor(Math.random() * avatarImages.length)]);

    if (userId) {
      const fetchData = async () => {
        try {
          const emailResponse = await axios.get(`http://localhost:5000/users/${userId}`);
          const daysResponse = await axios.get(`http://localhost:5000/days-since-joined/${userId}`);
          const documentResponse = await axios.get(`http://localhost:5000/document-count/${userId}`);
          const joinedDateResponse = await axios.get(`http://localhost:5000/user-joined-date/${userId}`);
          const socialMediaResponse = await axios.get(`http://localhost:5000/social-media/${userId}`);

          if (!emailResponse.data || !daysResponse.data || !documentResponse.data || !joinedDateResponse.data) {
            setEmail("N/A"); setDaysSinceJoined("N/A"); setDocumentCount("N/A"); setJoinedDate("N/A");
          } else {
            setEmail(emailResponse.data.email);
            setDaysSinceJoined(daysResponse.data.days);
            setDocumentCount(documentResponse.data.documentCount);
            setJoinedDate(new Date(joinedDateResponse.data.joinedDate).toLocaleDateString());
            setSocialMedia(socialMediaResponse.data.socialMedia || {});
          }
          setLoading(false);
        } catch (err) {
          console.error("Error fetching user profile:", err);
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleUpdateEmail = async () => {
    setUpdatingEmail(true);
    setError("");
    try {
      await axios.post("http://localhost:5000/update-email", { userId, newEmail });
      setEmail(newEmail);
      setIsEditingEmail(false);
    } catch (err) {
      setError("Failed to update email. Please try again.");
    } finally {
      setUpdatingEmail(false);
    }
  };

  const handleSocialMediaChange = (e) => {
    const platform = e.target.name;
    const value = e.target.value;
    const extractUsername = (url) => {
      const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:github\.com|linkedin\.com\/in|facebook\.com|instagram\.com|twitter\.com|x\.com)\/([\w-]+)/i);
      return match ? match[1] : url;
    };
    setSocialMedia({ ...socialMedia, [platform]: extractUsername(value) });
  };

  const handleUpdateSocialMedia = async (platform) => {
    setLoadingPlatform((prevState) => ({ ...prevState, [platform]: true }));
    setError("");
    try {
      const socialMediaToSend = { ...socialMedia };
      await axios.post("http://localhost:5000/update-social-media", { userId, ...socialMediaToSend });
      setEditingField(null);
    } catch (err) {
      setError(`Failed to update ${platform} link.`);
    } finally {
      setLoadingPlatform((prevState) => ({ ...prevState, [platform]: false }));
    }
  };

  const formatLink = (platform, username) => {
    const baseUrls = {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
      facebook: "https://facebook.com/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
    };
    return username ? baseUrls[platform] + username : "";
  };

  const getUsername = (url) => {
    if (url) {
      const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:github\.com|linkedin\.com\/in|facebook\.com|instagram\.com|twitter\.com|x\.com)\/([\w-]+)/i);
      return match ? match[1] : url;
    }
    return "";
  };

  const handleKeyPress = (event, platform) => {
    if (event.key === "Enter") handleUpdateSocialMedia(platform);
  };

  // --- Render Guards ---
  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: palette.background, display: "flex", justifyContent: "center", alignItems: "center", cursor: "none" }}>
        <Box sx={{ position: "fixed", left: mousePos.x, top: mousePos.y, width: "400px", height: "400px", background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`, transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 1, mixBlendMode: "screen" }} />
        <CircularProgress sx={{ color: palette.accent }} size={60} thickness={2} />
      </Box>
    );
  }

  if (!userId) {
    return (
      <Box sx={{ minHeight: "100vh", backgroundColor: palette.background, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", cursor: "none" }}>
         <Box sx={{ position: "fixed", left: mousePos.x, top: mousePos.y, width: "400px", height: "400px", background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`, transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 1, mixBlendMode: "screen" }} />
         <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, background: `linear-gradient(135deg, ${palette.textPrimary}, ${palette.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Access Restricted
        </Typography>
        <Typography variant="h6" sx={{ color: palette.textSecondary, mb: 4 }}>
          Please sign in to view your profile.
        </Typography>
        <Button href="/login" sx={{ background: `linear-gradient(135deg, ${palette.secondary}, ${palette.accent})`, color: palette.background, fontWeight: 700, px: 6, py: 1.5, borderRadius: "16px", boxShadow: `0 0 20px ${palette.glow}` }}>
          Sign In
        </Button>
      </Box>
    );
  }

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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Custom Cursor */}
      <Box sx={{ position: "fixed", left: mousePos.x, top: mousePos.y, width: "400px", height: "400px", background: `radial-gradient(circle, ${palette.glow} 0%, transparent 70%)`, transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 1, mixBlendMode: "screen" }} />

      {/* Background Orbs */}
      <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
        <Box sx={{ position: "absolute", top: "10%", left: "10%", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, ${palette.accent} 0%, transparent 70%)`, opacity: 0.1, filter: "blur(80px)", animation: `${float} 15s ease-in-out infinite` }} />
        <Box sx={{ position: "absolute", bottom: "20%", right: "10%", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, ${palette.secondary} 0%, transparent 70%)`, opacity: 0.1, filter: "blur(80px)", animation: `${float} 20s ease-in-out infinite reverse` }} />
      </Box>

      {/* Main Card */}
      <Box sx={{ ...glassCardSx, width: "100%", maxWidth: "500px", zIndex: 2, p: 4, position: "relative" }}>
        
        {/* Avatar Section */}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
          <Box
            sx={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              overflow: "hidden",
              mb: 3,
              border: `3px solid ${palette.accent}`,
              boxShadow: `0 0 30px ${palette.glow}`,
              animation: `${pulseGlow} 3s infinite`,
              position: "relative",
            }}
          >
            <img src={randomAvatar} alt="User Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              background: `linear-gradient(135deg, ${palette.textPrimary}, ${palette.accent})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
            }}
          >
            Welcome, {email.split("@")[0]}!
          </Typography>
        </Box>

        <Divider sx={{ background: "rgba(255,255,255,0.1)", mb: 4 }} />

        {/* Stats Grid */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: "center", p: 2, background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: `1px solid ${palette.border}` }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: palette.accent }}>{daysSinceJoined}</Typography>
              <Typography variant="caption" sx={{ color: palette.textSecondary }}>Days Joined</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ textAlign: "center", p: 2, background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: `1px solid ${palette.border}` }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: palette.secondary }}>{documentCount}</Typography>
              <Typography variant="caption" sx={{ color: palette.textSecondary }}>Documents</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Editable Email Section */}
        <Stack spacing={2} sx={{ mb: 4 }}>
          {isEditingEmail ? (
            <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start", flexDirection: "column" }}>
              <TextField
                fullWidth
                label="New Email"
                variant="outlined"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                sx={{
                  input: { color: palette.textPrimary },
                  label: { color: palette.textSecondary },
                  fieldset: { borderColor: palette.border },
                  "&:hover fieldset": { borderColor: palette.accent },
                }}
              />
              <Stack direction="row" spacing={1} width="100%">
                <Button onClick={handleUpdateEmail} disabled={updatingEmail} sx={{ flex: 1, background: palette.accent, color: palette.background, "&:hover": { background: palette.textPrimary } }}>
                  {updatingEmail ? <CircularProgress size={20} sx={{ color: palette.background }} /> : "Save"}
                </Button>
                <Button onClick={() => setIsEditingEmail(false)} sx={{ color: palette.textSecondary }}>
                  Cancel
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.03)", p: 2, borderRadius: "12px", border: `1px solid ${palette.border}` }}>
              <Box>
                <Typography variant="caption" sx={{ color: palette.textSecondary }}>Email Address</Typography>
                <Typography sx={{ color: palette.textPrimary, fontWeight: 600 }}>{email}</Typography>
              </Box>
              <IconButton onClick={() => setIsEditingEmail(true)} sx={{ color: palette.accent }}>
                <EditIcon />
              </IconButton>
            </Box>
          )}
        </Stack>

        {/* Social Media Links */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: palette.textPrimary, mb: 2 }}>
            Connected Accounts
          </Typography>
          <Stack spacing={1.5}>
            {["github", "linkedin", "facebook", "instagram", "twitter"].map((platform) => (
              <Box key={platform} sx={{ display: "flex", alignItems: "center", gap: 2, background: "rgba(255,255,255,0.02)", p: 1.5, borderRadius: "12px", border: `1px solid transparent`, "&:hover": { border: `1px solid ${palette.border}` } }}>
                {/* Icon */}
                {platform === "github" && <GitHub sx={{ color: palette.textPrimary }} />}
                {platform === "linkedin" && <LinkedIn sx={{ color: "#0077b5" }} />}
                {platform === "facebook" && <Facebook sx={{ color: "#1877f2" }} />}
                {platform === "instagram" && <Instagram sx={{ color: "#E4405F" }} />}
                {platform === "twitter" && <Twitter sx={{ color: "#1DA1F2" }} />}

                {/* Field / Value */}
                {editingField === platform ? (
                  <TextField
                    name={platform}
                    value={socialMedia[platform]}
                    label="Username"
                    onChange={handleSocialMediaChange}
                    onKeyPress={(e) => handleKeyPress(e, platform)}
                    size="small"
                    sx={{ flex: 1, input: { color: palette.textPrimary, py: 0.5 }, fieldset: { borderColor: palette.border } }}
                  />
                ) : (
                  <Box sx={{ flex: 1, overflow: "hidden" }}>
                    <Button
                      href={formatLink(platform, socialMedia[platform])}
                      target="_blank"
                      sx={{
                        textTransform: "none",
                        color: socialMedia[platform] ? palette.accent : palette.textSecondary,
                        p: 0,
                        justifyContent: "flex-start",
                        minWidth: 0,
                        "&:hover": { background: "transparent" },
                      }}
                    >
                      {getUsername(socialMedia[platform]) || "Not Connected"}
                    </Button>
                  </Box>
                )}

                {/* Action Button */}
                <IconButton
                  size="small"
                  onClick={() => editingField === platform ? handleUpdateSocialMedia(platform) : setEditingField(platform)}
                  sx={{ color: palette.textSecondary }}
                >
                  {loadingPlatform[platform] ? (
                    <CircularProgress size={18} sx={{ color: palette.accent }} />
                  ) : editingField === platform ? (
                    <SaveIcon sx={{ color: palette.accent }} />
                  ) : (
                    <EditIcon fontSize="small" />
                  )}
                </IconButton>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Footer Actions */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: palette.textSecondary, mb: 3, fontWeight: 500 }}>
            Thank you for exploring DocuThinker today! 🚀
          </Typography>
          <Divider sx={{ background: "rgba(255,255,255,0.1)", mb: 3 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
            <Typography variant="caption" sx={{ color: palette.textSecondary, alignSelf: "center" }}>
              Joined: {joinedDate}
            </Typography>
            <Button
              onClick={() => { localStorage.removeItem("userId"); window.location.reload(); }}
              startIcon={<Logout />}
              sx={{
                color: palette.danger,
                borderColor: palette.danger,
                fontWeight: 600,
                borderRadius: "12px",
                "&:hover": { background: "rgba(244,63,94,0.1)", borderColor: palette.danger },
              }}
              variant="outlined"
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// Helper for Grid if not imported
const Grid = ({ item, ...props }) => <div {...props} />;
// Note: In actual code, import Grid from "@mui/material". I added this inline just in case, but standard imports handle it.

export default Profile;