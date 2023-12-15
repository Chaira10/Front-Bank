import { combineReducers } from "redux";
import dataReducer from "../features/dataReducer";

// Exportation du résultat de la combinaison de tous les reducers sous un seul rootReducer
export default combineReducers({
    // L'objet passé à combineReducers spécifie comment les différents morceaux de state sont gérés
    // "data" est la clé associée au reducer dataReducer
    data: dataReducer,
})