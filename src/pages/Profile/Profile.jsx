import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./Profile.css";
import { getSousTransactions } from "../../Service/Mock";
import { setFirstName, setLastName, setEmail } from "../../features/dataReducer";
import { useSelector, useDispatch } from 'react-redux';
import { SaveProfilData, GetUserData } from "../../Service/apiService";



function Profile() {
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState(false);
  // Utilisez useSelector pour obtenir les informations du store
  const firstName = useSelector((state) => state.data.firstName);
  const lastName = useSelector((state) => state.data.lastName);
  // Utilisez les états locaux pour gérer les changements en cours d'édition
  const [editedFirstName, setEditedFirstName] = useState(firstName);
  const [editedLastName, setEditedLastName] = useState(lastName);
  const navigate = useNavigate();
  const [accountDetails, setAccountDetails] = useState(null);
  const userId = "6568ca4f4c6092001e4cf0fe";
  const form = useRef();
    // Utilisez useSelector pour obtenir le token du store
    const token = useSelector((state) => state.data.token);
    // Créez une fonction asynchrone pour gérer la récupération des données utilisateur
const fetchData = async () => {
  try {
    const UserData = await GetUserData();
    dispatch(setEmail(UserData.email));
    dispatch(setFirstName(UserData.firstName));
    dispatch(setLastName(UserData.lastName));
    setEditedFirstName(UserData.firstName);
    setEditedLastName(UserData.lastName);
  } catch (error) {
    console.error("Erreur lors de la récupération des données utilisateur :", error.message);
    // Gérez l'erreur ici, affichez un message à l'utilisateur, par exemple
  }
};

// Appelez la fonction asynchrone
fetchData();
console.log(fetchData());


  useEffect(() => {
    // Appelez la fonction pour récupérer les sous-transactions
    const fetchAccountDetails = async () => {
      try {
        const accountDetailsData = await getSousTransactions(userId);
        setAccountDetails(accountDetailsData);
      } catch (error) {
        // Gérez les erreurs si nécessaire
        console.error(
          "Erreur lors de la récupération des sous-transactions :",
          error.message
        );
      }
    };

    // Appel de la fonction de récupération des sous-transactions
    fetchAccountDetails();
  }, []); // Le tableau vide en tant que dépendance signifie que cela s'exécutera une seule fois après le montage initial

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async (e) => {

    e.preventDefault();
    try {
      const newFirstname = form.current[0].value;
      const newLastname = form.current[1].value;
      // Appel de la fonction pour sauvegarder les données du profil
      const postData =  SaveProfilData( newFirstname, newLastname);
  
      // Mettre à jour le store avec les nouvelles données
      dispatch(setFirstName(editedFirstName));
      dispatch(setLastName(editedLastName));
 
      console.log(postData,newFirstname ,newLastname);
      // Terminer le mode édition
      setEditing(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des données de profil :", error.message);
      // Gérer l'erreur ici, afficher un message à l'utilisateur, par exemple
    }
  };
  

  const handleCancelClick = () => {
    // Annuler les modifications en revenant à l'affichage non éditable
    setEditing(false);
  };



  return (
    <div>
      <Navbar />
      <main className="main bg-secondary">
        <div className="header">
          {isEditing ? (
            <div>
              <div className="text-container">
                <h1 className="text-dark">Welcome back</h1>
              </div>
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
              <h1 className="text-dark">
                Welcome back
                <br />
                {firstName} {lastName}!
              </h1>
              <button className="edit-button" onClick={handleEditClick}>
                Edit Name
              </button>
            </div>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>

        <div>
          <h2>Account Details</h2>
          {accountDetails ? (
            <div>
              {accountDetails.map((account) => (
                <section key={account.user_id}>
                  {/* Afficher les differents comptes */}
                  <div className="account">
                  <div className="account-content-wrapper">
                  <p> {account.account_checking_name}</p>
                    <p> {account.checking_balance}</p>
                    <p> Available Balance </p>
                  </div>

                    <div className="cta">
                    <button className="transaction-button" onClick={() => navigate(`/account-details/${account.account_id_checking}`)}>View transactions</button>
                    {/*account_id_checking: "1234ca4f4c6103245e4cf0fe"*/}
                    </div>
                  </div>
                  <div className="account">
                  <div className="account-content-wrapper">
                    <p> {account.account_saving_name}</p>
                    <p> {account.saving_balance}</p>
                    <p> Available Balance </p>
                    </div>
                    <div className="cta">
                    <button className="transaction-button" onClick={() => navigate(`/account-details/${account.account_id_saving}`)}>View transactions</button>
                    {/*account_id_saving: "5678ca4f4c6234578e4cf0fe"*/}
                    </div>

                  
                  </div>
                  <div className="account">
                  <div className="account-content-wrapper">
                    <p> {account.account_credit_name}</p>
                    <p> {account.credit_balance}</p>
                    <p> Current Balance </p>
                    </div>
                    <div className="cta">
                    <button className="transaction-button" onClick={() => navigate(`/account-details/${account.account_id_credit}`)}>View transactions</button>
                    {/*account_id_credit: "9564ca4f4c5724545e4cf0fe"*/}
                    </div>
                  </div>
                </section>
              ))}
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

export default Profile;
