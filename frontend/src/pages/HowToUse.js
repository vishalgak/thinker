import React, { useEffect, useState } from "react";
import BASE_URL from "../config/api";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import { keyframes } from "@emotion/react";
import {
  CloudUpload,
  AutoAwesome,
  Insights,
  Forum,
  Chat,
  FormatListBulleted,
  Language,
  FactCheck,
  TipsAndUpdates,
  Tune,
  ManageAccounts,
  Search,
  RecordVoiceOver,
  Settings,
  Description,
} from "@mui/icons-material";

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

const slideUp = keyframes`
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const HowToUse = ({ theme }) => {
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
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    accent: "#00e0ff", // Neon Cyan
    secondary: "#a855f7", // Neon Purple
    border: "rgba(0, 224, 255, 0.15)",
    glow: "rgba(0, 224, 255, 0.4)",
  };

  // --- Glass Card Style ---
  const glassCardSx = {
    background: palette.surface,
    backdropFilter: "blur(20px)",
    border: `1px solid ${palette.border}`,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    borderRadius: "20px",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    "&:hover": {
      border: `1px solid ${palette.accent}`,
      boxShadow: `0 15px 40px rgba(0, 0, 0, 0.6), 0 0 25px ${palette.glow}`,
      transform: "translateY(-5px)",
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

  const stepsData = [
    {
      step: 1,
      title: "Upload a Document",
      description:
        "Drag & drop your document or select from your device. We support PDF, DOCX, and DOC files. You can also import directly from Google Drive.",
      icon: <CloudUpload />,
    },
    {
      step: 2,
      title: "View Document Summary",
      description:
        "Instantly receive a concise summary of your document. View the original text on the left and the AI-generated summary on the right.",
      icon: <AutoAwesome />,
    },
    {
      step: 3,
      title: "Generate Key Ideas",
      description:
        "Let the AI extract the most important concepts and ideas from the text to help you grasp the core message quickly.",
      icon: <Insights />,
    },
    {
      step: 4,
      title: "Discussion Points",
      description:
        "Generate talking points for group discussions, debates, or further analysis. Perfect for students and teams.",
      icon: <Forum />,
    },
    {
      step: 5,
      title: "Chat with AI",
      description:
        "Ask specific questions about the document. Our AI uses the document context to provide tailored, accurate answers.",
      icon: <Chat />,
    },
    {
      step: 6,
      title: "Bullet-Point Summary",
      description:
        "Get a skimmable list of bullet points summarizing the document. Ideal for creating quick notes or study guides.",
      icon: <FormatListBulleted />,
    },
    {
      step: 7,
      title: "Customize Language",
      description:
        "Translate the summary into your preferred language. Great for multilingual users or sharing insights globally.",
      icon: <Language />,
    },
    {
      step: 8,
      title: "Sentiment Analysis",
      description:
        "Analyze the emotional tone of the document. Understand whether the context is positive, negative, or neutral.",
      icon: <FactCheck />,
    },
    {
      step: 9,
      title: "Actionable Recommendations",
      description:
        "Receive AI-driven suggestions on next steps or improvements based on the document content.",
      icon: <TipsAndUpdates />,
    },
    {
      step: 10,
      title: "Rewrite Content",
      description:
        "Change the tone or style of the document instantly. Specify your desired output, and the AI handles the rest.",
      icon: <Tune />,
    },
    {
      step: 11,
      title: "Create Account",
      description:
        "Register to save your documents, access them later, and enjoy higher upload limits. Your data, always secure.",
      icon: <ManageAccounts />,
    },
    {
      step: 12,
      title: "Document Search",
      description:
        "Quickly find specific documents using title or content search. Available for registered users to manage their library.",
      icon: <Search />,
    },
    {
      step: 13,
      title: "Voice Chat",
      description:
        "Interact using your voice. Upload audio or record directly to ask questions and receive voice responses.",
      icon: <RecordVoiceOver />,
    },
    {
      step: 14,
      title: "Manage Profile",
      description:
        "Update your info, change your email, or manage social accounts from the Profile page. Full control at your fingertips.",
      icon: <Settings />,
    },
  ];

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
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Background Orbs */}
      <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
        <Box sx={{ position: "absolute", top: "10%", left: "10%", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, ${palette.accent} 0%, transparent 70%)`, opacity: 0.1, filter: "blur(80px)", animation: `${float} 15s ease-in-out infinite` }} />
        <Box sx={{ position: "absolute", bottom: "20%", right: "10%", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, ${palette.secondary} 0%, transparent 70%)`, opacity: 0.1, filter: "blur(80px)", animation: `${float} 20s ease-in-out infinite reverse` }} />
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, py: 10 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <Chip
            label="USER MANUAL"
            sx={{
              mb: 3,
              fontWeight: 600,
              background: "rgba(0,0,0,0.3)",
              border: `1px solid ${palette.accent}`,
              color: palette.accent,
              boxShadow: `0 0 15px ${palette.glow}`,
              letterSpacing: "2px",
              fontSize: "0.75rem",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              lineHeight: 1.2,
              background: `linear-gradient(135deg, ${palette.textPrimary} 0%, ${palette.accent} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            How to Use DocuThinker
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: palette.textSecondary,
              maxWidth: "700px",
              mx: "auto",
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Master your documents in minutes. Follow this guide to unlock the full potential of AI-powered analysis.
          </Typography>
        </Box>

        {/* Steps Grid */}
        <Grid container spacing={4}>
          {stepsData.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.step}>
              <Card sx={glassCardSx}>
                <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `linear-gradient(135deg, rgba(0,224,255,0.2), rgba(168,85,247,0.2))`,
                        border: `1px solid ${palette.border}`,
                        color: palette.accent,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 900,
                        color: "rgba(255,255,255,0.05)",
                        fontSize: "3rem",
                        lineHeight: 1,
                      }}
                    >
                      {String(item.step).padStart(2, '0')}
                    </Typography>
                  </Stack>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: palette.textPrimary, mb: 1.5, lineHeight: 1.3 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: palette.textSecondary, lineHeight: 1.7, flexGrow: 1 }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Supported Formats Section */}
        <Box sx={{ mt: 10, textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: palette.textPrimary, mb: 4 }}>
            Supported Formats
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap>
            {["PDF Files", "DOCX Files", "DOC Files (Word 97-2003)"].map((format) => (
              <Chip
                key={format}
                icon={<Description sx={{ color: `${palette.accent} !important` }} />}
                label={format}
                sx={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${palette.border}`,
                  color: palette.textPrimary,
                  fontWeight: 600,
                  fontSize: "1rem",
                  py: 2.5,
                  px: 1,
                  "&:hover": {
                    background: "rgba(0, 224, 255, 0.1)",
                    borderColor: palette.accent,
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        {/* Footer Signature */}
        <Box
          sx={{
            mt: 10,
            textAlign: "center",
            py: 4,
            borderTop: `1px solid rgba(255,255,255,0.1)`,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: palette.textSecondary,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            Made with{" "}
            <Box component="span" sx={{ color: "#ef4444" }}>
              ❤️
            </Box>{" "}
            by{" "}
            <a
              href="https://sonnguyenhoang.com"
              style={{
                color: palette.accent,
                textDecoration: "none",
                fontWeight: 700,
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.textShadow = `0 0 10px ${palette.accent}`)}
              onMouseOut={(e) => (e.target.style.textShadow = "none")}
            >
              Vishal Kumar
            </a>{" "}
            in 2026.
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)", mt: 1, display: "block" }}>
            Thank you for visiting DocuThinker! 🚀
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HowToUse;