import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useSelector} from 'react-redux';
import  LogoutButton  from '../Logout/LogoutButton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleUser}  from "@fortawesome/free-solid-svg-icons";

// Définition de la fonction Navbar
function Navbar() {
  // Obtention de l'objet location pour connaître le chemin actuel
  const location = useLocation();
  // Utilisation du hook useSelector pour accéder à la propriété firstName du state Redux
  const firstname = useSelector(state => state.data.firstName);
  // console.log(firstname);
  // Rendu JSX du composant Navbar
  return (
    <nav className="main-nav">
    {/* Logo et lien vers la page d'accueil */}
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/images/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>

      {/* Condition pour afficher différemment en fonction de l'URL */}
      {location.pathname === '/login' ? (
        <div>
        {/* Lien vers la page de connexion */}
          <NavLink className="main-nav-item" to="/login">
          <FontAwesomeIcon icon={faCircleUser} />
            Sign In
          </NavLink>
        </div>
      ) : location.pathname === '/profile' ? (
        <div>
          {/* Affichage du nom de l'utilisateur et bouton de déconnexion sur la page de profil */}
          <span className="main-nav-item">
          <FontAwesomeIcon icon={faCircleUser} />
            <span> {firstname} </span>
          </span>
          <LogoutButton />
        </div>
      ) : location.pathname.startsWith('/account-details/') ? (
        <div>
          {/* Affichage du nom de l'utilisateur et bouton de déconnexion sur la page des détails du compte */}
          <span className="main-nav-item">
          <FontAwesomeIcon icon={faCircleUser} />
            <span> {firstname} </span>
          </span>
          <LogoutButton />
        </div>) : (
        <div>
        {/* Lien vers la page de connexion pour les autres pages */}
          <NavLink className="main-nav-item" to="/login">
          <FontAwesomeIcon icon={faCircleUser} />
            Sign In
          </NavLink>
        </div>
      )}
    </nav>
  );
}
// Exportation du composant Navbar 
export default Navbar;
