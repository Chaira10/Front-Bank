import { useDispatch } from 'react-redux';
import { SetSignOut } from '../../features/dataReducer.js';
import { useNavigate } from 'react-router-dom';
import './LogoutButton.css'

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch l'action SetSignOut pour effectuer la déconnexion
    dispatch(SetSignOut());
    // Redirige l'utilisateur vers la page d'accueil après la déconnexion
    navigate('/');
  };

  return (
    <button className="btn-logout" onClick={handleLogout}>SignOut</button>
  );
}

export default LogoutButton;
