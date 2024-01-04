import {createSlice} from '@reduxjs/toolkit';
// Définition du slice de données (dataSlice)
export const dataSlice = createSlice({
    // Nom du slice
    name: 'data',
    // État initial du slice
    initialState:{  
        token : "",
        email :'',
        firstName : "",
        lastName :"",
        id: "",
    },
    // Reducers qui définissent comment l'état peut être modifié
    reducers:{
        // Reducer pour mettre à jour le token
        setToken: (state, action)=>{
            state.token = action.payload
        },
        // Reducer pour mettre à jour l'email
        setEmail: (state, action)=>{
            state.email = action.payload 
        },
        // Reducer pour mettre à jour le prénom
        setFirstName: (state, action)=>{
            state.firstName = action.payload
        },
        // Reducer pour mettre à jour le nom de famille
        setLastName: (state, action)=>{
            state.lastName = action.payload
        },
        setId: (state, action)=>{
            state.id = action.payload
        },
        // Reducer pour gérer la déconnexion (réinitialiser toutes les valeurs à null)
        SetSignOut:(state )=>{
            state.token= null
            state.email = null
            state.firstName = null
            state.lastName = null
            state.id = null
        },
    }
})
// Exportation des actions générées par createSlice
export const {setToken, setEmail, setFirstName, setLastName,setId, SetSignOut} = dataSlice.actions
// Exportation du réducteur généré par createSlice
export default dataSlice.reducer;