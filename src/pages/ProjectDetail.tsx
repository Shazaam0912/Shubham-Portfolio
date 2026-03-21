import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowOutward, MdArrowBack, MdPerson } from "react-icons/md";
import { gsap } from "gsap";
import { useLanguage } from "../context/LanguageProvider";
import "./ProjectDetail.css";

// ─── Project Data ─────────────────────────────────────────────────────────────

interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  year: string;
  developer: string;
  role: string;
  status: string;
  mediaType: "youtube" | "images";
  youtubeId?: string;
  images?: string[];
  headings: { label: string; content: string }[];
  link?: string;
  linkLabel?: string;
  accentColor: string;
  bgColor: string;
  techStack?: string[];
  thumb: string;
}

const PROJECTS_DATA: Record<string, ProjectData> = {
  talytoki: {
    id: "talytoki",
    title: "Talkytoki",
    subtitle: "Immersive Language Learning Platform",
    tag: "Browser Extension · AI · Streaming",
    year: "2025",
    developer: "Shubham Bhardwaj",
    role: "Solo Developer",
    status: "Live",
    mediaType: "youtube",
    youtubeId: "WdSx_qvylQU",
    accentColor: "#c2a4ff",
    bgColor: "#1a0d2e",
    thumb: "https://img.youtube.com/vi/WdSx_qvylQU/maxresdefault.jpg",
    link: "https://www.youtube.com/watch?v=WdSx_qvylQU",
    linkLabel: "Watch Demo",
    techStack: ["React", "TypeScript", "AI/LLM", "Chrome Extension API", "YouTube API"],
    headings: [
      {
        label: "The Problem",
        content:
          "The 'Scattered Learning' Trap — As I'm learning Japanese, I constantly ran into the same frustrating roadblock: information is just too scattered. I'd watch a video, hear an interesting word, pause the video, scramble through my notes or open a dictionary app to find the meaning, and by the time I got back to the video, the immersion was completely broken.",
      },
      {
        label: "The Vision",
        content:
          "Imagine if you could learn while watching your favorite shows, without ever needing to look away or check your notes. What if everything you needed to understand the language was right there on the screen? That's exactly why I built Talkytoki — a single, centralized platform where you can watch videos from YouTube, Netflix, and other streaming sites, while seamlessly learning and saving new vocabulary and grammar in real-time.",
      },
      {
        label: "Core Features",
        content:
          "Hover-to-Learn Dictionary: Watch with dual subtitles — hover over any word to instantly see meaning, pronunciation, and grammar. Smart Vocabulary Saving: Click to save words directly from the video; Talkytoki highlights them automatically in future videos. JLPT Level Tagging (N5–N1): Automatically categorizes saved vocabulary by proficiency level. Active Practice Controls: Loop specific sentences or auto-pause after every line. 'Talk to the Creator' AI: After watching, a built-in AI adopts the persona of that video's creator for real-time conversation practice.",
      },
      {
        label: "Impact",
        content:
          "Talkytoki transforms passive video watching into an active, immersive language acquisition experience. By eliminating the need to context-switch between apps, learners stay in the flow state that is critical for language retention. The JLPT tagging system ensures learners always know what to prioritize, making the path from N5 to N1 feel structured and achievable.",
      },
    ],
  },
  "stock-prediction": {
    id: "stock-prediction",
    title: "Stock Prediction",
    subtitle: "Time-Series Forecasting — Tata Steel",
    tag: "Data Science · Time Series · R",
    year: "2024",
    developer: "Shubham Bhardwaj",
    role: "Data Scientist",
    status: "Completed",
    mediaType: "images",
    images: [
      "/Projects/stock-prediction-R/1.png",
      "/Projects/stock-prediction-R/2.png",
      "/Projects/stock-prediction-R/3.jpeg",
      "/Projects/stock-prediction-R/4.png",
      "/Projects/stock-prediction-R/5.png",
      "/Projects/stock-prediction-R/6.png",
      "/Projects/stock-prediction-R/7.png",
    ],
    accentColor: "#4ade80",
    bgColor: "#0d1f14",
    thumb: "/Projects/stock-prediction-R/2.png",
    link: "https://www.linkedin.com/in/shubham-bhardwaj-730946256/overlay/Project/1810913160/treasury/?profileId=ACoAAD8kvJQBOX_AnJti2Spkvwy3Mym1kwilji4",
    linkLabel: "View on LinkedIn",
    techStack: ["R", "ARIMA", "ggplot2", "Time Series", "Financial Data"],
    headings: [
      {
        label: "Objectives",
        content:
          "Collect historical stock data of Tata Steel from financial data sources. Perform data cleaning, preprocessing, and exploratory data analysis. Apply time-series forecasting models to analyze stock price behavior. Predict future stock price movements based on historical trends.",
      },
      {
        label: "Models Used",
        content:
          "Moving Average (MA) — to smooth short-term fluctuations in stock prices. AutoRegressive (AR) — to model relationships between current and past prices. ARIMA (AutoRegressive Integrated Moving Average) — used as the main forecasting model for predicting future prices. Exponential Smoothing — to capture trends and improve forecasting accuracy.",
      },
      {
        label: "Methodology",
        content:
          "The project followed a rigorous data science pipeline: raw historical data was sourced, cleaned, and normalized before being fed into multiple competing models. Each model's performance was evaluated using RMSE and MAE metrics, with ARIMA emerging as the strongest performer for short-term prediction windows.",
      },
      {
        label: "End Goal",
        content:
          "Build a predictive model capable of forecasting short-term stock price movements using historical data and statistical time-series techniques. The project demonstrates the application of financial data analysis, forecasting models, and R programming for analyzing market behavior and supporting investment decision-making.",
      },
    ],
  },
  "parallel-universe": {
    id: "parallel-universe",
    title: "Parallel Universe",
    subtitle: "Personal Streetwear Brand Concept",
    tag: "Design · Streetwear · Brand Identity",
    year: "2023",
    developer: "Shubham Bhardwaj",
    role: "Designer & Creative Director",
    status: "Ongoing",
    mediaType: "images",
    images: [
      "/Projects/Parallel%20Universe/FRONT.png",
      "/Projects/Parallel%20Universe/headshot.png",
      "/Projects/Parallel%20Universe/deku.png",
      "/Projects/Parallel%20Universe/gojo.png",
      "/Projects/Parallel%20Universe/jdmm.png",
      "/Projects/Parallel%20Universe/HOT.png",
      "/Projects/Parallel%20Universe/HELL.png",
      "/Projects/Parallel%20Universe/DC.png",
      "/Projects/Parallel%20Universe/blck.png",
      "/Projects/Parallel%20Universe/lufy.png",
      "/Projects/Parallel%20Universe/srace.png",
    ],
    accentColor: "#f97316",
    bgColor: "#1f0e00",
    thumb: "/Projects/Parallel%20Universe/headshot.png",
    techStack: ["Graphic Design", "Adobe Illustrator", "Brand Identity", "Streetwear", "Anime"],
    headings: [
      {
        label: "The Concept",
        content:
          "Parallel Universe is a personal clothing brand concept that I created out of my passion for design, creativity, and street culture. I have always wanted to build my own brand someday, and this project allowed me to explore that dream by turning my interests into visual designs.",
      },
      {
        label: "Inspiration",
        content:
          "The brand is heavily inspired by the energy of Indian streetwear culture and the creative freedom it represents. Through this project, I experimented with graphics and concepts that reflect my personal interests — including anime, JDM car culture, basketball, and skateboarding.",
      },
      {
        label: "Design Philosophy",
        content:
          "Rather than just designing clothing, the goal of Parallel Universe was to create a space where all the things I love could coexist visually. Each design represents a part of my personality and the cultures that influence me — a wearable manifesto of identity.",
      },
      {
        label: "Outcome",
        content:
          "This project started as a hobby, but it also became a way for me to express my creativity and explore how art, fashion, and personal interests can come together to form a unique brand identity. It sharpened my eye for composition, color theory, and visual storytelling.",
      },
    ],
  },
  workorbit: {
    id: "workorbit",
    title: "WorkOrbit",
    subtitle: "Decentralized AI Workflow Agent",
    tag: "AI · Blockchain · Cardano · Hackathon",
    year: "2025",
    developer: "Shubham Bhardwaj · Team KERDS",
    role: "Full-Stack Developer",
    status: "Hackathon Winner",
    mediaType: "youtube",
    youtubeId: "elVb-AkG-XE",
    accentColor: "#38bdf8",
    bgColor: "#001a2e",
    thumb: "https://img.youtube.com/vi/elVb-AkG-XE/maxresdefault.jpg",
    link: "https://youtu.be/elVb-AkG-XE?si=alxq0cBYAPXDt7-3",
    linkLabel: "Watch Demo",
    techStack: ["React", "FastAPI", "Cardano", "Plutus", "Kafka", "Redis", "IPFS", "LLM"],
    headings: [
      {
        label: "The Problem",
        content:
          "Modern team collaboration is broken. Many teams struggle with inefficient task tracking, poor deadline management, and a lack of transparent accountability. Existing web2 project management tools lack the trust, traceability, and tamper-proof records necessary for high-stakes collaboration.",
      },
      {
        label: "The Solution",
        content:
          "WorkOrbit is a decentralized AI Workflow Agent that automates task assignments, tracks deadlines in real-time, and verifies task completion. By integrating AI automation with the Cardano blockchain, we created a fully auditable, tamper-proof system for ultimate team accountability. Key features: Meeting STT-to-Action (AI listens during meetings and instantly creates role-based tasks), Intelligent Task Assignment, AI-Powered Verification, and an Immutable Trust Layer on Cardano.",
      },
      {
        label: "Technical Architecture",
        content:
          "Frontend: React/Flutter dashboard. Backend & API Gateway: FastAPI for complex agentic endpoints. AI Agent Engine: LLM + Task Manager for reasoning and scheduling. Middleware: Node.js/Python processors with Kafka and Redis for real-time event queuing. Data Storage (Web3): Encrypted payloads on IPFS; critical state changes managed by Plutus Smart Contracts on the Cardano Blockchain.",
      },
      {
        label: "The Hackathon Crucible",
        content:
          "Built from scratch in a grueling 30-hour sprint at Cardano Hackathon Asia IBW 2025 with Team KERDS. We faced a 'cold start' disadvantage (zero preparation), complex API orchestration challenges, and first-time Web3 integration — all while battling severe sleep deprivation. We pushed our final submission just 30 minutes before the deadline.",
      },
    ],
  },
  "smart-home": {
    id: "smart-home",
    title: "Smart Home Assistive System",
    subtitle: "IoT & AI for Accessibility — Published Research",
    tag: "IoT · Computer Vision · AI · Assistive Tech",
    year: "2025",
    developer: "Shubham Bhardwaj",
    role: "Researcher & Developer",
    status: "Published",
    mediaType: "youtube",
    youtubeId: "oWgJ38PCQ0Y",
    accentColor: "#a78bfa",
    bgColor: "#12082e",
    thumb: "https://img.youtube.com/vi/oWgJ38PCQ0Y/maxresdefault.jpg",
    link: "https://youtu.be/oWgJ38PCQ0Y?si=_NIhqtgjokih7GYK",
    linkLabel: "Watch Demo",
    techStack: ["ESP32", "OpenCV", "MediaPipe", "Python", "Relay Modules", "Voice AI", "Custom PCB"],
    headings: [
      {
        label: "Overview",
        content:
          "A published research project presenting a smart home support system designed to enable individuals with cerebral palsy and muscular dystrophy to perform daily tasks independently. The system integrates voice commands, hand gesture recognition, and a virtual mouse interface — all without requiring physical contact with any device.",
      },
      {
        label: "Interaction Modes",
        content:
          "Three seamless input modalities: (1) Hand Gesture Control — real-time camera-based gesture detection using OpenCV & MediaPipe to move the cursor and perform click actions. (2) Virtual Mouse Interface — index finger tracking translates to pointer movement; pinch gestures trigger clicks, drags, and scrolls. (3) Voice-Activated AI Assistant — continuously listens for spoken commands to open apps, control devices, and perform tasks without physical input.",
      },
      {
        label: "System Architecture",
        content:
          "Hardware: ESP32 microcontroller with built-in Wi-Fi/Bluetooth receives wireless commands and sends 3.3V GPIO signals to relay modules, which safely switch mains-powered appliances (lights, fans, heaters). A custom PCB integrates all components into a compact, stable unit powered by a 5V 2A adapter. Software: Python-based gesture pipeline (OpenCV + MediaPipe) + a software-only smart energy management module that tracks appliance usage durations and auto-shuts off devices after preset thresholds — no external sensors needed.",
      },
      {
        label: "Key Outcomes",
        content:
          "Experimental results demonstrated high gesture recognition accuracy, low latency, and reliable operation in both lab and home environments. The integrated smart energy system achieved up to a 20% reduction in power consumption. The system meaningfully restores daily autonomy for motor-impaired users, reduces physical and emotional burden on caregivers, and offers a cost-effective, open, and modular design suitable for rehabilitation centers and assisted living facilities.",
      },
    ],
  },
};

