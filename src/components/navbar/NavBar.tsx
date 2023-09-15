import useAuthPublicKey from '../../hooks/useAuthPublicKey';
import { getRandomProfile } from '../../utils/profile';
import { getShorted } from '../../utils/shortenString';

function NavBar() {
  const { publicKey, onLogout } = useAuthPublicKey();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicKey as string);
  };

  return (
    <nav
      className="bg-stellar-bg-primary py-8 px-4 sm:py-12 sm:px-12 flex justify-between flex-wrap"
      data-cy="nav-container"
    >
      <div className="flex items-center gap-2">
        <a href="https://www.stellar.org/" className="flex items-center" data-cy="nav-logo-link">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4096"
            height="1024"
            viewBox="0 0 4096 1024"
            className="h-full w-24 fill-white"
            data-cy="nav-logo"
          >
            <path d="M1210.269 256.082v104.254l-44.036 22.428c-33.445 17.082-53.369 52.57-50.539 90.019a527.976 527.976 0 011.485 39.326c-.062 192.49-108.069 368.683-279.575 456.075s-377.532 71.214-533.296-41.874l90.427-46.085 5.12-2.714c129.774 72.766 288.393 71.294 416.795-3.867s207.346-212.75 207.439-361.535a427.401 427.401 0 00-3.584-55.097L0 977.003v-104.51l1210.269-616.411zm2320.434 70.766c150.132 0 213.779 68.564 212.755 220.695l-.973 123.303c-1.024 90.326 2.97 150.954 13.876 201.801h-91.451a586.087 586.087 0 01-6.964-73.531c-32.771 55.763-87.457 86.486-182.902 86.486-100.412 0-183.926-55.712-183.926-154.128 0-126.477 143.168-164.011 361.862-187.924v-12.904c0-98.417-53.662-130.215-121.303-130.215-75.527 0-118.282 39.787-122.276 106.354h-93.448c7.937-115.315 111.37-179.936 214.752-179.936zm-881.434 1.844c164.008 0 260.477 136.206 249.519 306.209h-411.582c2.97 115.315 86.484 170.975 165.032 170.975 79.572 0 123.3-35.793 146.138-88.483h93.448c-23.861 91.504-109.322 168.056-239.586 168.056-169.026 0-262.474-121.306-262.474-279.377 0-169.848 113.367-277.38 259.504-277.38zm-853.63-189.921c130.059 0 244.553 58.579 273.432 196.834h-98.466c-23.861-82.492-107.273-111.321-178.96-111.321-55.813 0-153.101 24.835-153.101 105.381 0 63.648 49.924 95.396 117.77 110.348l83.258 18.895c110.397 23.862 242.607 65.645 242.607 210.762 0 140.2-131.032 215.78-274.405 215.78-169.999 0-277.375-93.245-296.269-236.62h99.644c18.894 99.39 86.484 151.107 198.827 151.107 107.376 0 168.002-49.618 168.002-121.306 0-76.552-64.62-106.354-155.098-127.246l-89.864-18.895c-99.439-21.865-197.854-77.576-197.854-196.885 0-138.152 144.141-196.834 260.477-196.834zm480.81 64.621v134.209h101.385v72.609h-101.385v317.166c0 55.66 3.943 69.588 55.659 69.588h45.726v75.528h-65.593c-102.409 0-126.27-22.838-126.27-134.209V410.21h-84.539v-72.609h84.539V203.392h90.478zm1792.72 131.239c8.954-.127 17.909.198 26.831.973v96.676a324.86 324.86 0 00-50.692-3.994c-83.515 0-125.297 44.549-125.297 163.857v280.35h-90.478V337.601h88.533v93.45c26.831-60.576 80.493-93.45 151.104-96.42zM3050.148 151.316v721.177h-90.478V151.316h90.478zm180.906 0v721.177h-90.478V151.316h90.478zm428.889 463.819c-164.059 15.925-268.414 40.76-268.414 114.342 0 50.745 38.762 84.54 103.382 84.54 84.539 0 165.032-38.814 165.032-165.035zM372.539 55.88C544.045-31.571 750.108-15.433 905.91 97.652l-95.855 48.85c-129.741-72.461-288.147-70.82-416.359 4.315S186.631 363.349 186.435 511.955a422.424 422.424 0 003.584 54.739L1210.268 46.856v104.561L-.001 768.135V663.522l43.985-22.428c33.475-17.057 53.425-52.556 50.59-90.019a510.55 510.55 0 01-1.485-38.967C93.069 319.59 201.032 143.33 372.538 55.879zm2276.73 350.337c-79.572 0-153.101 43.576-161.089 151.107h315.164c-2.97-75.528-57.656-151.107-154.074-151.107z"></path>
          </svg>
        </a>
        <div
          className="bg-stellar-btn-primary text-white uppercase text-sm font-medium py-0.2 px-1.5 rounded"
          data-cy="nav-btn-account-viewer"
        >
          Account Viewer
        </div>
      </div>
      {publicKey && (
        <>
          <button
            className="text-xs flex flex-row items-center justify-center gap-2 order-1 min-w-full mt-6 sm:mt-0 sm:justify-end sm:grow sm:pr-4 sm:order-none sm:min-w-[auto] hover:opacity-70"
            data-cy="nav-login-btn-copy"
            onClick={copyToClipboard}
          >
            <div className="w-11 h-11 bg-stellar-bg-secondary border border-stellar-border-primary rounded-full flex items-center justify-center">
              <img
                src={getRandomProfile()}
                alt="Transaction icon"
                className="w-[45%] h-[45%]"
                data-cy="nav-account-icon"
              />
            </div>
            <p className="font-semibold text-stellar-text-primary" data-cy="nav-login-public-key">
              {getShorted(publicKey as string)}
            </p>
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
              className="w-5 h-5 text-stellar-link"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
            </svg>
          </button>
          <button
            className="sm:border-l-2 border-l-stellar-border-primary pl-4 font-semibold text-stellar-link hover:text-stellar-link-hover"
            data-cy="nav-btn-sign-out"
            onClick={onLogout}
          >
            Sign out
          </button>
        </>
      )}
    </nav>
  );
}

export default NavBar;
