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

    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const elem = e.currentTarget as HTMLAnchorElement;
          const section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);
  return (
    <>
      <div className="header">
        <button
          className="navbar-certs-btn"
          onClick={() => navigate("/certifications")}
          data-cursor="disable"
        >
          <span className="navbar-certs-icon">✦</span>
          {language === "en" ? "Certifications" : "資格"}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a
            href={`mailto:${data.navbar.email}`}
            className="navbar-connect"
            data-cursor="disable"
          >
            {data.navbar.email}
          </a>
          <button
            onClick={() => setLanguage(language === "en" ? "ja" : "en")}
            style={{
              background: 'transparent',
              border: '1px solid white',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              zIndex: 100,
              pointerEvents: 'auto'
            }}
            data-cursor="disable"
          >
            {language === "en" ? "JA" : "EN"}
          </button>
        </div>
        <ul>
          {data.navbar.links.map((link, index) => (
            <li key={index}>
              <a data-href={link.href} href={link.href}>
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
