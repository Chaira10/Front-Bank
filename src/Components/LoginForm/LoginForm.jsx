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
  // Utilisation du hook useNavigate pour gérer la navigation entre les pages
  const navigate = useNavigate();
  // Fonction de gestion de la soumission du formulaire
  const SubmitHandler = async (event) => {
    event.preventDefault();
    // Affichage des valeurs du nom d'utilisateur et du mot de passe dans la console
    // console.log("Username:", username);
    // console.log("Password:", password);
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
      } else {
        // console.log("Token absent");
      }
    } catch (error) {
      // Gestion des erreurs lors de la récupération du jeton
      console.error(
        "Une erreur s'est produite lors de la récupération du token :",
        error.message
      );
    }
  };

  return (
    <div>
      {/* Conteneur principal */}
      <main className="main bg-dark">
        {/* Section du contenu de la connexion */}
        <section className="sign-in-content">
          {/* Conteneur de connexion */}
          <div className="sign-in-container">
            {/* Icône utilisateur */}
            <i className="fa fa-user-circle sign-in-icon"></i>
            {/* Titre de la section de connexion */}
            <h1>Sign In</h1>
            {/* Formulaire de connexion */}
            <form>
              {/* Champ d'entrée pour le nom d'utilisateur */}
              <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                {/* Champ de saisie pour le nom d'utilisateur avec gestion de l'événement onChange */}
                <input
                  type="text"
                  id="username"
                  onChange={(e) => {
                    // Masquer le message d'erreur lorsque le nom d'utilisateur change
                    document.querySelector(".MsgErrorName").style.display =
                      "none";
                    // Mettre à jour l'état local du nom d'utilisateur
                    setUserName(e.target.value);
                  }}
                />
                {/* Message d'erreur pour le nom d'utilisateur non trouvé */}
                <p className="MsgErrorName">User not found !</p>
              </div>
              {/* Champ d'entrée pour le mot de passe */}
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                {/* Champ de saisie pour le mot de passe avec gestion de l'événement onChange */}
                <input
                  type="password"
                  id="password"
                  onChange={(e) => {
                    // Masquer le message d'erreur lorsque le mot de passe change
                    document.querySelector(".MsgErrorPass").style.display =
                      "none";
                    // Mettre à jour l'état local du mot de passe
                    setPassword(e.target.value);
                  }}
                />
                {/* Message d'erreur pour un mot de passe invalide */}
                <p className="MsgErrorPass"> Password is invalid</p>
              </div>
              {/* Case à cocher pour se souvenir de l'utilisateur */}
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
