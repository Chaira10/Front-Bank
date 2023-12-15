import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./Profile.css";
import {  getAccount } from "../../Service/Mock";
import { setFirstName, setLastName, setEmail, setId } from "../../features/dataReducer";
import { useSelector, useDispatch } from 'react-redux';
import { SaveProfilData, GetUserData } from "../../Service/apiService";



function Profile() {
  // Utilisation du hook useDispatch pour obtenir le dispatcher Redux
  const dispatch = useDispatch();
  // État local pour gérer le mode édition
  const [isEditing, setEditing] = useState(false);
  // Sélection des valeurs firstName et lastName depuis le state Redux
  const firstName = useSelector((state) => state.data.firstName);
  const lastName = useSelector((state) => state.data.lastName);
  // États locaux pour stocker les valeurs éditées de firstName et lastName
  const [editedFirstName, setEditedFirstName] = useState(firstName);
  const [editedLastName, setEditedLastName] = useState(lastName);

  // Utilisation du hook useNavigate pour gérer la navigation entre les pages
  const navigate = useNavigate();
  // État local pour stocker les détails du compte
  const [accountDetails, setAccountDetails] = useState(null);
  // Référence au formulaire pour récupérer les valeurs des champs éditables
  const form = useRef();
// Fonction asynchrone pour récupérer les données utilisateur au chargement du composant
useEffect(() => {
  const fetchData = async () => {
    try {
      const UserData = await GetUserData();
      dispatch(setEmail(UserData.email));
      dispatch(setFirstName(UserData.firstName));
      dispatch(setLastName(UserData.lastName));
      dispatch(setId(UserData.id));

      // Initialisez les états éditables avec les valeurs de firstName et lastName
      setEditedFirstName(UserData.firstName);
      setEditedLastName(UserData.lastName);
    } catch (error) {
      console.error("Erreur lors de la récupération des données utilisateur :", error.message);
    }
  };

  fetchData();
}, [dispatch]);
 // Sélection de l'ID utilisateur depuis le state Redux
const userId = useSelector((state) => state.data.id);
// console.log(userId);
  
  // Utilisation du hook useEffect pour récupérer les détails du compte lors du chargement du composant
  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        // Appel de la fonction getSousTransactions pour obtenir les détails du compte
        const accountDetailsData = await  getAccount(userId);
        // Mise à jour de l'état local des détails du compte
        setAccountDetails(accountDetailsData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des sous-transactions :",
          error.message
        );
      }
    };
    // Appel de la fonction fetchAccountDetails au montage du composant ou lors des changements des dépendances
    fetchAccountDetails();
  }, [userId]); 
console.log(accountDetails);
  // Gestion du clic sur le bouton d'édition
  const handleEditClick = () => {
    setEditing(true);
  };
  // Gestion du clic sur le bouton de sauvegarde
  const handleSaveClick = async (e) => {
    // Empêcher le comportement par défaut du formulaire
    e.preventDefault();
    try {
      // Récupération des nouvelles valeurs de firstName et lastName depuis le formulaire
      const newFirstname = form.current[0].value;
      const newLastname = form.current[1].value;
      // Appel de la fonction SaveProfilData pour sauvegarder les données du profil
      const postData =  SaveProfilData( newFirstname, newLastname);
      // Dispatch des actions Redux pour mettre à jour les valeurs dans le state
      dispatch(setFirstName(editedFirstName));
      dispatch(setLastName(editedLastName));
      // Affichage des nouvelles valeurs et arrêt du mode édition
      console.log(postData,newFirstname ,newLastname);
      setEditing(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données de profil :", error.message);
    }
  };
  
  // Gestion du clic sur le bouton d'annulation de l'édition
  const handleCancelClick = () => {
    setEditing(false);
  };

  return (
    <div>
      <Navbar />
      <main className="main bg-secondary">
        <div className="header">
        {/* Condition pour vérifier si le mode édition est activé */}
          {isEditing ? (
            <div>
            {/* Contenu affiché en mode édition */}
              <div className="text-container">
                <h1 className="text-dark">Welcome back</h1>
              </div>
              {/* Formulaire d'édition des noms */}
              <form ref={form}>
              <div className="input-container">
              <input
                        className="prenom"
                        type="text"
                        value={editedFirstName}
                        onChange={(e) => setEditedFirstName(e.target.value)}
                      />
                      <input
                        className="nom"
                        type="text"
                        value={editedLastName}
                        onChange={(e) => setEditedLastName(e.target.value)}
                      />
              </div>
               {/* Boutons pour sauvegarder ou annuler l'édition */}
              <div className="btn-container">
                <button className="save-button" onClick={handleSaveClick}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
              </form>
            </div>
          ) : (
            <div>
             {/* Contenu affiché en mode non-édition */}
              <h1 className="text-dark">
                Welcome back
                <br />
                {firstName} {lastName}!
              </h1>
              {/* Bouton pour activer le mode édition */}
              <button className="edit-button" onClick={handleEditClick}>
                Edit Name
              </button>
            </div>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>

        <div>
          {/* Titre de la section "Account Details" */}
          <h2>Account Details</h2>
          {/* Condition pour vérifier si les détails du compte sont disponibles */}
          {accountDetails ? (
    <div>
      {/* Parcourir les détails de chaque compte */}
      <section key={accountDetails.user_id}>
        {/* Section pour afficher les informations de chaque compte */}
        <div className="account">
          {/* Contenu du compte courant */}
          <div className="account-content-wrapper">
            <p> {accountDetails.account_checking_name}</p>
            <p> {accountDetails.checking_balance}</p>
            <p> Available Balance </p>
          </div>
          {/* Boutons d'action pour afficher les transactions du compte courant */}
          <div className="cta">
            <button className="transaction-button" onClick={() => navigate(`/account-details/${accountDetails.account_id_checking}`)}>View transactions</button>
          </div>
        </div>
        {/* Section pour afficher les informations du compte d'épargne */}
        <div className="account">
          {/* Contenu du compte d'épargne */}
          <div className="account-content-wrapper">
            <p> {accountDetails.account_saving_name}</p>
            <p> {accountDetails.saving_balance}</p>
            <p> Available Balance </p>
          </div>
          {/* Boutons d'action pour afficher les transactions du compte d'épargne */}
          <div className="cta">
            <button className="transaction-button" onClick={() => navigate(`/account-details/${accountDetails.account_id_saving}`)}>View transactions</button>
          </div>
        </div>
        {/* Section pour afficher les informations du compte de crédit */}
        <div className="account">
          {/* Contenu du compte de crédit */}
          <div className="account-content-wrapper">
            <p> {accountDetails.account_credit_name}</p>
            <p> {accountDetails.credit_balance}</p>
            <p> Current Balance </p>
          </div>
          {/* Boutons d'action pour afficher les transactions du compte de crédit */}
          <div className="cta">
            <button className="transaction-button" onClick={() => navigate(`/account-details/${accountDetails.account_id_credit}`)}>View transactions</button>
          </div>
        </div>
      </section>
    </div>
  ) : (
    // Affichez un message de chargement ou une gestion d'erreur si les données ne sont pas disponibles
    <p>Chargement des données...</p>
  )}
</div>
      </main>
      <Footer />
    </div>
  );
}
// Exportation de la fonction Profile 
export default Profile;
