import 'normalize.css';
import './App.css';
import { FaPaw } from 'react-icons/fa';
import { Routes, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ReportPet from './components/ReportPet/ReportPet';
import AddPets from './components/AddPets/AddPets';

function App() {
  return (
    <div className='App'>
      <div className='paw-one'>
        <FaPaw />
      </div>
      <div className='paw-two'>
        <FaPaw />
      </div>
      <header>
        <Navigation />
      </header>
      <main>
        <ReportPet />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/report-pet' element={<AddPets />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
