import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import "./styles/Projects.css";

interface ProjectSection {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  tag: string;
  year: string;
  mediaType: "youtube" | "images";
  youtubeId?: string;
  images?: string[];
  headings: {
    label: string;
    content: string;
  }[];
  link?: string;
  linkLabel?: string;
  accentColor: string;
}

const PROJECTS: ProjectSection[] = [
  {
    id: "talytoki",
    index: 1,
    title: "Talytoki",
    subtitle: "Immersive Language Learning",
    tag: "Browser Extension · AI · Streaming",
    year: "2024",
    mediaType: "youtube",
    youtubeId: "WdSx_qvylQU",
    accentColor: "#c2a4ff",
    link: "https://www.youtube.com/watch?v=WdSx_qvylQU",
    linkLabel: "Watch Demo",
    headings: [
      {
        label: "The Problem",
        content:
          "The 'Scattered Learning' Trap — As I'm learning Japanese, I constantly ran into the same frustrating roadblock: information is just too scattered. I'd watch a video, hear an interesting word, pause the video, scramble through my notes or open a dictionary app to find the meaning, and by the time I got back to the video, the immersion was completely broken.",
      },
      {
        label: "The Vision",
        content:
          "Imagine if you could learn while watching your favorite shows, without ever needing to look away or check your notes. What if everything you needed to understand the language was right there on the screen? That's exactly why I built Talytoki — a single, centralized platform where you can watch videos from YouTube, Netflix, and other streaming sites, while seamlessly learning and saving new vocabulary and grammar in real-time.",
      },
      {
        label: "Core Features",
        content:
          "Hover-to-Learn Dictionary: Watch with dual subtitles — hover over any word to instantly see meaning, pronunciation, and grammar. Smart Vocabulary Saving: Click to save words directly from the video; Talytoki highlights them automatically in future videos. JLPT Level Tagging (N5–N1): Automatically categorizes saved vocabulary by proficiency level. Active Practice Controls: Loop specific sentences or auto-pause after every line. 'Talk to the Creator' AI: After watching, a built-in AI adopts the persona of that video's creator for real-time conversation practice.",
      },
      {
        label: "Impact",
        content:
          "Talytoki transforms passive video watching into an active, immersive language acquisition experience. By eliminating the need to context-switch between apps, learners stay in the flow state that is critical for language retention. The JLPT tagging system ensures learners always know what to prioritize, making the path from N5 to N1 feel structured and achievable.",
      },
    ],
  },
  {
    id: "stock-prediction",
    index: 2,
    title: "Stock Price Prediction",
    subtitle: "Using R — Tata Steel",
    tag: "Data Science · Time Series · R",
    year: "2024",
    mediaType: "images",
    images: [
      "/Projects/stock-prediction-R/1.png",
      "/Projects/stock-prediction-R/2.png",
      "/Projects/stock-prediction-R/Screenshot 2026-03-16 at 4.52.03 AM.png",
      "/Projects/stock-prediction-R/Screenshot 2026-03-16 at 4.52.21 AM.png",
      "/Projects/stock-prediction-R/Screenshot 2026-03-16 at 4.52.34 AM.png",
      "/Projects/stock-prediction-R/Screenshot 2026-03-16 at 4.53.18 AM.png",
    ],
    accentColor: "#4ade80",
    link: "https://www.linkedin.com/in/shubham-bhardwaj-730946256/overlay/Project/1810913160/treasury/?profileId=ACoAAD8kvJQBOX_AnJti2Spkvwy3Mym1kwilji4",
    linkLabel: "View on LinkedIn",
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
  {
    id: "parallel-universe",
    index: 3,
    title: "Parallel Universe",
    subtitle: "Personal Clothing Brand Concept",
    tag: "Design · Streetwear · Brand Identity",
    year: "2023",
    mediaType: "images",
    images: [
      "/Projects/Parallel Universe/FRONT.png",
      "/Projects/Parallel Universe/headshot.png",
      "/Projects/Parallel Universe/deku.png",
      "/Projects/Parallel Universe/gojo.png",
      "/Projects/Parallel Universe/jdmm.png",
      "/Projects/Parallel Universe/HOT.png",
      "/Projects/Parallel Universe/HELL.png",
      "/Projects/Parallel Universe/DC.png",
      "/Projects/Parallel Universe/blck.png",
      "/Projects/Parallel Universe/lufy.png",
      "/Projects/Parallel Universe/srace.png",
    ],
    accentColor: "#f97316",
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
  {
    id: "workorbit",
    index: 4,
    title: "WorkOrbit",
    subtitle: "Cardano Hackathon Asia — IBW 2025",
    tag: "AI · Blockchain · Cardano · Hackathon",
    year: "2025",
    mediaType: "youtube",
    youtubeId: "elVb-AkG-XE",
    accentColor: "#38bdf8",
    link: "https://youtu.be/elVb-AkG-XE?si=alxq0cBYAPXDt7-3",
    linkLabel: "Watch Demo",
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
];

// ─── Media Panel ────────────────────────────────────────────────────────────

interface MediaPanelProps {
  project: ProjectSection;
  isActive: boolean;
}

const YouTubeEmbed = ({ youtubeId }: { youtubeId: string }) => {
  const [playing, setPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <div className="proj-yt-wrapper">
      {!playing ? (
        <div className="proj-yt-thumb" onClick={() => setPlaying(true)}>
          <img src={thumbnailUrl} alt="Video thumbnail" />
          <div className="proj-yt-play-btn">
            <svg viewBox="0 0 68 48" width="68" height="48">
              <path
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                fill="#f00"
              />
              <path d="M 45,24 27,14 27,34" fill="#fff" />
            </svg>
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title="Project Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="proj-yt-iframe"
        />
      )}
    </div>
  );
};

const ImageCarousel = ({ images, accentColor }: { images: string[]; accentColor: string }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="proj-carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`Project image ${current + 1}`}
          className="proj-carousel-img"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </AnimatePresence>
      <div className="proj-carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`proj-carousel-dot${i === current ? " active" : ""}`}
            style={i === current ? { backgroundColor: accentColor } : {}}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
};

const MediaPanel = ({ project }: MediaPanelProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);

  return (
    <div className="proj-media-panel" ref={ref}>
      <motion.div
        className="proj-media-card"
        style={{ rotateX: rotate, scale, perspective: 1000 }}
      >
        <div
          className="proj-media-card-inner"
          style={{ borderColor: project.accentColor + "44" }}
        >
          {project.mediaType === "youtube" && project.youtubeId ? (
            <YouTubeEmbed youtubeId={project.youtubeId} />
          ) : project.images ? (
            <ImageCarousel images={project.images} accentColor={project.accentColor} />
          ) : null}
        </div>
        {/* Glow */}
        <div
          className="proj-media-glow"
          style={{ background: `radial-gradient(ellipse at center, ${project.accentColor}22 0%, transparent 70%)` }}
        />
      </motion.div>

      {/* Index badge */}
      <div className="proj-index-badge" style={{ color: project.accentColor }}>
        {String(project.index).padStart(2, "0")}
      </div>
    </div>
  );
};

// ─── Description Panel ───────────────────────────────────────────────────────

interface DescPanelProps {
  project: ProjectSection;
  isEven: boolean;
}

const DescPanel = ({ project, isEven }: DescPanelProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="proj-desc-panel" ref={ref}>
      {/* Header */}
      <motion.div
        className="proj-desc-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="proj-desc-tag" style={{ color: project.accentColor, borderColor: project.accentColor + "55" }}>
          {project.tag}
        </div>
        <h2 className="proj-desc-title">
          {project.title}
          <span className="proj-desc-title-accent" style={{ color: project.accentColor }}>.</span>
        </h2>
        <p className="proj-desc-subtitle">{project.subtitle}</p>
        <div className="proj-desc-year" style={{ color: project.accentColor + "99" }}>
          {project.year}
        </div>
      </motion.div>

      {/* Headings */}
      <div className="proj-desc-sections">
        {project.headings.map((h, i) => (
          <motion.div
            key={i}
            className="proj-desc-section"
            initial={{ opacity: 0, x: isEven ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="proj-desc-section-label" style={{ color: project.accentColor }}>
              <span className="proj-desc-section-num">{String(i + 1).padStart(2, "0")}</span>
              {h.label}
            </div>
            <p className="proj-desc-section-text">{h.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Link */}
      {project.link && (
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-desc-link"
          style={{ borderColor: project.accentColor, color: project.accentColor }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ backgroundColor: project.accentColor, color: "#000" }}
        >
          {project.linkLabel || "View Project"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </motion.a>
      )}

      {/* Decorative line */}
      <motion.div
        className="proj-desc-line"
        style={{ backgroundColor: project.accentColor + "33" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
};

// ─── Single Project Row ───────────────────────────────────────────────────────

interface ProjectRowProps {
  project: ProjectSection;
  isEven: boolean;
}

const ProjectRow = ({ project, isEven }: ProjectRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`proj-row${isEven ? " proj-row--even" : ""}`}
      ref={rowRef}
      id={`project-${project.id}`}
    >
      {/* Accent line */}
      <motion.div
        className="proj-row-accent-line"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}66, transparent)` }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <div className="proj-row-inner">
        {isEven ? (
          <>
            <DescPanel project={project} isEven={isEven} />
            <MediaPanel project={project} isActive={true} />
          </>
        ) : (
          <>
            <MediaPanel project={project} isActive={true} />
            <DescPanel project={project} isEven={isEven} />
          </>
        )}
      </div>
    </div>
  );
};

// ─── Projects Section ─────────────────────────────────────────────────────────

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      {/* Section header */}
      <div className="projects-header">
        <motion.div
          className="projects-header-inner"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="projects-header-eyebrow">Selected Work</span>
          <h2 className="projects-header-title">
            My <span className="projects-header-accent">Projects</span>
          </h2>
          <p className="projects-header-sub">
            A collection of things I've built — from AI-powered language tools to blockchain hackathons.
          </p>
        </motion.div>
      </div>

      {/* Project rows */}
      <div className="projects-list">
        {PROJECTS.map((project, i) => (
          <ProjectRow key={project.id} project={project} isEven={i % 2 !== 0} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
