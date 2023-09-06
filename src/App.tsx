import { Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import NavBar from './components/navbar/NavBar';
import DashboardWallet from './pages/DashboardWallet';
import Home from './pages/Home';
import AuthPublicKeyProvider from './contexts/PublicKeyContext';

function App() {
  return (
    <AuthPublicKeyProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardWallet />} />
      </Routes>
      <Footer />
    </AuthPublicKeyProvider>
  );
}

export default App;