const PROJECT_ORDER = ["talytoki", "stock-prediction", "parallel-universe", "workorbit", "smart-home"];

// ─── Localized project overlay type ──────────────────────────────────────────

interface LocalizedProjectData {
  title: string;
  subtitle: string;
  tag: string;
  role: string;
  status: string;
  linkLabel?: string;
  headings: { label: string; content: string }[];
}

// ─── Unified Header with built-in project switcher ────────────────────────────

interface HeaderProps {
  project: ProjectData;
  localized: LocalizedProjectData;
  currentId: string;
  onNavigate: (id: string) => void;
  onBack: () => void;
  backLabel: string;
  moreProjectsLabel: string;
  closeLabel: string;
  localizedProjects: Record<string, LocalizedProjectData>;
}

const ProjectHeader = ({ project, localized, currentId, onNavigate, onBack, backLabel, moreProjectsLabel, closeLabel, localizedProjects }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    gsap.set(el, { height: 88, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 30, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(el, { height: 280, duration: 0.42, ease: "power3.out" });
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.32, ease: "power3.out", stagger: 0.06 },
      "-=0.18"
    );
    tlRef.current = tl;

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isOpen) {
      setIsOpen(true);
      tl.play(0);
    } else {
      tl.eventCallback("onReverseComplete", () => setIsOpen(false));
      tl.reverse();
    }
  };

  const handleProjectClick = (id: string) => {
    if (id === currentId) {
      toggleMenu();
      return;
    }
    const tl = tlRef.current;
    const doNav = () => {
      setIsOpen(false);
      onNavigate(id);
    };
    if (tl && isOpen) {
      tl.eventCallback("onReverseComplete", doNav);
      tl.reverse();
    } else {
      doNav();
    }
  };

  return (
    <header ref={headerRef} className="pd-global-header">
      {/* ── Top bar (always visible) ── */}
      <div className="pd-header-topbar">
        {/* Back button */}
        <button
          className="pd-back-btn-inline"
          onClick={onBack}
          data-cursor="disable"
        >
          <MdArrowBack size={13} />
          <span>{backLabel}</span>
        </button>

        {/* Title block */}
        <div className="pd-header-title-block">
          <h1 className="pd-header-title">
            {localized.title}
            <span style={{ color: project.accentColor }}>.</span>
          </h1>
          <p className="pd-header-subtitle">{localized.subtitle}</p>
          <div className="pd-header-dev">
            <MdPerson size={11} style={{ opacity: 0.5 }} />
            {project.developer}
          </div>
        </div>

        {/* Right meta */}
        <div className="pd-header-right">
          <div className="pd-header-meta-item">
            <span className="pd-header-meta-label">Year</span>
            <span className="pd-header-meta-value" style={{ color: project.accentColor }}>
              {project.year}
            </span>
          </div>
          <div className="pd-header-meta-item">
            <span className="pd-header-meta-label">Role</span>
            <span className="pd-header-meta-value">{localized.role}</span>
          </div>
          <div className="pd-header-meta-item">
            <span className="pd-header-meta-label">Status</span>
            <span
              className="pd-header-status"
              style={{ color: project.accentColor, borderColor: project.accentColor + "44" }}
            >
              {localized.status}
            </span>
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="pd-header-cta"
              style={{ borderColor: project.accentColor, color: project.accentColor }}
              data-cursor="disable"
            >
              {localized.linkLabel || "View"} <MdArrowOutward size={13} />
            </a>
          )}

          {/* View More Projects toggle button */}
          <button
            className={`pd-view-more-btn${isOpen ? " open" : ""}`}
            onClick={toggleMenu}
            data-cursor="disable"
            aria-label={isOpen ? closeLabel : moreProjectsLabel}
            style={{ borderColor: isOpen ? project.accentColor + "66" : undefined }}
          >
            <span className="pd-ham-line" />
            <span className="pd-ham-line" />
            <span className="pd-view-more-label">
              {isOpen ? closeLabel : moreProjectsLabel}
            </span>
          </button>
        </div>
      </div>

      {/* ── Project cards drawer ── */}
      <div
        className={`pd-header-drawer${isOpen ? " visible" : ""}`}
        aria-hidden={!isOpen}
      >
          {PROJECT_ORDER.map((id, idx) => {
            const p = PROJECTS_DATA[id];
            const lp = localizedProjects[id];
            const isActive = id === currentId;
            return (
              <div
                key={id}
                ref={setCardRef(idx)}
                className={`pd-drawer-card${isActive ? " active" : ""}`}
                style={{
                  background: isActive ? p.bgColor : "#0f0d14",
                  borderColor: isActive ? p.accentColor + "44" : "rgba(255,255,255,0.07)",
                }}
                onClick={() => handleProjectClick(id)}
                data-cursor="disable"
              >
                {/* Thumbnail */}
                <div className="pd-drawer-thumb">
                  <img src={p.thumb} alt={lp?.title ?? p.title} />
                  <div
                    className="pd-drawer-thumb-overlay"
                    style={{
                      background: `linear-gradient(to bottom, transparent 40%, ${isActive ? p.bgColor : "#0f0d14"} 100%)`,
                    }}
                  />
                </div>

                {/* Project name only */}
                <div
                  className="pd-drawer-title"
                  style={{ color: isActive ? "#fff" : "#bbb" }}
                >
                  {lp?.title ?? p.title}
                </div>
              </div>
            );
          })}
      </div>

      {/* Animated accent line */}
      <motion.div
        className="pd-header-line"
        style={{ backgroundColor: project.accentColor }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
      />
    </header>
  );
};

