import { useLanguage } from "../context/LanguageProvider";
import "./styles/About.css";

const About = () => {
  const { data } = useLanguage();
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">{data.about.title}</h3>
        <p className="para">
          {data.about.description}
        </p>
      </div>
    </div>
  );
};

export default About;
