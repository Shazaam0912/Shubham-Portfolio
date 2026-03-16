import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MdArrowBack, MdArrowOutward, MdClose, MdOpenInNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageProvider";
import "./Certifications.css";

// ─── Certificate Data ─────────────────────────────────────────────────────────

interface Certificate {
  id: string;
  title: string;
  titleJa: string;
  issuer: string;
  issuerJa: string;
  date: string;
  dateJa: string;
  category: "cloud" | "language" | "programming" | "data" | "database";
  level?: string;
  levelJa?: string;
  image: string;
  link?: string;
  accentColor: string;
  bgGradient: string;
  description: string;
  descriptionJa: string;
  competencies: string[];
  competenciesJa: string[];
}

const CERTIFICATES: Certificate[] = [
  {
    id: "oci-data-science",
    title: "OCI 2025 Certified Data Science Professional",
    titleJa: "OCI 2025 認定データサイエンス プロフェッショナル",
    issuer: "Oracle University",
    issuerJa: "オラクル大学",
    date: "October 26, 2025",
    dateJa: "2025年10月26日",
    category: "cloud",
    level: "Professional",
    levelJa: "プロフェッショナル",
    image: "/certificates/OCI Data Science Professional.jpeg",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=01A976D0B76A10582F9EC3674BF921A8A8C62E62E372B062B6A436DA1E20D74C",
    accentColor: "#f97316",
    bgGradient: "linear-gradient(135deg, #1a0800 0%, #2d1200 100%)",
    description:
      "Enterprise-grade machine learning on Oracle Cloud Infrastructure. Validates mastery of end-to-end ML lifecycle management — from raw data ingestion to production-ready AI solutions deployed at scale. Demonstrates deep expertise in OCI Data Science services, automated ML pipelines, and secure cloud-native AI architecture.",
    descriptionJa:
      "Oracle Cloud Infrastructure上でのエンタープライズグレードの機械学習を証明する資格。生データの取り込みから本番環境へのAIソリューション展開まで、エンドツーエンドのMLライフサイクル管理の習熟度を検証。OCI Data Scienceサービス、自動化MLパイプライン、セキュアなクラウドネイティブAIアーキテクチャの深い専門知識を実証しています。",
    competencies: [
      "End-to-End ML Lifecycle Management",
      "Production Deployment & MLOps",
      "OCI Data Science Services",
      "Automated ML Pipelines",
      "Secure Cloud-Native AI Architecture",
      "Strategic AI Integration",
    ],
    competenciesJa: [
      "エンドツーエンドMLライフサイクル管理",
      "本番環境デプロイ＆MLOps",
      "OCI Data Scienceサービス",
      "自動化MLパイプライン",
      "セキュアなクラウドネイティブAIアーキテクチャ",
      "戦略的AI統合",
    ],
  },
  {
    id: "oci-ai-foundations",
    title: "OCI 2025 Certified AI Foundations Associate",
    titleJa: "OCI 2025 認定AI基礎 アソシエイト",
    issuer: "Oracle University",
    issuerJa: "オラクル大学",
    date: "October 24, 2025",
    dateJa: "2025年10月24日",
    category: "cloud",
    level: "Associate",
    levelJa: "アソシエイト",
    image: "/certificates/OCI AI Foundation.jpeg",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=BBDBA109885851D0A44D473F27F72C0655756FC77AF871ADF5F016AEFEB89AB7",
    accentColor: "#ef4444",
    bgGradient: "linear-gradient(135deg, #1a0000 0%, #2d0808 100%)",
    description:
      "Foundational mastery of AI, ML, and Deep Learning within Oracle Cloud Infrastructure. Bridges the gap between theory and cloud deployment — covering neural networks, generative AI, LLMs, and Oracle's 23ai integration. Demonstrates the ability to architect and evaluate AI solutions on enterprise cloud platforms.",
    descriptionJa:
      "Oracle Cloud Infrastructure内でのAI、ML、ディープラーニングの基礎的な習熟度を証明。理論とクラウドデプロイメントのギャップを埋め、ニューラルネットワーク、生成AI、LLM、Oracleの23ai統合をカバー。エンタープライズクラウドプラットフォーム上でAIソリューションを設計・評価する能力を実証しています。",
    competencies: [
      "AI, ML & Deep Learning Architecture",
      "Neural Networks (CNN, RNN, LSTM)",
      "Generative AI & Large Language Models",
      "OCI AI Ecosystem & Services",
      "Oracle 23ai & Select AI Integration",
      "Cloud AI Solution Design",
    ],
    competenciesJa: [
      "AI・ML・ディープラーニングアーキテクチャ",
      "ニューラルネットワーク（CNN、RNN、LSTM）",
      "生成AI・大規模言語モデル",
      "OCI AIエコシステム＆サービス",
      "Oracle 23ai・Select AI統合",
      "クラウドAIソリューション設計",
    ],
  },
  {
    id: "jlpt-n5",
    title: "JLPT N5 — Japanese Language Proficiency",
    titleJa: "JLPT N5 — 日本語能力試験",
    issuer: "Japan Foundation & JEES",
    issuerJa: "国際交流基金・日本国際教育支援協会",
    date: "August 12, 2025",
    dateJa: "2025年8月12日",
    category: "language",
    level: "N5",
    levelJa: "N5",
    image: "/certificates/JLPT n5.jpeg",
    accentColor: "#c2a4ff",
    bgGradient: "linear-gradient(135deg, #0d0820 0%, #1a1040 100%)",
    description:
      "Certified Japanese language proficiency at JLPT N5 — the internationally recognized benchmark administered jointly by the Japan Foundation and JEES. Passed in July 2025, demonstrating mastery of hiragana, katakana, ~100 kanji, ~800 vocabulary words, and elementary grammar. A milestone on an active journey toward full Japanese fluency, directly fueling the development of Talytoki.",
    descriptionJa:
      "国際交流基金と日本国際教育支援協会が共同で実施する国際的に認められた日本語能力試験JLPT N5に合格。2025年7月に合格し、ひらがな・カタカナ・漢字約100字・語彙約800語・初級文法の習熟度を実証。日本語完全習得への積極的な旅の節目であり、Talytokiの開発に直接つながっています。",
    competencies: [
      "Hiragana & Katakana Mastery",
      "Basic Kanji Recognition (~100 characters)",
      "Elementary Grammar Structures",
      "Everyday Vocabulary (~800 words)",
      "Simple Reading Comprehension",
      "Basic Listening & Comprehension",
    ],
    competenciesJa: [
      "ひらがな・カタカナの習熟",
      "基本漢字の認識（約100字）",
      "初級文法構造",
      "日常語彙（約800語）",
      "簡単な読解力",
      "基本的なリスニング＆理解力",
    ],
  },
  {
    id: "python",
    title: "The Legend of Python",
    titleJa: "Pythonの伝説",
    issuer: "Codédex",
    issuerJa: "Codédex",
    date: "September 30, 2025",
    dateJa: "2025年9月30日",
    category: "programming",
    image: "/certificates/python.png",
    accentColor: "#facc15",
    bgGradient: "linear-gradient(135deg, #0f0e00 0%, #1e1c00 100%)",
    description:
      "Completed Codédex's flagship Python course — 50+ hours of intensive, hands-on coding covering fundamentals through advanced OOP. Verified by Accredible with two expert-reviewed projects. Demonstrates strong Python proficiency directly applied to data science pipelines, AI tooling, and backend development across multiple portfolio projects.",
    descriptionJa:
      "Codédexの主力Pythonコースを修了 — 基礎から高度なOOPまでをカバーする50時間以上の集中的な実践コーディング。Accredibleによって認証され、2つの専門家レビュープロジェクトを含む。複数のポートフォリオプロジェクトにわたるデータサイエンスパイプライン、AIツール、バックエンド開発に直接応用される強力なPython習熟度を実証しています。",
    competencies: [
      "Python Fundamentals & Syntax",
      "Control Flow, Loops & Functions",
      "Lists, Dictionaries & Data Structures",
      "Object-Oriented Programming (OOP)",
      "Modules, Packages & File I/O",
      "2 Expert-Reviewed Capstone Projects",
    ],
    competenciesJa: [
      "Pythonの基礎と構文",
      "制御フロー・ループ・関数",
      "リスト・辞書・データ構造",
      "オブジェクト指向プログラミング（OOP）",
      "モジュール・パッケージ・ファイルI/O",
      "専門家レビュー付き2つのキャップストーンプロジェクト",
    ],
  },
  {
    id: "sql",
    title: "SQL for Beginners — MySQL & Database Design",
    titleJa: "SQL入門 — MySQL＆データベース設計",
    issuer: "Scaler Topics",
    issuerJa: "Scaler Topics",
    date: "July 21, 2024",
    dateJa: "2024年7月21日",
    category: "database",
    image: "/certificates/SQL by Scalar.jpeg",
    accentColor: "#38bdf8",
    bgGradient: "linear-gradient(135deg, #00101a 0%, #001e30 100%)",
    description:
      "Certificate of Excellence from Scaler Topics for completing the SQL for Beginners course — covering MySQL, relational database design, and query optimization. Completed 48 video tutorials, 5 structured modules, and 5 hands-on challenges. Directly applied to data analysis workflows, backend database architecture, and the stock prediction project's data pipeline.",
    descriptionJa:
      "Scaler TopicsのSQL入門コース修了に対する優秀証明書 — MySQL、リレーショナルデータベース設計、クエリ最適化をカバー。48本のビデオチュートリアル、5つの構造化モジュール、5つの実践チャレンジを完了。データ分析ワークフロー、バックエンドデータベースアーキテクチャ、株価予測プロジェクトのデータパイプラインに直接応用されています。",
    competencies: [
      "SQL Query Writing & Optimization",
      "MySQL Relational Database Design",
      "Joins, Subqueries & Aggregations",
      "Database Normalization Principles",
      "48 Video Tutorials Completed",
      "5 Modules · 5 Hands-On Challenges",
    ],
    competenciesJa: [
      "SQLクエリの記述と最適化",
      "MySQLリレーショナルデータベース設計",
      "結合・サブクエリ・集計",
      "データベース正規化の原則",
      "48本のビデオチュートリアル修了",
      "5モジュール・5つの実践チャレンジ",
    ],
  },
  {
    id: "college-data-science",
    title: "Data Science & Analytics",
    titleJa: "データサイエンス＆アナリティクス",
    issuer: "St. Joseph's University",
    issuerJa: "セントジョセフ大学",
    date: "April 7, 2025",
    dateJa: "2025年4月7日",
    category: "data",
    image: "/certificates/College Data Science .jpeg",
    accentColor: "#4ade80",
    bgGradient: "linear-gradient(135deg, #001a08 0%, #002d10 100%)",
    description:
      "University certificate course in Data Science & Analytics conducted by the Department of Statistics at St. Joseph's University, Bengaluru. Completed with Grade B during academic year 2024–25. Covers statistical analysis, data science methodology, and analytics frameworks — forming the academic backbone of my data-driven project work.",
    descriptionJa:
      "バンガロールのセントジョセフ大学統計学部が実施するデータサイエンス＆アナリティクスの大学認定コース。2024〜25年度にBグレードで修了。統計分析、データサイエンス方法論、アナリティクスフレームワークをカバーし、データ駆動型プロジェクト作業の学術的基盤を形成しています。",
    competencies: [
      "Statistical Analysis & Inference",
      "Data Science Methodology",
      "Analytics Frameworks & Tools",
      "Research Design & Insights",
      "Grade B — Academic Year 2024–25",
      "3 Academic Credits Awarded",
    ],
    competenciesJa: [
      "統計分析と推論",
      "データサイエンス方法論",
      "アナリティクスフレームワーク＆ツール",
      "研究設計とインサイト",
      "Bグレード — 2024〜25年度",
      "3単位取得",
    ],
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  cloud: "#f97316",
  language: "#c2a4ff",
  programming: "#facc15",
  data: "#4ade80",
  database: "#38bdf8",
};

const CATEGORY_LABELS_EN: Record<string, string> = {
  cloud: "Cloud & AI",
  language: "Language",
  programming: "Programming",
  data: "Data Science",
  database: "Database",
};

const CATEGORY_LABELS_JA: Record<string, string> = {
  cloud: "クラウド＆AI",
  language: "言語",
  programming: "プログラミング",
  data: "データサイエンス",
  database: "データベース",
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────

const Lightbox = ({
  cert,
  onClose,
  isJa,
}: {
  cert: Certificate;
  onClose: () => void;
  isJa: boolean;
}) => {
  const CATEGORY_LABELS = isJa ? CATEGORY_LABELS_JA : CATEGORY_LABELS_EN;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const title = isJa ? cert.titleJa : cert.title;
  const issuer = isJa ? cert.issuerJa : cert.issuer;
  const date = isJa ? cert.dateJa : cert.date;
  const description = isJa ? cert.descriptionJa : cert.description;
  const competencies = isJa ? cert.competenciesJa : cert.competencies;
  const compLabel = isJa ? "コアコンピテンシー" : "Core Competencies";
  const verifyLabel = isJa ? "証明書を確認する" : "Verify Certificate";

  return (
    <AnimatePresence>
      <motion.div
        className="cert-lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
        <motion.div
          className="cert-lightbox-panel"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{ borderColor: cert.accentColor + "33" }}
        >
          {/* Header */}
          <div className="cert-lightbox-header">
            <div className="cert-lightbox-meta">
              <span
                className="cert-lightbox-category"
                style={{ color: cert.accentColor, borderColor: cert.accentColor + "44" }}
              >
                {CATEGORY_LABELS[cert.category]}
              </span>
              <h2 className="cert-lightbox-title">{title}</h2>
              <p className="cert-lightbox-issuer">{issuer} · {date}</p>
            </div>
            <button className="cert-lightbox-close" onClick={onClose} data-cursor="disable">
              <MdClose size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="cert-lightbox-body">
            {/* Image */}
            <div className="cert-lightbox-img-wrap" style={{ boxShadow: `0 0 60px ${cert.accentColor}22` }}>
              <img src={cert.image} alt={title} className="cert-lightbox-img" />
            </div>

            {/* Details */}
            <div className="cert-lightbox-details">
              <p className="cert-lightbox-desc">{description}</p>

              <div className="cert-lightbox-competencies">
                <p className="cert-lightbox-comp-label">{compLabel}</p>
                <div className="cert-lightbox-comp-grid">
                  {competencies.map((c, i) => (
                    <motion.div
                      key={i}
                      className="cert-lightbox-comp-item"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                      style={{ borderColor: cert.accentColor + "33" }}
                    >
                      <span
                        className="cert-comp-dot"
                        style={{ backgroundColor: cert.accentColor }}
                      />
                      {c}
                    </motion.div>
                  ))}
                </div>
              </div>

              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-lightbox-cta"
                  style={{ borderColor: cert.accentColor, color: cert.accentColor }}
                  data-cursor="disable"
                >
                  {verifyLabel} <MdOpenInNew size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Accent glow */}
          <div
            className="cert-lightbox-glow"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${cert.accentColor}18 0%, transparent 60%)` }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Certificate Card ─────────────────────────────────────────────────────────

const CertCard = ({
  cert,
  index,
  onClick,
  isJa,
}: {
  cert: Certificate;
  index: number;
  onClick: () => void;
  isJa: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const CATEGORY_LABELS = isJa ? CATEGORY_LABELS_JA : CATEGORY_LABELS_EN;

  const title = isJa ? cert.titleJa : cert.title;
  const issuer = isJa ? cert.issuerJa : cert.issuer;
  const date = isJa ? cert.dateJa : cert.date;
  const description = isJa ? cert.descriptionJa : cert.description;
  const competencies = isJa ? cert.competenciesJa : cert.competencies;
  const level = isJa ? (cert.levelJa ?? cert.level) : cert.level;
  const viewLabel = isJa ? "詳細を見る" : "View";

  return (
    <motion.div
      ref={ref}
      className="cert-card"
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      data-cursor="disable"
      style={{ background: cert.bgGradient }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      {/* Top accent line */}
      <motion.div
        className="cert-card-line"
        style={{ backgroundColor: cert.accentColor }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.08 + 0.3, ease: "easeOut" }}
      />

      {/* Category badge */}
      <div className="cert-card-top">
        <span
          className="cert-card-category"
          style={{ color: cert.accentColor, borderColor: cert.accentColor + "44" }}
        >
          {CATEGORY_LABELS[cert.category]}
        </span>
        {level && (
          <span
            className="cert-card-level"
            style={{ color: cert.accentColor + "cc" }}
          >
            {level}
          </span>
        )}
      </div>

      {/* Certificate image preview */}
      <div className="cert-card-img-wrap">
        <img src={cert.image} alt={title} className="cert-card-img" />
        <div className="cert-card-img-overlay" />
        <div className="cert-card-view-hint" style={{ color: cert.accentColor }}>
          <MdArrowOutward size={16} />
          <span>{viewLabel}</span>
        </div>
      </div>

      {/* Info */}
      <div className="cert-card-info">
        <h3 className="cert-card-title">{title}</h3>
        <div className="cert-card-meta">
          <span className="cert-card-issuer">{issuer}</span>
          <span className="cert-card-sep">·</span>
          <span className="cert-card-date">{date}</span>
        </div>
        <p className="cert-card-desc">{description}</p>
      </div>

      {/* Bottom row */}
      <div className="cert-card-footer">
        <div className="cert-card-pills">
          {competencies.slice(0, 3).map((c, i) => (
            <span
              key={i}
              className="cert-card-pill"
              style={{ borderColor: cert.accentColor + "33", color: "#aaa" }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Glow */}
      <div
        className="cert-card-glow"
        style={{ background: `radial-gradient(ellipse at 50% 100%, ${cert.accentColor}14 0%, transparent 65%)` }}
      />
    </motion.div>
  );
};

// ─── Stats Bar ────────────────────────────────────────────────────────────────

const StatsBar = ({ isJa }: { isJa: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const stats = isJa
    ? [
        { value: "6", label: "資格" },
        { value: "4", label: "分野" },
        { value: "2+", label: "年間活動" },
        { value: "N5", label: "日本語レベル" },
      ]
    : [
        { value: "6", label: "Certifications" },
        { value: "4", label: "Domains" },
        { value: "2+", label: "Years Active" },
        { value: "N5", label: "Japanese Level" },
      ];

  return (
    <motion.div
      ref={ref}
      className="cert-stats"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {stats.map((s, i) => (
        <div key={i} className="cert-stat-item">
          <motion.span
            className="cert-stat-value"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
          >
            {s.value}
          </motion.span>
          <span className="cert-stat-label">{s.label}</span>
        </div>
      ))}
    </motion.div>
  );
};

// ─── Filter Bar ───────────────────────────────────────────────────────────────

const FILTERS = ["all", "cloud", "language", "programming", "data", "database"] as const;
type Filter = (typeof FILTERS)[number];

// ─── Main Page ────────────────────────────────────────────────────────────────

const Certifications = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const isJa = language === "ja";
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  // Enable page scroll (portfolio sets overflow: hidden globally)
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  const filtered =
    activeFilter === "all"
      ? CERTIFICATES
      : CERTIFICATES.filter((c) => c.category === activeFilter);

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  const CATEGORY_LABELS = isJa ? CATEGORY_LABELS_JA : CATEGORY_LABELS_EN;

  const i18n = {
    credentials: isJa ? "資格情報" : "Credentials",
    certCount: isJa ? `${CERTIFICATES.length}件の資格` : `${CERTIFICATES.length} certificates`,
    portfolio: isJa ? "ポートフォリオ" : "Portfolio",
    eyebrow: isJa ? "認定済み・発行済み" : "Verified & Issued",
    heroTitle1: isJa ? "私の" : "My",
    heroTitle2: isJa ? "資格" : "Certifications",
    heroSub: isJa
      ? "クラウドインフラ、AI、データサイエンス、プログラミング、言語能力にわたる資格のキュレーションコレクション。"
      : "A curated collection of credentials spanning cloud infrastructure, AI, data science, programming, and language proficiency.",
    filterAll: isJa ? "すべて" : "All",
  };

  return (
    <div className="cert-page">
      {/* Grain overlay */}
      <div className="cert-grain" />

      {/* ── Header ── */}
      <motion.header
        className="cert-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <button className="cert-back-btn" onClick={handleBack} data-cursor="disable">
          <MdArrowBack size={13} />
          <span>{i18n.portfolio}</span>
        </button>

        <div className="cert-header-center">
          <span className="cert-header-eyebrow">{i18n.credentials}</span>
        </div>

        <div className="cert-header-right" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span className="cert-header-count">{i18n.certCount}</span>
          <button
            onClick={() => setLanguage(isJa ? "en" : "ja")}
            data-cursor="disable"
            className="cert-lang-btn"
          >
            {isJa ? "EN" : "JA"}
          </button>
        </div>

        {/* Animated bottom line */}
        <motion.div
          className="cert-header-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        />
      </motion.header>

      {/* ── Hero ── */}
      <section className="cert-hero">
        <div className="cert-hero-inner">
          <motion.div
            className="cert-hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="cert-hero-dot" />
            {i18n.eyebrow}
          </motion.div>

          <motion.h1
            className="cert-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {i18n.heroTitle1}
            <br />
            <span className="cert-hero-title-accent">{i18n.heroTitle2}</span>
            <span className="cert-hero-title-dot" style={{ color: "#c2a4ff" }}>.</span>
          </motion.h1>

          <motion.p
            className="cert-hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            {i18n.heroSub}
          </motion.p>

          <StatsBar isJa={isJa} />
        </div>

        {/* Decorative floating orbs */}
        <div className="cert-hero-orb cert-hero-orb--1" />
        <div className="cert-hero-orb cert-hero-orb--2" />
        <div className="cert-hero-orb cert-hero-orb--3" />
      </section>

      {/* ── Filter Bar ── */}
      <motion.div
        className="cert-filter-bar"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`cert-filter-btn${activeFilter === f ? " active" : ""}`}
            onClick={() => setActiveFilter(f)}
            data-cursor="disable"
            style={
              activeFilter === f && f !== "all"
                ? {
                    borderColor: CATEGORY_COLORS[f] + "66",
                    color: CATEGORY_COLORS[f],
                    background: CATEGORY_COLORS[f] + "14",
                  }
                : activeFilter === f
                ? { borderColor: "#c2a4ff66", color: "#c2a4ff", background: "#c2a4ff14" }
                : {}
            }
          >
            {f === "all" ? i18n.filterAll : CATEGORY_LABELS[f]}
          </button>
        ))}
      </motion.div>

      {/* ── Grid ── */}
      <main className="cert-grid-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="cert-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.map((cert, i) => (
              <CertCard
                key={cert.id}
                cert={cert}
                index={i}
                onClick={() => setActiveCert(cert)}
                isJa={isJa}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {activeCert && (
          <Lightbox cert={activeCert} onClose={() => setActiveCert(null)} isJa={isJa} />
        )}
      </AnimatePresence>

      {/* Page glow */}
      <div className="cert-page-glow" />
    </div>
  );
};

export default Certifications;
