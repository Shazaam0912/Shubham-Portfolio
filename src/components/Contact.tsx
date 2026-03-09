import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { useLanguage } from "../context/LanguageProvider";
import "./styles/Contact.css";

const Contact = () => {
  const { data } = useLanguage();
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>{data.contact.title}</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>{data.contact.emailLabel}</h4>
            <p>
              <a href={`mailto:${data.contact.email}`} data-cursor="disable">
                {data.contact.email}
              </a>
            </p>
            <h4>{data.contact.phoneLabel}</h4>
            <p>
              <a href={`tel:${data.contact.phone.replace(/\s+/g, '')}`} data-cursor="disable">
                {data.contact.phone}
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>{data.contact.socialLabel}</h4>
            {data.contact.socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                {social.name} <MdArrowOutward />
              </a>
            ))}
          </div>
          <div className="contact-box">
            <h2>
              {data.contact.footer.text1} <br /> {data.contact.footer.text2} <span>{data.contact.footer.name}</span>
            </h2>
            <h5>
              <MdCopyright /> {data.contact.footer.year}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