// ─── YouTube Embed ────────────────────────────────────────────────────────────

const YouTubeEmbed = ({ youtubeId, accentColor }: { youtubeId: string; accentColor: string }) => {
  const [playing, setPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <div className="pd-yt-wrapper">
      {!playing ? (
        <div className="pd-yt-thumb" onClick={() => setPlaying(true)}>
          <img src={thumbnailUrl} alt="Video thumbnail" />
          <div className="pd-yt-overlay" />
          <div className="pd-yt-play-btn" style={{ borderColor: accentColor }}>
            <svg viewBox="0 0 24 24" width="32" height="32" fill={accentColor}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="pd-yt-label" style={{ color: accentColor }}>
            Click to play
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title="Project Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="pd-yt-iframe"
        />
      )}
    </div>
  );
};

// ─── Image Carousel ───────────────────────────────────────────────────────────

const ImageCarousel = ({ images, accentColor }: { images: string[]; accentColor: string }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="pd-carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`Project image ${current + 1}`}
          className="pd-carousel-img"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </AnimatePresence>
      <div className="pd-carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`pd-carousel-dot${i === current ? " active" : ""}`}
            style={i === current ? { backgroundColor: accentColor } : {}}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Left Panel ───────────────────────────────────────────────────────────────

const LeftPanel = ({ project, localized }: { project: ProjectData; localized: LocalizedProjectData }) => {
  return (
    <div className="pd-left-panel">
      <div className="pd-left-inner">
        {/* Info above card */}
        <div className="pd-left-card-title">
          <div
            className="pd-left-tag"
            style={{ color: project.accentColor, borderColor: project.accentColor + "44" }}
          >
            {localized.tag}
          </div>
          <p className="pd-left-sub">{localized.subtitle}</p>
          <div className="pd-left-meta-row">
            <span className="pd-left-meta-item" style={{ color: project.accentColor + "cc" }}>
              {project.year}
            </span>
            <span className="pd-left-meta-sep">·</span>
            <span className="pd-left-meta-item" style={{ color: "#aaa" }}>
              {localized.role}
            </span>
            <span className="pd-left-meta-sep">·</span>
            <span
              className="pd-left-status"
              style={{ color: project.accentColor, borderColor: project.accentColor + "33" }}
            >
              {localized.status}
            </span>
          </div>
        </div>

        {/* Media card */}
        <div
          className="pd-media-card"
          style={{
            boxShadow: `0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 0 80px ${project.accentColor}18`,
          }}
        >
          <div className="pd-media-card-inner">
            {project.mediaType === "youtube" && project.youtubeId ? (
              <YouTubeEmbed youtubeId={project.youtubeId} accentColor={project.accentColor} />
            ) : project.images ? (
              <ImageCarousel images={project.images} accentColor={project.accentColor} />
            ) : null}
          </div>
        </div>

        {/* Tech stack pills */}
        {project.techStack && (
          <div className="pd-tech-stack">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="pd-tech-pill"
                style={{ borderColor: project.accentColor + "33", color: "#ccc" }}
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Glow */}
        <div
          className="pd-media-glow"
          style={{
            background: `radial-gradient(ellipse at 50% 80%, ${project.accentColor}1a 0%, transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
};

// ─── Scrollable Card Stack (right panel) ─────────────────────────────────────

interface CardStackProps {
  headings: { label: string; content: string }[];
  accentColor: string;
  link?: string;
  linkLabel?: string;
}

const CardStack = ({ headings, accentColor, link, linkLabel }: CardStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = headings.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // Reset to first card when headings change (project switch)
  useEffect(() => {
    setActiveIndex(0);
  }, [headings]);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating.current) return;
      const clamped = Math.max(0, Math.min(total - 1, index));
      if (clamped === activeIndex) return;
      isAnimating.current = true;
      setActiveIndex(clamped);
      setTimeout(() => {
        isAnimating.current = false;
      }, 500);
    },
    [activeIndex, total]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Wheel handler
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let accDelta = 0;
    let resetTimer: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      accDelta += e.deltaY;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        accDelta = 0;
      }, 200);
      if (Math.abs(accDelta) > 60) {
        if (accDelta > 0) goNext();
        else goPrev();
        accDelta = 0;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [goNext, goPrev]);

  // Keyboard handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goNext();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") goPrev();
      if (e.key === "Home") goTo(0);
      if (e.key === "End") goTo(total - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, goTo, total]);

  // Touch handler
  const touchStartY = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) > 40) {
      if (delta > 0) goNext();
      else goPrev();
    }
  };

  return (
    <div
      ref={containerRef}
      className="pd-card-stack"
      role="application"
      aria-label="Scrollable card stack"
      tabIndex={0}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Stack area */}
      <div className="pd-card-stack-inner">
        {headings.map((heading, i) => {
          const offset = i - activeIndex;
          const isBehind = i < activeIndex;
          const isActive = i === activeIndex;
          const isAhead = i > activeIndex;

          let scale = 1;
          let y = 0;
          let opacity = 1;
          let zIndex = i;

          if (isActive) {
            scale = 1;
            y = 0;
            opacity = 1;
            zIndex = total + 1;
          } else if (isBehind) {
            const depth = activeIndex - i;
            scale = 1 - depth * 0.06;
            y = -depth * 18;
            opacity = Math.max(0, 1 - depth * 0.25);
            zIndex = total - depth;
          } else if (isAhead) {
            scale = 0.92;
            y = 80 + offset * 20;
            opacity = 0;
            zIndex = 0;
          }

          return (
            <motion.div
              key={i}
              className="pd-stack-card"
              aria-hidden={!isActive}
              animate={{ scale, y, opacity, zIndex }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderColor: accentColor + (isActive ? "33" : "18"),
                transformOrigin: "top center",
              }}
            >
              {/* Card header */}
              <div className="pd-stack-card-header">
                <div className="pd-stack-counter" style={{ color: accentColor + "77" }}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="pd-stack-counter-sep"> / </span>
                  <span>{String(total).padStart(2, "0")}</span>
                </div>
                <div className="pd-stack-dot" style={{ backgroundColor: accentColor }} />
              </div>

              {/* Heading */}
              <h2 className="pd-stack-heading" style={{ color: accentColor }}>
                {heading.label}
              </h2>

              {/* Rule */}
              <motion.div
                className="pd-stack-rule"
                style={{ backgroundColor: accentColor }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isActive ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Body */}
              <p className="pd-stack-body">{heading.content}</p>

              {/* CTA on last card */}
              {i === total - 1 && link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pd-stack-cta"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  {linkLabel || "View Project"}
                  <MdArrowOutward />
                </a>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="pd-stack-dots" role="tablist" aria-label="Card navigation">
        {headings.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to card ${i + 1} of ${total}`}
            className={`pd-stack-nav-dot${i === activeIndex ? " active" : ""}`}
            style={i === activeIndex ? { backgroundColor: accentColor } : {}}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* Arrow navigation */}
      <div className="pd-stack-arrows">
        <button
          className="pd-stack-arrow"
          onClick={goPrev}
          disabled={activeIndex === 0}
          aria-label="Previous card"
          style={{
            borderColor: accentColor + "33",
            color: activeIndex === 0 ? "#333" : accentColor,
          }}
        >
          ↑
        </button>
        <button
          className="pd-stack-arrow"
          onClick={goNext}
          disabled={activeIndex === total - 1}
          aria-label="Next card"
          style={{
            borderColor: accentColor + "33",
            color: activeIndex === total - 1 ? "#333" : accentColor,
          }}
        >
          ↓
        </button>
      </div>

      {/* Screen reader live region */}
      <div aria-live="polite" aria-atomic="true" className="pd-sr-only">
        Card {activeIndex + 1} of {total} selected. Use arrow keys to navigate.
      </div>
    </div>
  );
};

// ─── Main ProjectDetail Page ──────────────────────────────────────────────────

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, language, setLanguage } = useLanguage();

  // Local project state — allows smooth switching without full page reload
  const [currentId, setCurrentId] = useState(id ?? "talytoki");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Sync with URL param on initial load
  useEffect(() => {
    if (id && id !== currentId) {
      setCurrentId(id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const project = PROJECTS_DATA[currentId];

  // Get localized project detail data
  const projectDetailData = data.projectDetail;
  const localizedProjects = projectDetailData.projects as Record<string, LocalizedProjectData>;
  const localizedProject: LocalizedProjectData = localizedProjects[currentId] ?? {
    title: project?.title ?? "",
    subtitle: project?.subtitle ?? "",
    tag: project?.tag ?? "",
    role: project?.role ?? "",
    status: project?.status ?? "",
    linkLabel: project?.linkLabel,
    headings: project?.headings ?? [],
  };

  // Enable page scroll (portfolio disables it)
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  // Smooth project switch — fade out, swap, fade in
  const handleNavigate = (newId: string) => {
    if (newId === currentId || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentId(newId);
      navigate(`/projects/${newId}`, { replace: true });
      window.scrollTo(0, 0);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 280);
  };

  // Back to portfolio
  const handleBack = () => {
    try {
      sessionStorage.setItem("portfolioScrollY", "1");
    } catch { /* ignore */ }
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  if (!project) {
    return (
      <div className="pd-not-found">
        <h2>Project not found</h2>
        <button onClick={handleBack} className="pd-back-btn">
          {projectDetailData.backLabel}
        </button>
      </div>
    );
  }

  return (
    <div className="pd-page">
      {/* ── Unified Header (with built-in project switcher) ── */}
      <ProjectHeader
        project={project}
        localized={localizedProject}
        currentId={currentId}
        onNavigate={handleNavigate}
        onBack={handleBack}
        backLabel={projectDetailData.backLabel}
        moreProjectsLabel={projectDetailData.moreProjects}
        closeLabel={projectDetailData.closeLabel}
        localizedProjects={localizedProjects}
      />

      {/* ── Page content with transition ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentId}
          className="pd-content-wrapper"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── SPLIT VIEW ── */}
          <div className="pd-split">
            {/* LEFT: fixed media panel */}
            <LeftPanel project={project} localized={localizedProject} />

            {/* RIGHT: snap-scroll card stack */}
            <div className="pd-right-col">
              <CardStack
                headings={localizedProject.headings}
                accentColor={project.accentColor}
                link={project.link}
                linkLabel={localizedProject.linkLabel}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Subtle accent glow */}
      <div
        className="pd-page-glow"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${project.accentColor}0e 0%, transparent 55%)`,
          transition: "background 0.6s ease",
        }}
      />

      {/* Floating language toggle */}
      <button
        onClick={() => setLanguage(language === "en" ? "ja" : "en")}
        data-cursor="disable"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          background: "transparent",
          border: `1px solid ${project.accentColor}`,
          color: project.accentColor,
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          zIndex: 9999,
          pointerEvents: "auto",
          transition: "background 0.2s, color 0.2s",
        }}
      >
        {language === "en" ? "JA" : "EN"}
      </button>
    </div>
  );
};

export default ProjectDetail;
