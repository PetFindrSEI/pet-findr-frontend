// Styling
import 'normalize.css';
import './App.css';
import { FaPaw } from 'react-icons/fa';
// Dependencies
import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import API_URL from './apiUrl';
// Components
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ReportPet from './components/ReportPet/ReportPet';
import AddPets from './components/AddPets/AddPets';
import PetDashboard from './components/PetDashboard/PetDashboard';
import PetDetails from './components/PetDetails/PetDetails';
import UserProfile from './components/UserProfile/UserProfile';

function App() {
  const [petStatus, setPetStatus] = useState({
    status: '',
  });

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('token') ? true : false
  );

  const [userInfo, setUserInfo] = useState(null);

  const handleSetLoggedIn = (token) => {
    localStorage.setItem('token', token);
    setLoggedIn(true);
    return;
  };

  const getUserInfo = async () => {
    try {
      const response = await fetch(API_URL + 'users/me/', {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setUserInfo(data);
      } else {
        setUserInfo(null);
        setLoggedIn(false);
        localStorage.clear();
      }
    } catch (error) {}
    return;
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(API_URL + 'token/logout/', {
        method: 'POST',
        body: JSON.stringify(localStorage.getItem('token')),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 204) {
        setUserInfo(null);
        setLoggedIn(false);
        localStorage.clear();
        navigate('/');
      }
    } catch (error) {}
    return;
  };

  useEffect(() => {
    if (loggedIn) {
      getUserInfo();
      console.log(userInfo);
    }
  }, [loggedIn]);

  return (
    <div className='App'>
      <div className='paw-one'>
        <FaPaw />
      </div>
      <div className='paw-two'>
        <FaPaw />
      </div>

      <header>
        <Navigation
          setPetStatus={setPetStatus}
          loggedIn={loggedIn}
          handleLogout={handleLogout}
          userInfo={userInfo}
        />
      </header>
      <main>
        <ReportPet />
        <Routes>
          <Route path='/' element={<Home loggedIn={loggedIn} />} />
          <Route
            path='/login'
            element={<Login handleSetLoggedIn={handleSetLoggedIn} />}
          />
          <Route path='/register' element={<Register />} />
          <Route path='/report-pet' element={<AddPets loggedIn={loggedIn} />} />
          <Route
            path='/dashboard'
            element={<PetDashboard petStatus={petStatus} />}
          />
          <Route
            path='/dashboard/:status'
            element={<PetDashboard petStatus={petStatus} />}
          />
          <Route path='/pets/:id' element={<PetDetails />}></Route>
          <Route
            path='/user-profile'
            element={
              <UserProfile
                loggedIn={loggedIn}
                handleLogout={handleLogout}
                userInfo={userInfo}
              />
            }
          />
        </Routes>
      </main>
      <footer>
        <Footer setPetStatus={setPetStatus} />
      </footer>
    </div>
  );
}

export default App;
