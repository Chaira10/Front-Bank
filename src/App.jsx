import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import AccountDetails from "./pages/AccountDetails/AccountDetails";
import Guard from "./Components/Guard/Guard";

// Composant principal de l'application
function App() {
  return (
    <div>
      <BrowserRouter>
        {/* Configuration des routes avec React Router */}
        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path="/" element={<Home />} />
          {/* Route pour la page de connexion */}
          <Route path="/login" element={<Login />} />
          {/* Route pour la page de profil */}
          <Route element={<Guard />}>
            <Route path="/profile" element={<Profile />} />
            {/* Route pour la page des détails du compte avec un paramètre d'ID de compte */}
            <Route
              path="/account-details/:accountDetailsId"
              element={<AccountDetails />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
