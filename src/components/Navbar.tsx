import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useLanguage } from "../context/LanguageProvider";
import { setSmoother, smoother } from "./utils/smoother";
import { useNavigate } from "react-router-dom";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const Navbar = () => {
  const { data, language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const s = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });
    setSmoother(s);

    s.scrollTop(0);
    s.paused(true);

    const handleResize = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.startsWith("/")) {
      navigate(href);
      return;
    }

    if (window.location.pathname !== "/") {
      navigate("/" + href);
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
      return;
    }
    
    const target = document.querySelector(href);
    if (!target) return;

    if (window.innerWidth > 1024 && smoother) {
      smoother.scrollTo(href, true, "top top");
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="header">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            className="navbar-certs-btn"
            onClick={() => navigate("/certifications")}
            data-cursor="disable"
          >
            <span className="navbar-certs-icon">✦</span>
            {language === "en" ? "Certifications" : "資格"}
          </button>
          <button
            className="navbar-certs-btn"
            onClick={() => navigate("/gallery")}
            data-cursor="disable"
          >
            <span className="navbar-certs-icon">◈</span>
            {language === "en" ? "Gallery" : "ギャラリー"}
          </button>
        </div>
        <div className="navbar-center-group">
          <a
            href={`mailto:${data.navbar.email}`}
            className="navbar-connect"
            data-cursor="disable"
          >
            {data.navbar.email}
          </a>
          <button
            className="navbar-lang-btn"
            onClick={() => setLanguage(language === "en" ? "ja" : "en")}
            data-cursor="disable"
          >
            {language === "en" ? "JA" : "EN"}
          </button>
        </div>
        <ul>
          {data.navbar.links.map((link, index) => (
            <li key={index}>
              <a 
                data-href={link.href} 
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                <HoverLinks text={link.text} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
