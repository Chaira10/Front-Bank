import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

// Définition d'un composant de garde (Guard) pour la gestion de l'accès à des routes protégées
function Guard() {
     // Utilisation de useSelector pour extraire le token du state global géré par Redux
    const token = useSelector((state) => state.data.token);
    // Vérification si un token existe
    if (token) {
        // Si un token existe, autorise l'accès à l'ensemble des routes imbriquées (Outlet)
        return <Outlet />
    }
     // Si aucun token n'existe, redirige vers la page d'accueil ("/")
    return <Navigate to="/" />
}

export default Guard