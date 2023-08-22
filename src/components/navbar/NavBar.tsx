import stellarLogo from '../../assets/stellar-logo.svg';

function NavBar() {
  return (
    <nav className="bg-white border-gray-200 max-w-screen-xl" data-cy="nav-container">
      <a href="https://www.stellar.org/" className="flex items-center" data-cy="nav-logo-link">
        <img src={stellarLogo} className="h-24 ml-4" alt="Stellar Logo" data-cy="nav-logo" />
      </a>
    </nav>
  );
}

export default NavBar;
