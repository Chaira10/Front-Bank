import axios from "axios";

export const clientHTTP = axios.create({
    baseURL : import.meta.env.VITE_APP_API_URI,
    headers: {
        "Content-Type": "application/json",
    },
})


export async function GetToken(email, password) {

    try {
        const response = await clientHTTP.post(
            "user/login",
        {
            email,
            password,
        },
        );

        const data = response.data;

        if (data.status === 200) {
        const token = data.body.token;
        return token;
        } else if (data.message === "Error: Password is invalid") {
        document.querySelector(".MsgErrorPass").style.display = "block";
        } else {
        document.querySelector(".MsgErrorName").style.display = "block";
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du token :", error);
        // Gérer l'erreur ici, par exemple en lançant une nouvelle exception ou en retournant null
        throw new Error("Erreur lors de la récupération du token");
    }
}

export async function GetUserData() {

    try {
        const response = await clientHTTP.post("user/profile", {

        });

        const data = response.data;
        console.log(data);
        if (data.status === 200) {
        const userProfile = data.body;
        console.log(userProfile);
        return userProfile;
        } else if (data.status === 400) {
        console.error("Invalid Fields:", data.message);
        throw new Error("Invalid Fields");
        } else {
        console.error("Internal Server Error:", data.message);
        throw new Error("Internal Server Error");
        }
    } catch (error) {
        console.error(
        "Erreur lors de la récupération des données utilisateur :",
        error
        );
        throw new Error("Erreur lors de la récupération des données utilisateur");
    }
}


export async function SaveProfilData( NewFirstName, NewLastName) {

    try {
        const response = await clientHTTP.put(
        "user/profile",
        {
            firstName: NewFirstName,
            lastName: NewLastName,
        },

    );
    // console.log('Token:', token);
    console.log('NewFirstName:', NewFirstName);
    console.log('NewLastName:', NewLastName);
    const data = response.data;
    console.log(data);
    return data;
    } catch (error) {
        console.error('Erreur lors de la mise à jour du profil :', error);
        throw new Error('Erreur lors de la mise à jour du profil');
    }
}
