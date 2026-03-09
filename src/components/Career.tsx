import { useLanguage } from "../context/LanguageProvider";
import "./styles/Career.css";

const Career = () => {
  const { data } = useLanguage();
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          {data.career.title1} <span>{data.career.title2}</span>
          <br /> {data.career.title3}
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {data.career.timeline.map((item, index) => (
            <div className="career-info-box" key={index}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.role}</h4>
                  <h5>{item.company}</h5>
                </div>
                <h3>{item.year}</h3>
              </div>
              <p>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
