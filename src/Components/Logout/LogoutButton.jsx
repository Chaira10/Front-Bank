import { useDispatch } from 'react-redux';
import { SetSignOut } from '../../features/dataReducer.js';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket}  from "@fortawesome/free-solid-svg-icons";

// Définition de la fonction LogoutButton
function LogoutButton() {
  // Utilisation du hook useDispatch pour obtenir le dispatcher Redux
  const dispatch = useDispatch();
  // Utilisation du hook useNavigate pour gérer la navigation entre les pages
  const navigate = useNavigate();
   // Fonction de gestion du clic sur le bouton de déconnexion
  const handleLogout = () => {
    // Dispatch de l'action SetSignOut pour déconnecter l'utilisateur (mettre à jour l'état d'authentification)
    dispatch(SetSignOut());
    // Navigation vers la page d'accueil après la déconnexion
    navigate('/');
  };
  // Rendu JSX du composant LogoutButton
  return (
    <button className="btn-logout" onClick={handleLogout}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Sign Out</button>
  );
}
// Exportation du composant LogoutButton pour une utilisation dans d'autres fichiers
export default LogoutButton;
