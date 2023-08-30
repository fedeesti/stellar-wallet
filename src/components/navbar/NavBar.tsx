import stellarLogo from '../../assets/stellar-logo.svg';

function NavBar() {
  return (
    <nav className="bg-white border-gray-200 max-w-screen-xl" data-cy="nav-container">
      <div className="flex items-center gap-2">
        <a href="https://www.stellar.org/" className="flex items-center" data-cy="nav-logo-link">
          <img src={stellarLogo} className="h-24 ml-4" alt="Stellar Logo" data-cy="nav-logo" />
        </a>
        <div
          className="bg-[#5332e6] text-[#ffffff] uppercase text-sm font-medium py-0.2 px-1.5 rounded"
          data-cy="nav-btn-account-viewer"
        >
          Account Viewer
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
