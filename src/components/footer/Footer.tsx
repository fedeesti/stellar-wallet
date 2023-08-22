function Footer() {
  return (
    <footer className="rounded-lg shadow m-4" data-cy="footer-container">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span
          className="text-sm text-gray-500 sm:text-center dark:text-gray-400"
          data-cy="footer-stellar-description"
        >
          © 2023{' '}
          <a
            href="https://www.stellar.org/"
            className="hover:underline"
            target="_blank"
            data-cy="footer-stellar-link"
          >
            Stellar™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li data-cy="footer-terms-of-service-title">
            <a
              href="https://www.stellar.org/terms-of-service"
              className="mr-4 hover:underline md:mr-6"
              target="_blank"
              data-cy="footer-terms-of-service-link"
            >
              Terms of Service
            </a>
          </li>
          <li data-cy="footer-privacy-policy-title">
            <a
              href="https://www.stellar.org/privacy-policy"
              className="mr-4 hover:underline md:mr-6"
              target="_blank"
              data-cy="footer-privacy-policy-link"
            >
              Privacy Policy
            </a>
          </li>
          <li data-cy="footer-repository-title">
            <a
              href="https://github.com/fedeesti/stellar-wallet"
              className="hover:underline"
              target="_blank"
              data-cy="footer-repository-link"
            >
              Repository
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
