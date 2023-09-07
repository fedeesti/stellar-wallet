import { useState } from 'react';

interface IProps {
  onClose: () => void;
  changeContent: () => void;
}

function WarningLogin({ onClose, changeContent }: IProps) {
  const [secretKeyAccept, setSecretKeyAccept] = useState<boolean>(false);
  return (
    <>
      <h3 className="text-4xl text-center font-normal" data-cy="modal-title">
        Connect with a secret key
      </h3>
      <div data-cy="warning-login-container">
        <div
          className="flex flex-row gap-1 p-4 mb-6 rounded border-2 border-stellar-error-border bg-stellar-error-bg"
          data-cy="warning-details-container"
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
          <div>
            <h3 className="mb-2 text-lg leading-relaxed text-white">
              ATTENTION: Entering your secret key on any website is not recommended
            </h3>
            <ul className="pl-4">
              <li className="pb-2 text-base font-thin list-disc">
                Copy and pasting your secret key makes you vulnerable to accidents, attacks, and
                scams that can result in loss of funds.
              </li>
              <li className="pb-2 text-base font-thin list-disc">
                {' '}
                If this website were compromised or if you visit a phishing replica of this site,
                your secret key may be stolen if you use this method.
              </li>
              <li className="pb-2 text-base font-thin list-disc">
                It is safer to use connection methods that do not share your secret key with
                websites, such as hardware wallets or browser extensions.
              </li>
              <li className="pb-2 text-base font-thin list-disc">
                Note: Connecting by entering a secret key may be deprecated in a future version of
                the Account Viewer.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex gap-2 items-baseline pt-3" data-cy="warning-accept-terms">
          <input
            type="checkbox"
            name="secret-key-accept"
            onChange={() => setSecretKeyAccept(!secretKeyAccept)}
            className="h-4 w-4 bg-stellar-bg-primary accent-stellar-btn-primary border-stellar-btn-primary shadow-xl"
          />
          <label htmlFor="secret-key-accept">
            I understand and accept the risks of entering my secret key.
          </label>
        </div>
      </div>
      <div className="flex items-center p-6 space-x-2 justify-end">
        <button
          type="button"
          disabled={!secretKeyAccept}
          onClick={changeContent}
          data-cy="warning-btn-continue"
          className={`text-stellar-gray-200 bg-stellar-btn-primary font-medium rounded text-sm px-5 py-2.5 text-center ${
            secretKeyAccept ? 'hover:bg-stellar-btn-hover cursor-pointer' : 'cursor-not-allowed'
          }`}
        >
          Continue
        </button>
        <button
          type="button"
          onClick={onClose}
          data-cy="warning-btn-cancel"
          className="text-stellar-link hover:bg-stellar-btn-primary hover:text-stellar-text-primary rounded border border-stellar-link text-sm font-medium px-5 py-2.5"
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default WarningLogin;
