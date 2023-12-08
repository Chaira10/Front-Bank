import { useEffect, useState } from 'react';
import { useAmount } from '../../Context/AmountContext';
import { useParams } from 'react-router-dom';
import { getSousTransactions } from '../../Service/Mock';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './Transaction.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPen } from '@fortawesome/free-solid-svg-icons';

const Transaction = () => {
  const { transactions} = useAmount();
  const { transactionId } = useParams();

  // Trouver la transaction correspondante en fonction de l'ID
  const transactionFromContext = transactions.find((t) => t.id === parseInt(transactionId, 10));
const title = transactionFromContext.title;
console.log(title);

  // Utilisez useEffect pour effectuer la récupération des transactions au chargement du composant
  const [sousTransactions, setSousTransactions] = useState(null);
  const [expandedSousTransactions, setExpandedSousTransactions] = useState([]);

  useEffect(() => {
    const fetchSousTransactions = async () => {
      try {
        // Appelez la fonction getSousTransactions avec le titre en paramètre
        const fetchedSousTransactions = await getSousTransactions(title);

        // Mettez à jour l'état des sous-transactions avec les données récupérées
        setSousTransactions(fetchedSousTransactions);
 // Initialisez l'état expandedSousTransactions pour chaque sous-transaction à false (masqué)
 setExpandedSousTransactions(Array(fetchedSousTransactions.length).fill(false));
      } catch (error) {
        // Gérez les erreurs, par exemple, affichez un message d'erreur à l'utilisateur
        console.error("Erreur lors de la récupération des sous-transactions :", error.message);
      }
    };

    // Appelez la fonction de récupération des sous-transactions
    fetchSousTransactions();
  }, [title]);
// Fonction pour basculer l'état d'une sous-transaction entre masqué et affiché
const toggleSousTransaction = (index) => {
    const updatedExpandedSousTransactions = [...expandedSousTransactions];
    updatedExpandedSousTransactions[index] = !updatedExpandedSousTransactions[index];
    setExpandedSousTransactions(updatedExpandedSousTransactions);
  };
  return (
    <div>
      <Navbar />
      <main className="main bg-secondary">
        <div className="banner">
          <p className="title">{transactionFromContext ? ` ${transactionFromContext.title}` : 'Transaction non disponible'}</p>
          <p className="amount">{transactionFromContext ? ` ${transactionFromContext.amount}` : 'Transaction non disponible'}</p>
          <p className="txt">Available Balance</p>
        </div>

        <section className="sous-transactions">
          {sousTransactions && (
            <div>
              <h2>Liste des sous-transactions</h2>
              <div className="container-sous-transaction">
                {sousTransactions.map((sousTransaction, index) => (
                  <div key={sousTransaction.id}>

                    {/* Bouton pour afficher/masquer les détails */}
                    <button className="collapse" onClick={() => toggleSousTransaction(index)}>
                    <div className="content-collapse">
                    {/* {expandedSousTransactions[index] ? '<FontAwesomeIcon icon={solid("chevron-up")} />Masquer détails' : '<FontAwesomeIcon icon={solid("chevron-down")} />Afficher détails'} */}
                    <p className="icon">{expandedSousTransactions[index] ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</p>
                    <p >{sousTransaction.date}</p>
                    <p>{sousTransaction.description}</p>
                    <p>{sousTransaction.amount}</p>
                    <p>{sousTransaction.balance}</p>

</div>
{expandedSousTransactions[index] && (
                      <div className='container-details'>
                        <span className='detail'>Type: {sousTransaction.type}</span>
                        <span className='detail'>Catégorie: {sousTransaction.category}<p className='pen'><FontAwesomeIcon icon={faPen} /></p></span>
                        <span  className='detail'>Note: {sousTransaction.note} <p className='pen'><FontAwesomeIcon icon={faPen} /></p></span>
                      </div>
                    )}
                    </button>

                    {/* Affichage des détails s'ils sont étendus */}
                    
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Transaction;
