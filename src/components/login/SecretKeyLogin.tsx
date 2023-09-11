import { ChangeEvent, useState } from 'react';
import urlAccountViewer from '../../assets/url-illustration.svg';
import { errorExceptions, errorPrivateKeyMessage } from '../../utils/constants';

interface initialErrorState {
  status: boolean;
  message: string;
}

function PrivateKeyLogin() {
  const [privateKey, setPrivateKey] = useState<string>('');
  const [error, setError] = useState<initialErrorState>({ status: false, message: '' });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPrivateKey(e.target.value);
  };

  const validatePrivateKey = (privateKey: string): string => {
    const regExOnlyNumbersAndUppercaseLetters = /^[0-9A-Z]+$/;
    const minNumberOfCharacters = 56;
    const initialLetterOfPrivateKey = 'S';

    if (privateKey === '') {
      return errorExceptions.empty;
    }

    if (
      regExOnlyNumbersAndUppercaseLetters.test(privateKey) &&
      privateKey.length === minNumberOfCharacters &&
      privateKey[0] === initialLetterOfPrivateKey
    ) {
      return errorExceptions.valid;
    }

    return errorExceptions.invalid;
  };

  const connectWithPrivateKey = (privateKey: string) => {
    const privateKeyValid = validatePrivateKey(privateKey);

    switch (privateKeyValid) {
      case errorExceptions.empty:
        setError({
          status: true,
          message: errorPrivateKeyMessage.withoutPrivateKey,
        });
        break;
      case errorExceptions.invalid:
        setError({
          status: true,
          message: errorPrivateKeyMessage.invalid,
        });
        break;
      case errorExceptions.valid:
        setError({
          status: true,
          message: errorPrivateKeyMessage.empty,
        });
    }
  };

  return (
    <>
      <h3 className="text-4xl text-center font-normal" data-cy="modal-title">
        Connect with a secret key
      </h3>
      <div data-cy="login-secret-key-container">
        <div className="flex flex-row gap-2 mb-6 p-4 rounded border-2 border-stellar-info-border bg-stellar-info-background">
          <div className="pt-1" data-cy="login-secret-key-info-svg">
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
              className="w-6 h-4 text-stellar-link"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4M12 8h.01"></path>
            </svg>
          </div>
          <div data-cy="login-secret-key-description">
            <img src={urlAccountViewer} className="pb-4" />
            <p className="pb-2 text-base font-normal">
              Always make sure the domain you are using to access the Account Viewer is{' '}
              <a
                href="https://accountviewer.stellar.org"
                target="_blank"
                className="text-stellar-link hover:text-stellar-link-hover"
                data-cy="login-secret-key-acount-viewer-url"
              >
                https://accountviewer.stellar.org
              </a>{' '}
              before entering your keys. Scammers can replicate this website on a different domain
              to steal your keys.
            </p>
            <h3 className="py-3 text-xl leading-relaxed text-white">
              Did you know that password managers are a safer alternative to copying and pasting
              your secret keys?
            </h3>
            <p className="pb-2 text-base font-thin">
              Password managers will autocomplete the secret key field only if they detect you're in
              the right domain. They also reduce risk by removing the need to copy and paste your
              secret key.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-6" data-cy="login-secret-key-form">
          <label htmlFor="secret-key" className="text-sm font-medium">
            YOUR SECRET KEY
          </label>
          <input
            type="password"
            value={privateKey}
            onChange={onChangeInput}
            placeholder="Starts with S, example: SCHK…ZLJK"
            className="py-2 px-3 border-2 bg-transparent border-solid border-stellar-border-secondary rounded hover:border-stellar-text-tertiary focus:outline-none focus:border-stellar-btn-primary"
          />
          {error.status && (
            <p className="text-stellar-error font-normal" data-cy="login-secret-key-form-errors">
              {error.message}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            data-cy="login-secret-key-btn-connect"
            onClick={() => connectWithPrivateKey(privateKey)}
            className="mb-8 bg-stellar-btn-primary font-medium rounded text-sm px-5 py-2.5 text-center hover:bg-stellar-btn-hover cursor-pointer shadow-md shadow-black-600/20 transition-all hover:shadow-lg hover:shadow-black-600/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Connect
          </button>
        </div>
      </div>
    </>
  );
}

export default PrivateKeyLogin;
