import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSousTransactions } from '../../Service/Mock.js';
import Accordion from '../../Components/Accordion/Accordion.jsx';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { useSelector } from 'react-redux';
import './AccountDetails.css';

// Définition de la fonction React AccountDetails
function AccountDetails() {
  // Récupération de l'ID du compte à partir des paramètres de l'URL
  const { accountDetailsId } = useParams();
  
  // ID de l'utilisateur 
  const userId = useSelector((state) => state.data.id);
  // États locaux pour stocker les détails du compte, le nom du compte et le solde
  const [accountDetails, setAccountDetails] = useState(null);
  const [accountName, setAccountName] = useState("");
  const [balance, setBalance] = useState("");
  // Utilisation du hook useEffect pour effectuer des opérations asynchrones lors du rendu du composant
  useEffect(() => {
    // Fonction asynchrone pour récupérer les détails du compte
    const fetchAccountDetails = async () => {
      try {
        // Appel de la fonction getSousTransactions pour obtenir les données des sous-transactions
        const accountDetailsData = await getSousTransactions(userId);
        // Recherche du compte correspondant à l'ID fourni
        const account = accountDetailsData.find(detail => {
            // console.log(detail);
          return (
            detail.account_id_checking === accountDetailsId ||
            detail.account_id_credit === accountDetailsId ||
            detail.account_id_saving === accountDetailsId
            
          );
        });
        // Mise à jour des états locaux en fonction du type de compte trouvé
        accountDetailsData.find(detail => {
            // console.log(detail.account_id_checking);
            if (accountDetailsId === detail.account_id_checking ) {
                setAccountName(detail.account_checking_name);
                setBalance(detail.checking_balance);

            }else if(accountDetailsId === detail.account_id_credit) {
                setAccountName(detail.account_credit_name);
                setBalance(detail.credit_balance);
            } else if(accountDetailsId === detail.account_id_saving) {
                setAccountName(detail.account_saving_name);
                setBalance(detail.saving_balance);
            }

        });
        // console.log(account);
        // console.log(accounts);

        // console.log(typeof accountDetailsId);
        // console.log( accountDetailsId);

        // Si un compte est trouvé, filtrage des détails du compte
        if (account) {
          const filteredAccountDetails = accountDetailsData[0].account_details.filter(
            (detail) => detail.account_parent_id === accountDetailsId
          );
          // Mise à jour de l'état local des détails du compte
          setAccountDetails(filteredAccountDetails);
        } else {
          console.error("Aucun détail de compte trouvé pour l'ID fourni.");
        }
      } catch (error) {
        // Gestion des erreurs lors de la récupération des sous-transactions
        console.error("Erreur lors de la récupération des sous-transactions :", error.message);
      }
    };
  // Appel de la fonction fetchAccountDetails au montage du composant ou lors des changements des dépendances
    fetchAccountDetails();
  }, [accountDetailsId, userId]); // Dépendances pour le hook useEffect


  return (
    <div>
    <Navbar />
    <div className="container">
    {/* Bannière affichant le nom du compte, le solde et un texte associé */}
      <div className='banner'>
        <p className='banner-txt'>{accountName}</p>
        <p className='banner-balance'>{balance}</p>
        <p className='banner-text'>Available Balance</p>

      </div>
      {/* Condition pour vérifier si les détails du compte sont disponibles */}
      {accountDetails ? (
        <>
        {/* En-tête de la liste des détails du compte */}
        <div className="header-title">
        <div className="header-accordion">
            <p>DATE</p>
            <p>DESCRIPTION</p>
            <p>AMOUNT</p>
            <p>BALANCE</p>
          </div>
          </div>
          {/* Affichage des détails du compte sous forme d'accordéon */}
          <div className="accordion-account">
          
            {accountDetails.map((detail) => (
              <Accordion details={detail} key={detail.detail_id} />
            ))}
          </div>
        </>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
    <Footer />
    </div>
  );
}
// Exportation de la fonction AccountDetails
export default AccountDetails;
