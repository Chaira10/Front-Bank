import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSousTransactions } from '../../Service/Mock.js';
import Accordion from '../../Components/Accordion/Accordion.jsx';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './AccountDetails.css';
function AccountDetails() {
  const { accountDetailsId } = useParams();
  const userId = "6568ca4f4c6092001e4cf0fe";
  const [accountDetails, setAccountDetails] = useState(null);
  const [accountName, setAccountName] = useState("");
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const accountDetailsData = await getSousTransactions(userId);
        const account = accountDetailsData.find(detail => {
            console.log(detail);
          return (
            detail.account_id_checking === accountDetailsId ||
            detail.account_id_credit === accountDetailsId ||
            detail.account_id_saving === accountDetailsId
            
          );
        });
         accountDetailsData.find(detail => {
            console.log(detail.account_id_checking);
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
        console.log(account);
        // console.log(accounts);

        console.log(typeof accountDetailsId);
        console.log( accountDetailsId);


        if (account) {
          const filteredAccountDetails = accountDetailsData[0].account_details.filter(
            (detail) => detail.account_parent_id === accountDetailsId
          );
  
          setAccountDetails(filteredAccountDetails);
        } else {
          console.error("Aucun détail de compte trouvé pour l'ID fourni.");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des sous-transactions :", error.message);
      }
    };

    fetchAccountDetails();
  }, [accountDetailsId, userId]);


  return (
    <div>
    <Navbar />
    <div className="container">
      <div className='banner'>
        <p className='banner-txt'>{accountName}</p>
        <p className='banner-balance'>{balance}</p>
        <p className='banner-text'>Available Balance</p>

      </div>
      {accountDetails ? (
        <>
        <div className="header-title">
        <div className="header-accordion">
            <p>DATE</p>
            <p>DESCRIPTION</p>
            <p>AMOUNT</p>
            <p>BALANCE</p>
          </div>
          </div>

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

export default AccountDetails;
