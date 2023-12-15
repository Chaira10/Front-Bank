import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import "./Accordion.css";

// Définition du composant fonctionnel Accordion avec une prop "details"
const Accordion = ({ details }) => {
  // Utilisation du hook useState pour gérer l'état "isOpen" (ouvert ou fermé)
  const [isOpen, setIsOpen] = useState(false);
  // Fonction pour basculer l'état "isOpen" lors du clic sur l'en-tête de l'accordéon
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
 // Rendu JSX du composant Accordion
  return (
    <div className="accordion-container">

      <div className="container-accordion">
      
        <div className="accordion">
        {/* En-tête de l'accordéon avec icône de flèche vers le haut ou le bas en fonction de l'état "isOpen" */}
          <div className="accordion-header" onClick={toggleAccordion}>
            <p className="icon">
              {isOpen ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </p>
          </div>
        {/* Contenu de l'accordéon, affichant les détails fournis en prop */}
          <div className="accordion-content">
            <p>{details.date}</p>
            <p> {details.description}</p>
            <p> {details.amount}</p>
            <p>{details.balance}</p>
          </div>
        </div>
        {/* Conteneur des détails supplémentaires affichés lorsqu'il est ouvert */}
        <div className="accordion-details-container">
          {isOpen && (
            <div className="accordion-open-details">
              <p>Type: {details.type}</p>
               {/* Affichage de la catégorie avec une icône de stylo (faPen) pour indiquer la possibilité de modification */}
              <p>
                Category: {details.category} <FontAwesomeIcon icon={faPen} />
              </p>
              {/* Affichage de la note avec une icône de stylo (faPen) pour indiquer la possibilité de modification */}
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
// Exportation du composant Accordion pour une utilisation dans d'autres fichiers
export default Accordion;
