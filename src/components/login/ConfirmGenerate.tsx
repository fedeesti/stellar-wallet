interface IProps {
  onClose: () => void;
  changeContent: () => void;
}

function ConfirmGenerate({ onClose, changeContent }: IProps) {
  return (
    <div className="space-y-6" data-cy="modal-confirm-generate-container">
      <h3 className="text-4xl text-center font-normal" data-cy="modal-title">
        Generate a new keypair
      </h3>
      <div
        className="flex flex-row gap-1 mb-6 p-4 rounded border-2 border-stellar-error-border bg-stellar-error-bg"
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
            className="w-6 h-4 text-stellar-error"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M15 9l-6 6M9 9l6 6"></path>
          </svg>
        </div>
        <div data-cy="confirm-generate-description">
          <h3 className="text-lg leading-relaxed text-white">
            ATTENTION: Secret key wallets are not safe:
          </h3>
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
          className="text-stellar-text-primary bg-stellar-btn-primary font-medium rounded text-sm px-5 py-2.5 text-center hover:bg-stellar-btn-hover cursor-pointer"
        >
          Continue
        </button>
        <button
          type="button"
          data-cy="confirm-generate-btn-cancel"
          onClick={onClose}
          className="text-stellar-link hover:bg-stellar-btn-primary hover:text-stellar-text-primary rounded border border-stellar-link text-sm font-medium px-5 py-2.5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmGenerate;
