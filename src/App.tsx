import { Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import NavBar from './components/navbar/NavBar';
import DashboardWallet from './pages/DashboardWallet';
import Home from './pages/Home';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="" element={<DashboardWallet />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
