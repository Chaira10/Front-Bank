import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import dataReducer from './features/dataReducer.js';

// Configuration du magasin Redux
const store = configureStore({
  reducer: rootReducer, // Le rootReducer contient la combinaison de tous les réducteurs
  devTools: true, // Activation des outils de développement Redux dans le navigateur
})
// Dispatch d'une action du réducteur spécifique (dataReducer)
store.dispatch(dataReducer);
// Rendu de l'application React avec le magasin Redux configuré
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  {/* Utilisation du composant Provider pour fournir le magasin aux composants enfants */}
  <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
