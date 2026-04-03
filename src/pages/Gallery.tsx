import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowBack, MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageProvider";
import "./Gallery.css";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Category = "all" | "photos" | "videos";

interface HobbyPin {
  id: string;
  category: Exclude<Category, "all">;
  image: string;
  video?: string;
  isVideo?: boolean;
  span?: "tall" | "wide" | "normal" | "video";
}

const CATEGORIES: { key: Category; labelEn: string; labelJa: string; color: string }[] = [
  { key: "all",    labelEn: "All",    labelJa: "すべて", color: "#c2a4ff" },
  { key: "photos", labelEn: "Photos", labelJa: "写真",   color: "#38bdf8" },
  { key: "videos", labelEn: "Videos", labelJa: "動画",   color: "#facc15" },
];

const PINS: HobbyPin[] = [
  { id: "v0", category: "videos", image: "", video: "/pinterestg/9b101787-7b96-4401-8b54-bf20dd1c2dbc.mp4", isVideo: true, span: "video" },
  { id: "p1", category: "photos", image: "/pinterestg/Goodies.jpeg", span: "tall" },
  { id: "p2", category: "photos", image: "/pinterestg/IBW2.jpeg", span: "wide" },
  { id: "p3", category: "photos", image: "/pinterestg/RADWIMPS.jpeg", span: "normal" },
  { id: "v4", category: "videos", image: "", video: "/pinterestg/Screen%20Recording%202026-03-21%20at%202.36.22%E2%80%AFAM.mov", isVideo: true, span: "video" },
  { id: "v5", category: "videos", image: "", video: "/pinterestg/Screen%20Recording%202026-03-21%20at%209.24.08%E2%80%AFAM.mov", isVideo: true, span: "video" },
  { id: "v6", category: "videos", image: "", video: "/pinterestg/Screen%20Recording%202026-03-21%20at%209.26.40%E2%80%AFAM.mov", isVideo: true, span: "video" },
  { id: "p7", category: "photos", image: "/pinterestg/Screenshot%202026-03-21%20at%202.30.56%E2%80%AFAM.png", span: "tall" },
  { id: "p8", category: "photos", image: "/pinterestg/Screenshot%202026-03-21%20at%202.31.16%E2%80%AFAM.png", span: "wide" },
  { id: "p9", category: "photos", image: "/pinterestg/Screenshot%202026-03-21%20at%209.20.37%E2%80%AFAM.png", span: "normal" },
  { id: "p10", category: "photos", image: "/pinterestg/WhatsApp%20Image%202026-03-21%20at%2002.22.57.jpeg", span: "tall" },
  { id: "v11", category: "videos", image: "", video: "/pinterestg/WhatsApp%20Video%202026-03-21%20at%2002.20.45.mp4", isVideo: true, span: "video" },
  { id: "v12", category: "videos", image: "", video: "/pinterestg/WhatsApp%20Video%202026-03-21%20at%2002.21.44.mp4", isVideo: true, span: "video" },
  { id: "p13", category: "photos", image: "/pinterestg/alice.jpg", span: "tall" },
  { id: "p14", category: "photos", image: "/pinterestg/bleach.jpg", span: "wide" },
  { id: "p15", category: "photos", image: "/pinterestg/bleachhh.jpg", span: "normal" },
  { id: "p16", category: "photos", image: "/pinterestg/fujisan.jpg", span: "tall" },
  { id: "p17", category: "photos", image: "/pinterestg/h.jpeg", span: "wide" },
  { id: "p18", category: "photos", image: "/pinterestg/hacathon%20badge.jpeg", span: "normal" },
  { id: "v19", category: "videos", image: "", video: "/pinterestg/ind.mov", isVideo: true, span: "video" },
  { id: "p20", category: "photos", image: "/pinterestg/kyoto.jpg", span: "wide" },
  { id: "v21", category: "videos", image: "", video: "/pinterestg/yume%20torou.mp4", isVideo: true, span: "video" },
  { id: "p22", category: "photos", image: "/pinterestg/yumi+arai.webp", span: "tall" },
  { id: "v23", category: "videos", image: "", video: "/pinterestg/com.mov", isVideo: true, span: "video" }
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────

const PinLightbox = ({
  pin,
  onClose,
}: {
  pin: HobbyPin;
  onClose: () => void;
}) => {
  const cat = CATEGORIES.find((c) => c.key === pin.category)!;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="hb-lightbox-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="hb-lightbox-panel"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{ borderColor: cat.color + "44" }}
      >
        <button className="hb-lightbox-close" onClick={onClose} data-cursor="disable">
          <MdClose size={20} />
        </button>
        <div className="hb-lightbox-img-wrap" style={{ boxShadow: `0 0 80px ${cat.color}22` }}>
          {pin.isVideo && pin.video ? (
            <video src={pin.video} autoPlay controls className="hb-lightbox-img" style={{ background: "#000" }} />
          ) : (
            <img src={pin.image} alt="Hobby media" className="hb-lightbox-img" />
          )}
        </div>
        <div className="hb-lightbox-glow" style={{ background: `radial-gradient(ellipse at 50% 100%, ${cat.color}18 0%, transparent 65%)` }} />
      </motion.div>
    </motion.div>
  );
};

