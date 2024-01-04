import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetToken, clientHTTP } from "../../Service/apiService";
import { useDispatch } from "react-redux";
import { setToken } from "../../features/dataReducer.js";

// Définition de la fonction LoginForm
function LoginForm() {
  // Utilisation du hook useDispatch pour obtenir le dispatcher Redux
  const dispatch = useDispatch();
  // Utilisation du hook useState pour gérer l'état local des champs username et password
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // Utilisation du hook useNavigate pour gérer la navigation entre les pages
  const navigate = useNavigate();
  // Fonction de gestion de la soumission du formulaire
  const SubmitHandler = async (event) => {
    event.preventDefault();
    try {
      // Appel de la fonction GetToken pour obtenir le jeton d'authentification
      const tokenValue = await GetToken(username, password);
      // console.log("Token Value:", tokenValue);

      // Vérification de l'existence du jeton
      if (tokenValue) {
        // Configuration de l'en-tête d'autorisation pour les requêtes HTTP ultérieures
        clientHTTP.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${tokenValue}`;
        // Dispatch de l'action setToken pour enregistrer le jeton dans le store Redux
        dispatch(setToken(tokenValue));
        // Navigation vers la page '/profile' après une connexion réussie
        navigate("/profile");
        setError(null);
      } else {
        setError("Identifiants incorrects. Veuillez réessayer.");
      }
    } catch (error) {
      // Gestion des erreurs lors de la récupération du jeton
      console.error("Une erreur s'est produite :", error.message);
      setError("Identifiants incorrects. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <div className="sign-in-container">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            {error && <p className="error-message">{error}</p>}
            <form>
              <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                {/* Champ de saisie pour le nom d'utilisateur avec gestion de l'événement onChange */}
                <input
                  type="text"
                  id="username"
                  onChange={(e) => {
                    // Mettre à jour l'état local du nom d'utilisateur
                    setUserName(e.target.value);
                  }}
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                {/* Champ de saisie pour le mot de passe avec gestion de l'événement onChange */}
                <input
                  type="password"
                  id="password"
                  onChange={(e) => {
                    // Mettre à jour l'état local du mot de passe
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="input-remember">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              {/* Bouton de connexion avec gestion de l'événement onClick */}
              <button className="sign-in-button" onClick={SubmitHandler}>
                Sign In
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
// Exportation de la fonction LoginForm
export default LoginForm;
