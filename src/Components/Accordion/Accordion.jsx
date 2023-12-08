import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import "./Accordion.css";

const Accordion = ({ details }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-container">

      <div className="container-accordion">
      
        <div className="accordion">
          <div className="accordion-header" onClick={toggleAccordion}>
            <p className="icon">
              {isOpen ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </p>
          </div>

          <div className="accordion-content">
            <p>{details.date}</p>
            <p> {details.description}</p>
            <p> {details.amount}</p>
            <p>{details.balance}</p>
          </div>
        </div>
        <div className="accordion-details-container">
          {isOpen && (
            <div className="accordion-open-details">
              <p>Type: {details.type}</p>
              <p>
                Category: {details.category} <FontAwesomeIcon icon={faPen} />
              </p>
              <p>
                Note: {details.note} <FontAwesomeIcon icon={faPen} />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
