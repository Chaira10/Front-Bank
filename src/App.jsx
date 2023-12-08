import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import AccountDetails from './pages/AccountDetails/AccountDetails';

function App() {


  return (
    <div>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account-details/:accountDetailsId" element={<AccountDetails />} />

        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
