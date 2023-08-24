import { useState } from 'react';

interface IProps {
  onClose: () => void;
  changeContent: () => void;
}

function WarningLogin({ onClose, changeContent }: IProps) {
  const [secretKeyAccept, setSecretKeyAccept] = useState<boolean>(false);
  return (
    <div data-cy="warning-login-container">
      <div
        className="p-4 rounded border-2 border-stellar-light-warning bg-stellar-dark-warning/95 text-stellar-ghostwhite"
        data-cy="warning-details-container"
      >
        <h3 className="text-lg leading-relaxed ">
          ATTENTION: Entering your secret key on any website is not recommended
        </h3>
        <ul className="pl-4">
          <li className="pb-2 text-base font-thin list-disc">
            Copy and pasting your secret key makes you vulnerable to accidents, attacks, and scams
            that can result in loss of funds.
          </li>
          <li className="pb-2 text-base font-thin list-disc">
            {' '}
            If this website were compromised or if you visit a phishing replica of this site, your
            secret key may be stolen if you use this method.
          </li>
          <li className="pb-2 text-base font-thin list-disc">
            It is safer to use connection methods that do not share your secret key with websites,
            such as hardware wallets or browser extensions.
          </li>
          <li className="pb-2 text-base font-thin list-disc">
            Note: Connecting by entering a secret key may be deprecated in a future version of the
            Account Viewer.
          </li>
        </ul>
      </div>
      <div className="flex gap-2 items-baseline pt-3" data-cy="warning-accept-terms">
        <input
          type="checkbox"
          name="secret-key-accept"
          onChange={() => setSecretKeyAccept(!secretKeyAccept)}
          className="accent-stellar-violet-200 border-stellar-violet-200"
        />
        <label htmlFor="secret-key-accept">
          I understand and accept the risks of entering my secret key.
        </label>
      </div>
      <div className="flex items-center p-6 space-x-2 justify-end">
        <button
          type="button"
          disabled={!secretKeyAccept}
          onClick={changeContent}
          data-cy="warning-btn-continue"
          className={`text-white bg-stellar-violet-500 font-medium rounded text-sm px-5 py-2.5 text-center ${
            secretKeyAccept ? 'hover:bg-stellar-violet-200 cursor-pointer' : 'cursor-not-allowed'
          }`}
        >
          Continue
        </button>
        <button
          type="button"
          onClick={onClose}
          data-cy="warning-btn-cancel"
          className="text-stellar-violet-200 bg-stellar-dark-900 hover:bg-stellar-violet-500 hover:text-white rounded border border-stellar-violet-200 text-sm font-medium px-5 py-2.5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default WarningLogin;
