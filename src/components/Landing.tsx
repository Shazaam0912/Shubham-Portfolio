import { PropsWithChildren, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageProvider";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const { data, language } = useLanguage();
  const prevLanguage = useRef(language);

  useEffect(() => {
    if (prevLanguage.current !== language) {
      prevLanguage.current = language;
      // dynamically import so SplitText is available
      import("./utils/initialFX").then((module) => {
        if (module.animateLandingText) {
          module.animateLandingText();
        }
      });
    }
  }, [language]);

  return (
    <>
      <div className={`landing-section ${language === 'ja' ? 'lang-ja' : ''}`} id="landingDiv">
        <div className="landing-container" key={language}>
          <div className="landing-intro">
            <h2>{data.landing.intro1}</h2>
            <h1>
              {data.landing.firstName}
              <br />
              <span>{data.landing.lastName}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>{data.landing.info1}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{data.landing.roles[0]}</div>
              <div className="landing-h2-2">{data.landing.roles[1]}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{data.landing.roles[1]}</div>
              <div className="landing-h2-info-1">{data.landing.roles[0]}</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
