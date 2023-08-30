import { useEffect, useState } from 'react';
import { storedKeypairErrorMessage } from '../../utils/constants';
import { createAccount } from '../../service/createAccount ';
import { Keypair } from '../../types/types';

interface initialErrorState {
  status: boolean;
  message: string;
}

const INITIAL_STATE: Keypair = {
  publicKey: '',
  secretKey: '',
};

function GenerateKeypair() {
  const [account, setAccount] = useState<Keypair>(INITIAL_STATE);
  const [isKeypairStored, setIsKeypairStored] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [error, setError] = useState<initialErrorState>({ status: false, message: '' });

  useEffect(() => {
    const keypair = createAccount();
    setAccount(keypair);
  }, []);

  const textToCopy = `Public key:
  ${account.publicKey}
  Secret key:
  ${account.secretKey}
  `;

  const toggleStoredKeypair = () => {
    if (!isKeypairStored) {
      setError({ status: false, message: '' });
    }

    setIsKeypairStored(!isKeypairStored);
  };

  const copyToClipboard = (textToCopy: string) => {
    const displayTimeOfTooltip = 2000;
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, displayTimeOfTooltip);
      },
      (err) => {
        throw new Error(`failed to copy, ${err.message}`);
      },
    );
  };

  const connectAWallet = () => {
    if (!isKeypairStored) {
      setError({
        status: true,
        message: storedKeypairErrorMessage.notCopied,
      });
    } else {
      setError({ status: false, message: storedKeypairErrorMessage.copied });
    }
  };

  return (
    <div className="space-y-6" data-cy="modal-generate-keypair-container">
      <h3 className="text-2xl text-center font-medium text-gray-900" data-cy="modal-title">
        Generate a new keypair
      </h3>
      <div
        className="flex flex-row gap-1 mb-6 p-4 rounded border-2 border-stellar-red-700 bg-stellar-red-800"
        data-cy="generate-keypair-description-container"
      >
        <div className="pt-[0.4rem]" data-cy="generate-keypair-warning-svg">
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
        <div data-cy="generate-keypair-description">
          <h3 className="pb-3 text-lg leading-relaxed ">ATTENTION:</h3>
          <ul className="pl-4">
            <li className="pb-2 text-base font-thin list-disc">
              It is very important to save your secret key and store it somewhere safe.
            </li>
            <li className="pb-2 text-base font-thin list-disc">
              If you lose it, you will lose access to your account. No one in the known universe
              will be able to help you get back in.
            </li>
            <li className="pb-2 text-base font-thin list-disc">
              SDF does not store a copy of your keys and cannot help you recover lost keys.
            </li>
            <li className="pb-2 text-base font-thin list-disc">
              Anyone who knows your secret key has access to your funds.
            </li>
            <li className="pb-2 text-base font-thin list-disc">
              You have several options: Write your key down on a piece of paper. Keep it in a safe.
              Store it in a password manager. Use a hardware wallet. But don't ever keep it
              unencrypted on your computer or in your email.
            </li>
            <li className="pb-2 text-base font-medium list-disc">
              Note: Connecting by entering a secret key may be deprecated in a future version of the
              Account Viewer.
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-4" data-cy="generate-keypair-keys-container">
        <div className="mb-6" data-cy="generate-keypair-public-container">
          <h4 className="text-sm font-medium mb-2">PUBLIC KEY</h4>
          <code className="break-words bg-[#303448] text-sm border border-solid border-[#3a3e4d] rounded-sm px-1 py-0.5">
            {account.publicKey}
          </code>
        </div>
        <div className="mb-6" data-cy="generate-keypair-secret-container">
          <h4 className="text-sm font-medium mb-2">SECRET KEY</h4>
          <code className="break-words bg-[#303448] text-sm border border-solid border-[#3a3e4d] rounded-sm px-1 py-0.5">
            {account.secretKey}
          </code>
        </div>
      </div>
      <div>
        <div className="flex gap-2 flex-row" data-cy="generate-keypair-copy-text-container">
          <button
            className="inline-flex gap-1.5 items-center"
            onClick={() => copyToClipboard(textToCopy)}
            data-cy="generate-keypair-btn-copy-keys"
          >
            <span className="text-sm">Copy keys</span>
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
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
            </svg>
          </button>
          {isCopied && (
            <p
              data-cy="generate-keypair-tooltip-copied"
              className="ml-3 whitespace-nowrap rounded bg-stellar-dark-violet py-[6px] px-4 text-sm font-semibold"
            >
              Copied
            </p>
          )}
        </div>
      </div>
      {error.status && (
        <p className="text-stellar-red-400 font-normal" data-cy="generate-keypair-error-message">
          {error.message}
        </p>
      )}
      <div className="flex gap-2 items-baseline pt-3" data-cy="generate-keypair-stored-container">
        <input
          type="checkbox"
          name="secret-key-accept"
          onChange={toggleStoredKeypair}
          className="accent-stellar-violet-700 border-stellar-violet-700"
        />
        <label htmlFor="secret-key-accept">I've stored my secret key in a safe place</label>
      </div>
      <div className="flex items-center p-6 space-x-2 justify-end">
        <button
          type="button"
          data-cy="generate-keypair-btn-close"
          onClick={() => connectAWallet()}
          className="text-stellar-violet-700 hover:bg-stellar-violet-700 hover:text-stellar-gray-200 rounded border border-stellar-violet-700 text-sm font-medium px-5 py-2.5"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default GenerateKeypair;
