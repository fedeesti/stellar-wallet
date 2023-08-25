interface IProps {
  onClose: () => void;
  changeContent: () => void;
}

function ConfirmGenerate({ onClose, changeContent }: IProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl text-center font-medium text-gray-900" data-cy="modal-title">
        Generate a new keypair
      </h3>
      <div
        className="flex flex-row gap-1 mb-6 p-4 rounded border-2 border-stellar-red-700 bg-stellar-red-800"
        data-cy="confirm-generate-description-container"
      >
        <div className="pt-[0.4rem]" data-cy="confirm-generate-warning-svg">
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
            <path d="M15 9l-6 6M9 9l6 6"></path>
          </svg>
        </div>
        <div data-cy="confirm-generate-description">
          <h3 className="text-lg leading-relaxed ">ATTENTION: Secret key wallets are not safe:</h3>
          <ul className="pl-4">
            <li className="pb-2 text-base font-thin list-disc">
              Pasting your secret key makes you vulnerable to accidents, attacks, and scams that can
              result in loss of funds.
            </li>
            <li className="pb-2 text-base font-thin list-disc">
              It is safer to create an account using methods that do not share your secret key with
              websites, such as hardware wallets or browser extensions.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center p-6 space-x-2 justify-end">
        <button
          type="button"
          data-cy="confirm-generate-btn-continue"
          onClick={changeContent}
          className="text-stellar-gray-200 bg-stellar-violet-700 font-medium rounded text-sm px-5 py-2.5 text-center hover:bg-stellar-violet-500 cursor-pointer"
        >
          Continue
        </button>
        <button
          type="button"
          data-cy="confirm-generate-btn-cancel"
          onClick={onClose}
          className="text-stellar-violet-700 hover:bg-stellar-violet-700 hover:text-stellar-gray-200 rounded border border-stellar-violet-700 text-sm font-medium px-5 py-2.5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmGenerate;
