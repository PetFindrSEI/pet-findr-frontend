// Styling
import 'normalize.css';
import './App.css';
import { FaPaw } from 'react-icons/fa';
// Dependencies
import { Routes, Route, Link } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
// Components
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ReportPet from './components/ReportPet/ReportPet';
import AddPets from './components/AddPets/AddPets';
import './App.css';
import PetDashboard from './components/PetDashboard/PetDashboard';
import PetDetails from './components/PetDetails/PetDetails';
import { useState } from 'react';

function App() {
  const [petStatus, setPetStatus] = useState({
    status: '',
  });
  console.log(petStatus);

  return (
    <div className='App'>
      <div className='paw-one'>
        <FaPaw />
      </div>
      <div className='paw-two'>
        <FaPaw />
      </div>
      <UserProvider>
        <header>
          <Navigation setPetStatus={setPetStatus} />
        </header>
        <main>
          <ReportPet />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/report-pet' element={<AddPets />} />
            <Route
              path='/dashboard'
              element={<PetDashboard petStatus={petStatus} />}
            />
            <Route
              path='/dashboard/:status'
              element={<PetDashboard petStatus={petStatus} />}
            />
            <Route path='/pets/:id' element={<PetDetails />}></Route>
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </UserProvider>
    </div>
  );
}

export default App;
