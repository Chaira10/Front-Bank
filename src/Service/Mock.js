import axios from 'axios';

export async function getSousTransactions(userId) {
    try {
        const response = await axios.get('http://localhost:3003/accountDetails');
        const accountDetailsData = response.data;
        
        // Filtrer les sous-transactions en fonction de userId
        const filteredSousTransactions = accountDetailsData.filter(
          (account) => account.user_id === userId
        );

        // Vérifiez si des données ont été trouvées
        if (filteredSousTransactions.length > 0) {
            console.log(filteredSousTransactions); // Console.log pour le débogage

            return filteredSousTransactions;
        } else {
            throw new Error("Aucune sous-transaction trouvée pour cet utilisateur ou structure de données incorrecte");
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des sous-transactions :", error);
        throw new Error("Une erreur s'est produite lors de la récupération des sous-transactions");
    }
}
