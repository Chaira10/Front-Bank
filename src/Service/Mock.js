import axios from 'axios';

// Fonction asynchrone qui effectue une requête HTTP pour récupérer les sous-transactions d'un utilisateur
export async function getSousTransactions(userId) {
    try {
        // Utilisation de la bibliothèque Axios pour effectuer une requête GET vers l'endpoint 'http://localhost:3003/accountDetails'
        const response = await axios.get('http://localhost:3003/accountDetails');
        // Récupération des données de la réponse
        const accountDetailsData = response.data;
        // Filtrage des sous-transactions pour ne conserver que celles associées à l'utilisateur spécifié
        const filteredSousTransactions = accountDetailsData.filter(
        (account) => account.user_id === userId
        );
        // Vérification s'il y a des sous-transactions filtrées
        if (filteredSousTransactions.length > 0) {
            // console.log(filteredSousTransactions);
            // Retour des sous-transactions filtrées
            return filteredSousTransactions;
        } else {
            // Si aucune sous-transaction n'est trouvée, lancer une erreur
            throw new Error("Aucune sous-transaction trouvée pour cet utilisateur ou structure de données incorrecte");
        }
    } catch (error) {
        // Gestion des erreurs lors de la requête HTTP
        console.error("Erreur lors de la récupération des sous-transactions :", error);
        // Lancer une nouvelle exception pour signaler l'erreur
        throw new Error("Une erreur s'est produite lors de la récupération des sous-transactions");
    }
}

// Fonction asynchrone qui effectue une requête HTTP pour récupérer les détails des comptes d'un utilisateur
export async function getAccount(userId) {
    try {
        // Utilisation de la bibliothèque Axios pour effectuer une requête GET vers l'endpoint 'http://localhost:3003/account'
        const response = await axios.get('http://localhost:3003/account');
        // Récupération des données de la réponse
        const accountData = response.data;
        // Filtrage des détails de compte pour ne conserver que ceux associés à l'utilisateur spécifié
        const userAccount = accountData.find(account => account.user_id === userId);
        // Vérification s'il y a des détails de compte pour l'utilisateur spécifié
        console.log(userAccount)
        return userAccount
    } catch (error) {
        // Gestion des erreurs lors de la requête HTTP
        console.error("Erreur lors de la récupération des détails de compte :", error);
        // Lancer une nouvelle exception pour signaler l'erreur
        throw new Error("Une erreur s'est produite lors de la récupération des détails de compte");
    }
}
