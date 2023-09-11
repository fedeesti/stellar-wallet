import { Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import NavBar from './components/navbar/NavBar';
import DashboardWallet from './pages/DashboardWallet';
import Home from './pages/Home';
import AuthPublicKeyProvider from './contexts/PublicKeyContext';
import ProtectedRoute from './components/routes/ProtectedRoute';

function App() {
  return (
    <AuthPublicKeyProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardWallet />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </AuthPublicKeyProvider>
  );
}

export default App;
