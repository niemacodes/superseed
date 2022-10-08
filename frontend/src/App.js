import logo from './logo.svg';
import './App.css';
import './components/Navbar'
import Landing from './components/Landing';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Invest from './components/Invest';
import GrowthJourney from './components/GrowthJourney';
import Donate from './components/Donate';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="/growthjourney" element={<GrowthJourney />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </div>
  );
}

export default App;
