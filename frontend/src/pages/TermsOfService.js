import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Divider, Chip, Stack } from "@mui/material";
import { keyframes } from "@emotion/react";

// --- Animations ---
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const TermsOfService = ({ theme }) => {
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
      title: "1. Acceptance of Terms",
      content: `By accessing and using DocuThinker, you agree to comply with and be bound by the following terms and conditions ("Terms of Service"). Please review these terms carefully. If you do not agree with these terms, you should not use this website.`,
    },
    {
      title: "2. Services Provided",
      content: `DocuThinker allows users to upload, analyze, and process documents to extract useful information and insights. We aim to provide a seamless and secure platform for document processing, but we cannot guarantee the absolute accuracy or completeness of our services.`,
    },
    {
      title: "3. User Responsibilities",
      content: `You agree to use DocuThinker in compliance with all applicable laws and regulations. You are responsible for the content of the documents you upload and must ensure that you have the necessary permissions or rights to use them. You agree not to use DocuThinker for any unlawful or prohibited activities.`,
    },
    {
      title: "4. Account Security",
      content: `You are responsible for maintaining the confidentiality of your account credentials, including your username and password. You agree to notify us immediately if you suspect any unauthorized use of your account or any other security breach.`,
    },
    {
      title: "5. Termination of Use",
      content: `We reserve the right to terminate or suspend your access to DocuThinker at any time, without notice, if we believe that you have violated these terms, misused our services, or engaged in any unlawful activities.`,
    },
    {
      title: "6. Intellectual Property",
      content: `All content, features, and functionality on DocuThinker, including text, graphics, logos, and software, are the exclusive property of DocuThinker or its licensors. You may not reproduce, modify, or distribute any part of this platform without our prior written consent.`,
    },
    {
      title: "7. Limitation of Liability",
      content: `DocuThinker will not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our platform. This includes any loss of data or damage to your device as a result of using our services.`,
    },
    {
      title: "8. Modifications to the Terms",
      content: `We reserve the right to modify these Terms of Service at any time. We will notify you of any significant changes by posting the updated terms on our website. Continued use of the platform after such changes constitutes your acceptance of the new terms.`,
    },
    {
      title: "9. Governing Law",
      content: `These Terms of Service are governed by and construed in accordance with the laws of your jurisdiction, without regard to its conflict of law provisions. You agree to submit to the exclusive jurisdiction of the courts in your country or region.`,
    },
    {
      title: "10. Contact Information",
      content: `If you have any questions about these Terms of Service, please contact us at:`,
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
            label="USER AGREEMENT"
            sx={{
              mb: 2,
              fontWeight: 600,
              background: "rgba(0,0,0,0.3)",
              border: `1px solid ${palette.secondary}`,
              color: palette.secondary,
              boxShadow: `0 0 15px rgba(168, 85, 247, 0.4)`,
              letterSpacing: "2px",
              fontSize: "0.75rem",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              background: `linear-gradient(135deg, ${palette.textPrimary} 0%, ${palette.secondary} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            Terms of Service
          </Typography>
          <Typography variant="body1" sx={{ color: palette.textSecondary, maxWidth: "600px", mx: "auto" }}>
            Please read these terms carefully before using the DocuThinker platform.
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
                    color: palette.secondary, // Using secondary (purple) for variety
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    "&::before": {
                      content: '""',
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: palette.secondary,
                      mr: 2,
                      boxShadow: `0 0 10px ${palette.secondary}`,
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

export default TermsOfService;