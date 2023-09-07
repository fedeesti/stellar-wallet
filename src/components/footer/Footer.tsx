function Footer() {
  return (
    <footer className="px-12 bg-stellar-bg-primary text-white" data-cy="footer-container">
      <div className="w-full pb-12 pt-6 border-t border-stellar-border-secondary md:flex md:items-center md:justify-between">
        <ul className="flex flex-wrap items-center mt-3 font-bold hover:text-stellar-text-secondary dark:text-gray-400 sm:mt-0">
          <li data-cy="footer-terms-of-service-title">
            <a
              href="https://www.stellar.org/terms-of-service"
              className="mr-4 md:mr-6"
              target="_blank"
              data-cy="footer-terms-of-service-link"
            >
              Terms of Service
            </a>
          </li>
          <li data-cy="footer-privacy-policy-title">
            <a
              href="https://www.stellar.org/privacy-policy"
              className="mr-4 md:mr-6"
              target="_blank"
              data-cy="footer-privacy-policy-link"
            >
              Privacy Policy
            </a>
          </li>
        </ul>
        <div>
          <a
            href="https://github.com/fedeesti/stellar-wallet"
            className="ml-2 flex items-center gap-1 font-bold hover:text-stellar-text-secondary"
            target="_blank"
            data-cy="footer-repository-link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"></path>
            </svg>
            <span data-cy="footer-repository-title">Github</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
