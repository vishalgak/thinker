import React, { useState, useEffect } from "react";
import BASE_URL from "../config/api";
import { Box, Typography, Container, Divider, Chip, Stack } from "@mui/material";
import { keyframes } from "@emotion/react";

// --- Animations ---
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const PrivacyPolicy = ({ theme }) => {
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
    background: "#030712",
    surface: "rgba(15, 23, 42, 0.6)",
    textPrimary: "#f8fafc",
    textSecondary: "#94a3b8",
    accent: "#00e0ff",
    secondary: "#a855f7",
    border: "rgba(0, 224, 255, 0.15)",
    glow: "rgba(0, 224, 255, 0.4)",
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

  // Section Data
  const sections = [
    {
      title: "1. Introduction",
      content: `Welcome to DocuThinker App. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services. Your privacy is important to us, and we are committed to ensuring that your personal information is handled securely and responsibly.`,
    },
    {
      title: "2. Information We Collect",
      listItems: [
        "Your uploaded documents (PDF or DOCX files) - we will only process them to provide our services. We may store them securely in our databases so that signed in users can access them later. We do not share your documents with third parties and do not store documents of users who are not signed in.",
        "Usage data (IP address, browser type, time spent on site, etc.) - This information is collected by Google Analytics and helps us understand how users interact with our website.",
        "Personal information (name, email address) - We collect this information when you sign up for an account. We use it to provide our services only.",
      ],
    },
    {
      title: "3. How We Use Your Information",
      listItems: [
        "Provide and operate our services.",
        "Improve, personalize, and expand our website and services.",
        "Communicate with you about updates, promotions, and changes to our services.",
        "Comply with legal obligations and ensure the security of our platform.",
      ],
    },
    {
      title: "4. How We Protect Your Data",
      content: `We implement various security measures to protect your personal information. These measures include secure data storage, encryption, and access controls. However, no data transmission over the internet is 100% secure, and we cannot guarantee the absolute security of your information.`,
    },
    {
      title: "5. Third-Party Services",
      content: `We may use third-party services (such as Google Drive and Dropbox) to facilitate file uploads and other services. These third parties may have their own privacy policies governing how they handle your data. We encourage you to review the privacy policies of any third-party services you use through our platform.`,
    },
    {
      title: "6. Your Data Rights",
      listItems: [
        "Access, update, or delete your personal information.",
        "Withdraw consent for data processing where consent was previously given.",
        "File a complaint with your local data protection authority if you believe your rights are violated. But, please try to reach out to us first so we can address your concerns.",
      ],
    },
    {
      title: "7. Changes to This Privacy Policy",
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any significant changes by posting the updated policy on our website.`,
    },
    {
      title: "8. Contact Us",
      content: `If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at:`,
      email: "vk1062480@gmail.com",
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
        py: 10,
      }}
    >
      {/* Custom Cursor */}
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

      {/* Background Orbs */}
      <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
        <Box sx={{ position: "absolute", top: "10%", left: "10%", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, ${palette.accent} 0%, transparent 70%)`, opacity: 0.1, filter: "blur(80px)", animation: `${float} 15s ease-in-out infinite` }} />
        <Box sx={{ position: "absolute", bottom: "20%", right: "10%", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle, ${palette.secondary} 0%, transparent 70%)`, opacity: 0.1, filter: "blur(80px)", animation: `${float} 20s ease-in-out infinite reverse` }} />
      </Box>

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        {/* Header Section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Chip
            label="SYSTEM PROTOCOL"
            sx={{
              mb: 2,
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
              background: `linear-gradient(135deg, ${palette.textPrimary} 0%, ${palette.accent} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            Privacy Policy
          </Typography>
          <Typography variant="body1" sx={{ color: palette.textSecondary, maxWidth: "600px", mx: "auto" }}>
            Your privacy is critical. This document outlines how we handle and protect your data within the DocuThinker ecosystem.
          </Typography>
        </Box>

        {/* Main Content Card */}
        <Box sx={{ ...glassCardSx, p: { xs: 3, md: 5 } }}>
          <Stack spacing={5}>
            {sections.map((section, index) => (
              <Box key={index}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: palette.accent,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    "&::before": {
                      content: '""',
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: palette.accent,
                      mr: 2,
                      boxShadow: `0 0 10px ${palette.accent}`,
                    },
                  }}
                >
                  {section.title}
                </Typography>

                {section.content && (
                  <Typography variant="body1" sx={{ color: palette.textSecondary, lineHeight: 1.8, pl: 4 }}>
                    {section.content}
                    {section.email && (
                      <Typography component="a" href={`mailto:${section.email}`} sx={{ color: palette.accent, textDecoration: "none", ml: 1, fontWeight: "bold", "&:hover": { textDecoration: "underline" } }}>
                        {section.email}
                      </Typography>
                    )}
                  </Typography>
                )}

                {section.listItems && (
                  <Box component="ul" sx={{ pl: 4, m: 0, listStyleType: "none" }}>
                    {section.listItems.map((item, i) => (
                      <Typography
                        component="li"
                        key={i}
                        variant="body1"
                        sx={{
                          color: palette.textSecondary,
                          lineHeight: 1.8,
                          mb: 1.5,
                          position: "relative",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            left: "-20px",
                            top: "10px",
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: palette.secondary,
                            boxShadow: `0 0 5px ${palette.secondary}`,
                          },
                        }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Box>
                )}
                {index < sections.length - 1 && <Divider sx={{ mt: 4, borderColor: "rgba(255,255,255,0.1)" }} />}
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />
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
        </Box>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;