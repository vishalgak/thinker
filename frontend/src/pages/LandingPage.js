import React, { useEffect, useMemo, useRef, useState } from "react";
import BASE_URL from "../config/api";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider,
  IconButton,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import { keyframes } from "@emotion/react";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  ArrowDownward,
  AutoAwesome,
  Bolt,
  Chat,
  CloudUpload,
  FactCheck,
  FormatListBulleted,
  Insights,
  Language,
  Security,
  Timeline,
  Tune,
  RecordVoiceOver,
  VerifiedUser,
  CheckCircle,
  RemoveCircleOutline,
  Groups,
} from "@mui/icons-material";

// --- Animations ---
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const floatDelay = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-30px) rotate(-2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 20px rgba(0, 224, 255, 0.2); }
  50% { box-shadow: 0 0 40px rgba(0, 224, 255, 0.6); }
  100% { box-shadow: 0 0 20px rgba(0, 224, 255, 0.2); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const slideUp = keyframes`
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const LandingPage = () => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const clarityRef = useRef(null);

  // --- Mouse Move Effect for Custom Cursor ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    if (media.addEventListener) media.addEventListener("change", update);
    else media.addListener(update);
    return () => {
      if (media.removeEventListener) media.removeEventListener("change", update);
      else media.removeListener(update);
    };
  }, []);

  // --- Theme Palette (Cyberpunk Blue) ---
  const palette = useMemo(
    () => ({
      background: "#030712", // Deep black/blue
      backgroundAlt: "#0f172a",
      surface: "rgba(15, 23, 42, 0.6)", // Glass
      surfaceHover: "rgba(30, 41, 59, 0.8)",
      textPrimary: "#f8fafc",
      textSecondary: "#94a3b8",
      accent: "#00e0ff", // Neon Cyan
      accentDark: "#0284c7",
      secondary: "#a855f7", // Neon Purple
      border: "rgba(0, 224, 255, 0.15)",
      glow: "rgba(0, 224, 255, 0.4)",
    }),
    []
  );

  // --- Glass Card Style ---
  const glassCardSx = {
    background: palette.surface,
    backdropFilter: "blur(20px)",
    border: `1px solid ${palette.border}`,
    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255,255,255,0.05)`,
    borderRadius: "24px",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    "&:hover": {
      border: `1px solid ${palette.accent}`,
      boxShadow: `0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px ${palette.glow}`,
      transform: "translateY(-5px)",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "1px",
      background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
    },
  };

  // --- Data Arrays (Kept from original) ---
  const metrics = [
    { label: "Supported files", value: "PDF / DOCX" },
    { label: "Import option", value: "Google Drive" },
    { label: "Summary modes", value: "Standard + bullet" },
    { label: "Analysis tools", value: "Sentiment + stats" },
  ];

  const heroHighlights = [
    "PDF / DOCX upload",
    "Google Drive import",
    "AI summary",
    "Bullet summary",
    "Sentiment analysis",
    "Document analytics",
    "Chat with selected text",
    "Voice chat (audio)",
    "Rewrite content",
    "Translate summary",
  ];

  const spotlights = [
    {
      title: "Instant summaries",
      description: "Generate a clean summary and a bullet-point summary from any PDF or DOCX.",
      points: ["Standard summary", "Bullet-point summary", "Copy results quickly"],
      icon: <AutoAwesome />,
    },
    {
      title: "Document analysis",
      description: "Run sentiment analysis and view document analytics like word count and readability.",
      points: ["Sentiment score", "Readability stats", "Top terms + structure"],
      icon: <Insights />,
    },
    {
      title: "Ask, refine, rewrite",
      description: "Chat about the document, refine the summary, or rewrite selected text.",
      points: ["Chat with selected text", "Refine summary", "Rewrite content style"],
      icon: <Chat />,
    },
  ];

  const pillars = [
    { title: "Summaries that read cleanly", description: "Standard summaries plus bullet-point views in a consistent format.", icon: <Insights /> },
    { title: "Analysis in one view", description: "Sentiment analysis and document statistics alongside the summary.", icon: <Bolt /> },
    { title: "Refine and rewrite", description: "Refine summaries or rewrite selected text to a new style.", icon: <VerifiedUser /> },
  ];

  const features = [
    { title: "Upload PDF / DOCX", description: "Upload from your device or pick a file from Google Drive.", icon: <CloudUpload /> },
    { title: "AI summary", description: "Generate a clean, readable summary of your document.", icon: <AutoAwesome /> },
    { title: "Bullet-point summary", description: "Create a fast, skimmable bullet version on demand.", icon: <FormatListBulleted /> },
    { title: "Refine or rewrite", description: "Refine the summary or rewrite selected text in a new style.", icon: <Tune /> },
    { title: "Chat with your document", description: "Ask questions or chat about selected text.", icon: <Chat /> },
    { title: "Voice chat", description: "Upload or record audio to get a voice response.", icon: <RecordVoiceOver /> },
    { title: "Sentiment analysis", description: "View sentiment scores and descriptions for your document.", icon: <FactCheck /> },
    { title: "Document analytics", description: "See word counts, readability metrics, and key term stats.", icon: <Insights /> },
    { title: "Summary in another language", description: "Generate a summary in a language you select.", icon: <Language /> },
  ];

  const workflow = [
    { title: "Upload", description: "Upload PDF/DOCX from your device or import from Google Drive.", icon: <CloudUpload /> },
    { title: "Summarize", description: "Generate a standard summary or a bullet-point summary.", icon: <AutoAwesome /> },
    { title: "Analyze", description: "Run sentiment analysis, document analytics, or chat about selections.", icon: <Groups /> },
    { title: "Refine", description: "Refine the summary or rewrite selected text in a new style.", icon: <Bolt /> },
  ];

  const outcomes = [
    { title: "Clear summaries", description: "Readable summaries generated from your document text.", icon: <CheckCircle /> },
    { title: "Bullet-point view", description: "A skimmable bullet summary for quick review.", icon: <Groups /> },
    { title: "Analysis at a glance", description: "Sentiment scores and document analytics in one place.", icon: <Timeline /> },
    { title: "Flexible outputs", description: "Refine summaries, rewrite text, or translate to another language.", icon: <FactCheck /> },
  ];

  const useCases = [
    { title: "Summarize documents", description: "Generate a standard summary and a bullet-point summary.", icon: <AutoAwesome /> },
    { title: "Analyze tone + structure", description: "Run sentiment analysis and view document analytics.", icon: <Insights /> },
    { title: "Chat and voice", description: "Ask questions with text chat or upload/record audio.", icon: <RecordVoiceOver /> },
    { title: "Refine and rewrite", description: "Refine the summary or rewrite selected text to a new style.", icon: <Tune /> },
  ];

  const testimonials = [
    { title: "Summaries and bullet points", description: "Generate a standard summary and a bullet-point summary on demand." },
    { title: "Sentiment + analytics", description: "Review sentiment scores, readability, and document statistics." },
    { title: "Chat + voice interactions", description: "Ask about selected text or upload/record audio for voice responses." },
  ];

  const faqs = [
    { title: "What file types are supported?", description: "PDF and DOCX files are supported for document uploads." },
    { title: "Can I import from Google Drive?", description: "Yes. Use the Google Drive picker to select files (read-only access)." },
    { title: "Can I create bullet-point summaries?", description: "Yes. Generate a bullet-point summary in addition to the standard summary." },
    { title: "Does the app include sentiment analysis?", description: "Yes. Sentiment analysis is available in the summary workspace." },
    { title: "Can I translate a summary?", description: "Yes. Generate a summary in a selected language." },
    { title: "Does DocuThinker support voice interactions?", description: "Yes. Upload or record audio to receive a voice response." },
  ];

  const integrations = ["PDF", "DOCX", "Google Drive import", "Audio upload", "Audio recording"];

  // --- Auto-rotating Logic ---
  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = setInterval(() => setSpotlightIndex((prev) => (prev + 1) % spotlights.length), 6000);
    return () => clearInterval(timer);
  }, [reduceMotion, spotlights.length]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = setInterval(() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length), 6500);
    return () => clearInterval(timer);
  }, [reduceMotion, testimonials.length]);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const elements = Array.from(document.querySelectorAll(".reveal"));
    if (elements.length === 0) return undefined;
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: palette.background,
        color: palette.textPrimary,
        position: "relative",
        overflow: "hidden",
        fontFamily: '"Poppins", sans-serif',
        cursor: "none", // Hide default cursor
        "& *": { minWidth: 0, boxSizing: "border-box" },
        "& .reveal": {
          opacity: 0,
          transform: "translateY(40px)",
          transition: reduceMotion ? "none" : "opacity 0.8s ease, transform 0.8s ease",
        },
        "& .reveal.is-visible": {
          opacity: 1,
          transform: "translateY(0)",
        },
      }}
    >
      {/* Custom Cursor Glow Effect */}
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

      {/* Background Elements */}
      <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
        {/* Gradient Orbs */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${palette.accent} 0%, transparent 70%)`,
            opacity: 0.15,
            filter: "blur(80px)",
            animation: reduceMotion ? "none" : `${float} 15s ease-in-out infinite`,
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
            opacity: 0.15,
            filter: "blur(100px)",
            animation: reduceMotion ? "none" : `${floatDelay} 20s ease-in-out infinite`,
          }}
        />
        {/* Grid Lines */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(0, 224, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 224, 255, 0.03) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
            maskImage: "radial-gradient(circle at center, black 40%, transparent 100%)",
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, px: { xs: 2, sm: 3 } }}>
        {/* Hero Section */}
        <Box sx={{ minHeight: { xs: "auto", md: "100vh" }, display: "flex", flexDirection: "column", justifyContent: "center", py: { xs: 8, md: 0 }, pb: { xs: 8, md: 12 } }}>
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={7}>
              <Box className="reveal">
                <Chip
                  label="DocuThinker Platform"
                  sx={{
                    mb: 3,
                    fontWeight: 600,
                    background: `linear-gradient(135deg, rgba(0,224,255,0.2), rgba(168,85,247,0.2))`,
                    border: `1px solid ${palette.accent}`,
                    color: palette.textPrimary,
                    boxShadow: `0 0 15px ${palette.glow}`,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    fontSize: "0.75rem",
                  }}
                />
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: 800,
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                    lineHeight: 1.1,
                    mb: 3,
                    background: `linear-gradient(135deg, ${palette.textPrimary} 0%, ${palette.accent} 50%, ${palette.secondary} 100%)`,
                    backgroundSize: "200% 200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: reduceMotion ? "none" : `${gradientShift} 4s ease infinite`,
                  }}
                >
                  The Future of Document Intelligence.
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: palette.textSecondary,
                    maxWidth: "600px",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    mb: 4,
                    fontSize: { xs: "1.1rem", md: "1.3rem" },
                  }}
                >
                  Stop reading endless pages. Start understanding instantly. Transform documents into actionable insights with AI.
                </Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 5 }}>
                  <Button
                    component={Link}
                    to="/home"
                    variant="contained"
                    size="large"
                    sx={{
                      background: `linear-gradient(135deg, ${palette.accentDark}, ${palette.accent})`,
                      color: palette.background,
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      borderRadius: "16px",
                      border: `1px solid rgba(255,255,255,0.2)`,
                      boxShadow: `0 0 20px ${palette.glow}`,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: `0 0 30px ${palette.glow}`,
                        background: palette.accent,
                      },
                    }}
                  >
                    Launch App
                  </Button>
                  <Button
                    component={Link}
                    to="/how-to-use"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: palette.border,
                      color: palette.textPrimary,
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: "16px",
                      backdropFilter: "blur(10px)",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        borderColor: palette.accent,
                        background: "rgba(0, 224, 255, 0.1)",
                      },
                    }}
                  >
                    How it Works
                  </Button>
                </Stack>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                  {heroHighlights.map((label) => (
                    <Chip
                      key={label}
                      label={label}
                      sx={{
                        font: "inherit",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: palette.textSecondary,
                        "&:hover": {
                          background: "rgba(255,255,255,0.1)",
                          borderColor: palette.accent,
                          color: palette.textPrimary,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ position: "relative", animation: reduceMotion ? "none" : `${floatDelay} 6s ease-in-out infinite` }} className="reveal">
                {/* Floating Glass Card UI Preview */}
                <Box sx={{ ...glassCardSx, p: 3, maxWidth: "400px", ml: "auto" }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: palette.textPrimary }}>
                      Analysis Dashboard
                    </Typography>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: palette.accent, boxShadow: `0 0 10px ${palette.accent}` }} />
                  </Stack>
                  <Divider sx={{ background: "rgba(255,255,255,0.1)", mb: 2 }} />
                  {metrics.map((m) => (
                    <Box key={m.label} sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                      <Typography variant="body2" color="textSecondary">{m.label}</Typography>
                      <Typography variant="body2" fontWeight={700} sx={{ color: palette.accent }}>{m.value}</Typography>
                    </Box>
                  ))}
                  <Button fullWidth sx={{ mt: 2, color: palette.textPrimary, borderColor: palette.border, "&:hover": { borderColor: palette.accent } }} variant="outlined">
                    View Report
                  </Button>
                </Box>
                {/* Decorative Elements */}
                <Box sx={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "24px", background: `linear-gradient(135deg, ${palette.accent}, ${palette.secondary})`, opacity: 0.6, filter: "blur(30px)", zIndex: -1 }} />
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 6 }}>
             <IconButton
              onClick={() => clarityRef.current?.scrollIntoView({ behavior: "smooth" })}
              sx={{
                animation: reduceMotion ? "none" : `pulseGlow 2s infinite`,
                border: `1px solid ${palette.border}`,
                color: palette.textPrimary,
                '&:hover': { background: 'rgba(255,255,255,0.05)' }
              }}
            >
              <ArrowDownward />
            </IconButton>
          </Box>
        </Box>

        {/* Pillars Section */}
        <Box sx={{ mt: 10 }} ref={clarityRef}>
          <Typography variant="h3" sx={{ textAlign: "center", fontWeight: 800, mb: 6, color: palette.textPrimary }} className="reveal">
            Powered by Intelligence
          </Typography>
          <Grid container spacing={4}>
            {pillars.map((pillar, i) => (
              <Grid item xs={12} md={4} key={pillar.title}>
                <Card sx={glassCardSx} className="reveal">
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 3,
                        background: `linear-gradient(135deg, rgba(0,224,255,0.2), rgba(168,85,247,0.2))`,
                        border: `1px solid ${palette.border}`,
                        color: palette.accent,
                      }}
                    >
                      {pillar.icon}
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5, color: palette.textPrimary }}>
                      {pillar.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: palette.textSecondary, lineHeight: 1.7 }}>
                      {pillar.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features Grid */}
        <Box sx={{ mt: 15 }}>
          <Typography variant="h3" sx={{ textAlign: "center", fontWeight: 800, mb: 2, color: palette.textPrimary }} className="reveal">
            Capabilities
          </Typography>
          <Typography variant="h6" sx={{ textAlign: "center", color: palette.textSecondary, mb: 6, fontWeight: 400 }} className="reveal">
            A comprehensive toolkit for your documents
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature) => (
              <Grid item xs={12} sm={6} md={4} key={feature.title}>
                <Card sx={{ ...glassCardSx, height: "100%" }} className="reveal">
                  <CardContent sx={{ p: 3, "&:last-child": { pb: 3 } }}>
                    <Box sx={{ color: palette.accent, mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: palette.textPrimary }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: palette.textSecondary }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Workflow */}
        <Box sx={{ mt: 15, position: "relative" }}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "50%", height: "2px", background: `linear-gradient(90deg, transparent, ${palette.accent}, transparent)`, opacity: 0.3 }} />
          <Grid container spacing={4}>
            {workflow.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={step.title}>
                <Box sx={{ textAlign: "center" }} className="reveal">
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: palette.surface,
                      border: `1px solid ${palette.accent}`,
                      borderRadius: "50%",
                      color: palette.accent,
                      boxShadow: `0 0 20px ${palette.glow}`,
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: palette.textPrimary, mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: palette.textSecondary }}>
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Use Cases & Testimonials */}
        <Box sx={{ mt: 15 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, color: palette.textPrimary }} className="reveal">
                Built for Professionals
              </Typography>
              <Stack spacing={3}>
                {useCases.map((useCase) => (
                  <Card key={useCase.title} sx={{ ...glassCardSx, display: "flex", alignItems: "center", p: 2 }} className="reveal">
                    <Box sx={{ color: palette.secondary, mr: 2 }}>{useCase.icon}</Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: palette.textPrimary }}>{useCase.title}</Typography>
                      <Typography variant="body2" sx={{ color: palette.textSecondary }}>{useCase.description}</Typography>
                    </Box>
                  </Card>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ ...glassCardSx, height: "100%", minHeight: 400, p: 4, display: "flex", flexDirection: "column", justifyContent: "center" }} className="reveal">
                <Typography variant="h5" sx={{ color: palette.accent, mb: 2, fontWeight: 700 }}>
                  {testimonials[testimonialIndex].title}
                </Typography>
                <Typography variant="h6" sx={{ color: palette.textPrimary, mb: 4, fontStyle: "italic", lineHeight: 1.6 }}>
                  "{testimonials[testimonialIndex].description}"
                </Typography>
                <Stack direction="row" spacing={1}>
                  {[...Array(testimonials.length)].map((_, i) => (
                    <Box key={i} sx={{ width: 30, height: 3, borderRadius: 10, background: i === testimonialIndex ? palette.accent : "rgba(255,255,255,0.1)" }} />
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Comparison */}
        <Box sx={{ mt: 15 }}>
          <Typography variant="h3" sx={{ textAlign: "center", fontWeight: 800, mb: 6, color: palette.textPrimary }} className="reveal">
            The Difference
          </Typography>
          <Grid container spacing={4}>
            {["The Old Way", "With DocuThinker"].map((title, index) => (
              <Grid item xs={12} md={6} key={title}>
                <Card
                  sx={{
                    ...glassCardSx,
                    p: 4,
                    height: "100%",
                    background: index === 0 ? "rgba(255, 50, 50, 0.05)" : "rgba(0, 224, 255, 0.05)",
                    borderColor: index === 0 ? "rgba(255, 50, 50, 0.3)" : palette.accent,
                    boxShadow: index === 0 ? "none" : `0 0 30px ${palette.glow}`,
                  }}
                  className="reveal"
                >
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: index === 0 ? "#ff5252" : palette.accent }}>
                    {title}
                  </Typography>
                  <Stack spacing={2}>
                    {(index === 0
                      ? ["Manual reading hours", "Lost context", "Inconsistent summaries", "Data privacy risks"]
                      : ["Instant AI processing", "Complete context preservation", "Consistent every time", "Secure and private"]
                    ).map((item) => (
                      <Stack key={item} direction="row" alignItems="center" spacing={2}>
                        {index === 0 ? <RemoveCircleOutline sx={{ color: "#ff5252" }} /> : <CheckCircle sx={{ color: palette.accent }} />}
                        <Typography variant="body1" sx={{ color: palette.textSecondary }}>{item}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box sx={{ mt: 15, mb: 10 }} className="reveal">
          <Box
            sx={{
              ...glassCardSx,
              p: 6,
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              border: `1px solid ${palette.accent}`,
              boxShadow: `0 0 50px ${palette.glow}`,
            }}
          >
            <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: `linear-gradient(135deg, rgba(0,224,255,0.1), rgba(168,85,247,0.1))`, zIndex: 0 }} />
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography variant="h3" sx={{ fontWeight: 800, color: palette.textPrimary, mb: 2 }}>
                Ready to Evolve?
              </Typography>
              <Typography variant="h6" sx={{ color: palette.textSecondary, mb: 4, maxWidth: 600, mx: "auto" }}>
                Join the next generation of document interaction. Start for free today.
              </Typography>
              <Button
                component={Link}
                to="/register"
                size="large"
                sx={{
                  background: palette.textPrimary,
                  color: palette.background,
                  fontWeight: 700,
                  px: 6,
                  py: 1.5,
                  borderRadius: "16px",
                  "&:hover": { background: palette.accent, color: palette.background, boxShadow: `0 0 20px ${palette.accent}` },
                }}
              >
                Create Free Account
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;