import useLoginWithAlbedo from '../../hooks/useLoginWithAlbedo';

interface IProps {
  closeModal: () => void;
}

function AlbedoLogin({ closeModal }: IProps) {
  const { albedoGetPublicKey } = useLoginWithAlbedo();
  return (
    <>
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="896"
          height="1024"
          viewBox="0 0 896 1024"
          className="w-12 h-12"
          data-cy="albedo-logo-svg"
        >
          <path
            fill="#0691b7"
            d="M463.313 7.189h-42.172L-5.776 1016.272l1.276.54h113.923l85.432-201.929a843.025 843.025 0 00546.847-2.85l86.639 204.779h60.61l1.277-.54L463.31 7.189zm.856 813.714A804.155 804.155 0 01209.8 779.56l259.081-612.373 257.936 609.659a804.61 804.61 0 01-262.648 44.056z"
          ></path>
        </svg>
      </div>
      <h3 className="text-2xl text-center font-medium text-gray-900" data-cy="albedo-title">
        Connect with Albedo
      </h3>
      <div>
        <p className="text-center" data-cy="modal-albedo-information">
          Albedo is a browser wallet.
          <a
            className="text-[#6260eb] hover:text-[#937eef] font-medium"
            href="https://albedo.link/"
            target="_blank"
            data-cy="modal-albedo-information-link"
          >
            {' '}
            Learn more
          </a>
        </p>
      </div>
      <div
        className="flex flex-row gap-1 mb-6 p-4 rounded border-2 border-stellar-red-700 bg-stellar-red-800"
        data-cy="modal-albedo-body-container"
      >
        <div className="pt-[0.4rem]" data-cy="modal-albedo-info-svg">
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
            className="w-6 h-4"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4M12 8h.01"></path>
          </svg>
        </div>
        <div data-cy="modal-albedo-description">
          <p className="text-base leading-relaxed">
            Click on "Connect with Albedo" to launch Albedo browser wallet.
          </p>
        </div>
      </div>
      <div className="flex items-center p-6 space-x-2 justify-end">
        <button
          type="button"
          data-cy="albedo-btn-connect"
          onClick={albedoGetPublicKey}
          className="text-stellar-gray-200 bg-stellar-violet-700 font-medium rounded text-sm px-5 py-2.5 text-center hover:bg-stellar-violet-500 cursor-pointer"
        >
          Connect with Albedo
        </button>
        <button
          type="button"
          data-cy="albedo-btn-cancel"
          onClick={closeModal}
          className="text-stellar-violet-700 hover:bg-stellar-violet-700 hover:text-stellar-gray-200 rounded border border-stellar-violet-700 text-sm font-medium px-5 py-2.5"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default AlbedoLogin;
