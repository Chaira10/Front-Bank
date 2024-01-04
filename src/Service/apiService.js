import axios from "axios";

// Création d'une instance Axios nommée clientHTTP avec une configuration spécifique
export const clientHTTP = axios.create({
    // La base URL pour les requêtes est définie à partir de la variable d'environnement VITE_APP_API_URI
    // import.meta.env.VITE_APP_API_URI récupère la valeur de la variable d'environnement depuis le fichier .env
    baseURL : import.meta.env.VITE_APP_API_URI,
    // Définition des en-têtes par défaut pour les requêtes
    headers: {
        // En-tête de type de contenu pour indiquer que les données sont au format JSON
        "Content-Type": "application/json",
    },
})

// Fonction asynchrone qui effectue une requête HTTP pour obtenir un token d'authentification
export async function GetToken(email, password) {

    try {
        // Utilisation de l'instance Axios clientHTTP pour effectuer une requête POST vers "user/login"
        const response = await clientHTTP.post(
            "user/login", // Endpoint pour la connexion utilisateur
        {
            email, // Paramètre email de la requête
            password, // Paramètre password de la requête
        },
        );
        // Récupération des données de la réponse
        const data = response.data;
        // Vérification du statut de la réponse
        if (data.status === 200) {
        // Si le statut est 200, cela signifie que la connexion est réussie
        const token = data.body.token; // Récupération du token depuis le corps de la réponse
        return token; // Retour du token
        }
    } catch (error) {
        // Gestion des erreurs lors de la requête HTTP
        console.error("Erreur lors de la récupération du token :", error);
        // Gérer l'erreur ici, par exemple en lançant une nouvelle exception ou en retournant null
        throw new Error("Erreur lors de la récupération du token");
    }
}

// Fonction asynchrone qui effectue une requête HTTP pour récupérer les données du profil utilisateur
export async function GetUserData() {
    try {
        // Utilisation de l'instance Axios clientHTTP pour effectuer une requête POST vers "user/profile"
        const response = await clientHTTP.post("user/profile", {
        });
        // Récupération des données de la réponse
        const data = response.data;
        // console.log(data);
        // Vérification du statut de la réponse
        if (data.status === 200) {
        // Si le statut est 200, cela signifie que la requête s'est déroulée avec succès
        const userProfile = data.body; // Récupération du profil utilisateur depuis le corps de la réponse
        // console.log(userProfile);
        return userProfile; // Retour du profil utilisateur
        } else if (data.status === 400) {
        // Si le statut est 400, cela indique que les champs fournis sont invalides
        console.error("Invalid Fields:", data.message);
        throw new Error("Invalid Fields");
        } else {
        // Si un autre statut est renvoyé, cela indique une erreur interne du serveur
        console.error("Internal Server Error:", data.message);
        throw new Error("Internal Server Error");
        }
    } catch (error) {
        // Gestion des erreurs lors de la requête HTTP
        console.error(
        "Erreur lors de la récupération des données utilisateur :",
        error
        );
        throw new Error("Erreur lors de la récupération des données utilisateur");
    }
}

// Fonction asynchrone qui effectue une requête HTTP pour mettre à jour les données du profil utilisateur
export async function SaveProfilData( NewFirstName, NewLastName) {
    try {
        // Utilisation de l'instance Axios clientHTTP pour effectuer une requête PUT vers "user/profile"
        const response = await clientHTTP.put(
        "user/profile",
        {
            firstName: NewFirstName, // Nouveau prénom fourni en paramètre
            lastName: NewLastName,  // Nouveau nom de famille fourni en paramètre
        },

    );
    // Récupération des données de la réponse
    const data = response.data;
    // console.log(data);
    // Retour des données de la réponse (peut inclure des informations sur la réussite de la mise à jour)
    return data;
    } catch (error) {
        // Gestion des erreurs lors de la requête HTTP
        console.error('Erreur lors de la mise à jour du profil :', error);
        // Lancer une nouvelle exception pour signaler l'erreur
        throw new Error('Erreur lors de la mise à jour du profil');
    }
}
