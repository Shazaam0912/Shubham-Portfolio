import { useLanguage } from "../context/LanguageProvider";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

// Map project index to route id
const PROJECT_IDS = ["talytoki", "stock-prediction", "parallel-universe", "workorbit", "smart-home"];

// Thumbnail images per project
const PROJECT_THUMBS: Record<string, string> = {
  talytoki: "https://img.youtube.com/vi/WdSx_qvylQU/maxresdefault.jpg",
  "stock-prediction": "/Projects/stock-prediction-R/1.png",
  "parallel-universe": "/Projects/Parallel%20Universe/FRONT.png",
  workorbit: "/Projects/cordona-hackathon/IBW.jpeg",
  "smart-home": "https://img.youtube.com/vi/oWgJ38PCQ0Y/maxresdefault.jpg",
};

const Work = () => {
  const { data } = useLanguage();
  useLayoutEffect(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${translateX}`,
        scrub: true,
        pin: true,
        pinType: "transform",
        id: "work",
        invalidateOnRefresh: true,
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  const projects = data.work.projects;

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          {data.work.title1} <span>{data.work.title2}</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => {
            const projectId = PROJECT_IDS[index] ?? `project-${index}`;
            const thumb = PROJECT_THUMBS[projectId] ?? "/images/placeholder.webp";
            return (
              <div className="work-box" key={index}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>0{index + 1}</h3>
                    <div>
                      <h4>{project.name}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4>{data.work.toolsLabel}</h4>
                  <p>{project.tools}</p>
                  <Link
                    to={`/projects/${projectId}`}
                    className="work-view-btn"
                    data-cursor="disable"
                  >
                    View Details <MdArrowOutward />
                  </Link>
                </div>
                <WorkImage image={thumb} alt={project.name} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Work;
