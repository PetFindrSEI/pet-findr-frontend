// Styling
import 'normalize.css';
import './App.css';
import { FaPaw } from 'react-icons/fa';
// Dependencies
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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
import HowItWorks from './components/HowItWorks/HowItWorks';

function App() {
  const [pets, setPets] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const url = `https://petfindr-api.herokuapp.com/pets/`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setPets(json);
        setFiltered(json);
      })
      .catch((err) => console.log(err));
  }, []);

  const [petStatus, setPetStatus] = useState({});

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('token') ? true : false
  );
  const [userInfo, setUserInfo] = useState(null);

  // Setup useLocation for Report Pet Link with a Ternary
  const location = useLocation();
  const [locationReportPet, setLocationReportPet] = useState(false);
  useEffect(() => {
    if (location.pathname === '/report-pet') {
      setLocationReportPet(true);
    } else {
      setLocationReportPet(false);
    }
  }, [location.pathname]);

  // Handle the logged in state
  const handleSetLoggedIn = (token) => {
    localStorage.setItem('token', token);
    setLoggedIn(true);
    return;
  };

  // Get the User Info
  const getUserInfo = async () => {
    try {
      const response = await fetch(API_URL + 'users/me/', {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setUserInfo(data);
      } else {
        setUserInfo(null);
        setLoggedIn(false);
        localStorage.clear();
      }
    } catch (error) {}
    return;
  };

  // Handle the Logout Functionality
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

  // If the user is logged in, run getUserInfo();
  useEffect(() => {
    if (loggedIn) {
      getUserInfo();
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
        <ReportPet locationReportPet={locationReportPet} />
        <Routes>
          <Route
            path='/'
            element={<Home loggedIn={loggedIn} setPetStatus={setPetStatus} />}
          />
          <Route
            path='/login'
            element={<Login handleSetLoggedIn={handleSetLoggedIn} />}
          />
          <Route path='/register' element={<Register />} />
          <Route path='/report-pet' element={<AddPets loggedIn={loggedIn} />} />
          <Route
            path='/dashboard'
            element={
              <PetDashboard
                petStatus={petStatus}
                setPetStatus={setPetStatus}
                pets={pets}
                filtered={filtered}
                setFiltered={setFiltered}
              />
            }
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
          <Route path='/howitworks' element={<HowItWorks />}></Route>
        </Routes>
      </main>
      <footer>
        <Footer setPetStatus={setPetStatus} />
      </footer>
    </div>
  );
}

export default App;