// ─── Pin Card ─────────────────────────────────────────────────────────────────

const PinCard = ({
  pin,
  index,
  onClick,
}: {
  pin: HobbyPin;
  index: number;
  onClick: () => void;
}) => {
  const cat = CATEGORIES.find((c) => c.key === pin.category)!;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className={`hb-pin hb-pin--${pin.span ?? "normal"}`}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      onClick={onClick}
      data-cursor="disable"
    >
      <div className="hb-pin-img-wrap">
        {pin.isVideo && pin.video ? (
          <>
            <video
              src={pin.video}
              autoPlay
              muted
              loop
              playsInline
              className="hb-pin-img"
            />
            <span className="hb-pin-video-badge">▶</span>
          </>
        ) : (
          <img src={pin.image} alt="Hobby media" className="hb-pin-img" loading="lazy" />
        )}
        <div className="hb-pin-overlay" style={{ background: `linear-gradient(to top, ${cat.color}33 0%, transparent 50%)` }} />
      </div>
      <div className="hb-pin-glow" style={{ background: `radial-gradient(ellipse at 50% 100%, ${cat.color}12 0%, transparent 70%)` }} />
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const Gallery = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const isJa = language === "ja";
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [activePin, setActivePin] = useState<HobbyPin | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "hidden"; };
  }, []);

  const filtered =
    activeCategory === "all" ? PINS : PINS.filter((p) => p.category === activeCategory);

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  const activeColor = CATEGORIES.find((c) => c.key === activeCategory)?.color ?? "#c2a4ff";

  const i18n = {
    portfolio: isJa ? "ポートフォリオ" : "← Portfolio",
    eyebrow: isJa ? "ギャラリー" : "Gallery",
    title1: isJa ? "私の" : "My",
    title2: isJa ? "世界" : "World",
    sub: isJa
      ? "コードを書かないとき、ここにいます。"
      : "This is where I live when I'm not writing code.",
    pinCount: `${filtered.length} ${isJa ? "ピン" : "pins"}`,
  };

  return (
    <div className="hb-page">
      {/* Grain */}
      <div className="hb-grain" />

      {/* Header */}
      <motion.header
        className="hb-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button className="hb-back-btn" onClick={handleBack} data-cursor="disable">
          <MdArrowBack size={13} />
          <span>{isJa ? "ポートフォリオ" : "Portfolio"}</span>
        </button>

        <div className="hb-header-center">
          <span className="hb-header-eyebrow">{i18n.eyebrow}</span>
        </div>

        <div className="hb-header-right">
          <span className="hb-header-count">{i18n.pinCount}</span>
          <button
            className="hb-lang-btn"
            onClick={() => setLanguage(isJa ? "en" : "ja")}
            data-cursor="disable"
          >
            {isJa ? "EN" : "JA"}
          </button>
        </div>

        <motion.div
          className="hb-header-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          style={{ backgroundColor: activeColor }}
        />
      </motion.header>

      {/* Hero */}
      <section className="hb-hero">
        <div className="hb-hero-inner">
          <motion.h1
            className="hb-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {i18n.title1}{" "}
            <span className="hb-hero-accent" style={{ color: activeColor }}>
              {i18n.title2}
            </span>
            <span style={{ color: activeColor }}>.</span>
          </motion.h1>
          <motion.p
            className="hb-hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {i18n.sub}
          </motion.p>
        </div>
        <div className="hb-hero-orb hb-hero-orb--1" style={{ background: activeColor + "18" }} />
        <div className="hb-hero-orb hb-hero-orb--2" />
      </section>

      {/* Filter bar */}
      <motion.div
        className="hb-filter-bar"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            className={`hb-filter-btn${activeCategory === cat.key ? " active" : ""}`}
            onClick={() => setActiveCategory(cat.key)}
            data-cursor="disable"
            style={
              activeCategory === cat.key
                ? { borderColor: cat.color + "66", color: cat.color, background: cat.color + "16" }
                : {}
            }
          >
            {isJa ? cat.labelJa : cat.labelEn}
          </button>
        ))}
      </motion.div>

      {/* Masonry grid */}
      <main className="hb-grid-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="hb-masonry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.map((pin, i) => (
              <PinCard
                key={pin.id}
                pin={pin}
                index={i}
                onClick={() => setActivePin(pin)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {activePin && (
          <PinLightbox pin={activePin} onClose={() => setActivePin(null)} />
        )}
      </AnimatePresence>

      <div className="hb-page-glow" style={{ background: `radial-gradient(ellipse at 50% 0%, ${activeColor}0d 0%, transparent 55%)` }} />
    </div>
  );
};

export default Gallery;
