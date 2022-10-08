import logo from './logo.svg';
import './App.css';
import './components/Navbar'
import Navbar from './components/Navbar';
import Landing from './components/Landing';

function App() {
  return (
    <div className="App">
         <Navbar/>
         <Landing/>
    </div>
  );
}

export default App;
