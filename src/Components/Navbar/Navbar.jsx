import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useSelector} from 'react-redux';
import  LogoutButton  from '../Logout/LogoutButton';


function Navbar() {
  
  const location = useLocation();
  const firstname = useSelector(state => state.data.firstName);
  console.log(firstname);
  return (
    <nav className="main-nav">
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
          <NavLink className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        </div>
      ) : location.pathname === '/profile' ? (
        <div>
          {/* Ajoute le prénom du user ici (remplace par la variable appropriée) */}
          <span className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            <span> {firstname} </span>
          </span>
          
          <LogoutButton />
        </div>
      ) : location.pathname.startsWith('/account-details/') ? (
        <div>
          {/* Utilisez dispatch pour mettre à jour le prénom en fonction des données utilisateur */}
          <span className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            <span> {firstname} </span>
          </span>
          
          {/* Utilisez le composant LogoutButton pour implémenter la déconnexion */}
          <LogoutButton />
        </div>) : (
        <div>
          <NavLink className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
