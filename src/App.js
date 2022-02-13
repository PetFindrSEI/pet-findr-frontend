import 'normalize.css'
import { Routes, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Navigation />
      </header>
      <main>
      <Routes>
        <Route path='/' element={<Home />}/>
      </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
