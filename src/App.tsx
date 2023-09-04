import Footer from './components/footer/Footer';
import NavBar from './components/navbar/NavBar';
import DashboardWallet from './pages/DashboardWallet';
import Home from './pages/Home';

function App() {
  return (
    <>
      <NavBar />
      <DashboardWallet />
      <Home />
      <Footer />
    </>
  );
}

export default App;
