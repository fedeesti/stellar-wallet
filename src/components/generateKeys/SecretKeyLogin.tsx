import { ChangeEvent, useState } from 'react';
import urlAccountViewer from '../../assets/url-illustration.svg';

interface initialErrorState {
  status: boolean;
  message: string;
}

function SecretKeyLogin() {
  const [secretKey, setSecretKey] = useState<string>('');
  const [error, setError] = useState<initialErrorState>({ status: false, message: '' });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSecretKey(e.target.value);
  };

  const validateSecretKey = (secretKey: string): string => {
    const regEx = /^[0-9A-Z]+$/;

    if (secretKey === '') {
      return 'empty';
    }

    if (regEx.test(secretKey) && secretKey.length === 56 && secretKey[0] === 'S') {
      return 'valid';
    }

    return 'invalid';
  };

  const connectAWallet = (secretKey: string) => {
    const secretKeyValid = validateSecretKey(secretKey);
    console.log(secretKeyValid);

    if (secretKeyValid === 'empty') {
      setError({
        status: true,
        message: 'Please enter your secret key',
      });
    }
    if (secretKeyValid === 'invalid') {
      setError({
        status: true,
        message: 'Invalid secret key. Secret keys are uppercase and begin with the letter "S."',
      });
    }
    if (secretKeyValid === 'valid') {
      setError({
        status: true,
        message: '',
      });
    }
  };

  return (
    <div data-cy="login-secret-key-container">
      <div className="flex flex-row gap-2 mb-6 p-4 rounded border-2 border-stellar-violet-900 bg-stellar-violet-800 text-stellar-ghostwhite">
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
            className="w-6 h-4 text-stellar-violet-200"
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
              className="text-stellar-violet-200 hover:text-stellar-violet-100"
              data-cy="login-secret-key-acount-viewer-url"
            >
              https://accountviewer.stellar.org
            </a>{' '}
            before entering your keys. Scammers can replicate this website on a different domain to
            steal your keys.
          </p>
          <h3 className="py-3 text-lg leading-relaxed ">
            Did you know that password managers are a safer alternative to copying and pasting your
            secret keys?
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
          value={secretKey}
          onChange={onChangeInput}
          placeholder="Starts with S, example: SCHK…ZLJK"
          className="py-2 px-3 border-2 bg-[transparent] border-solid border-stellar-gray-400 rounded focus:outline-none focus:border-stellar-violet-700"
        />
        {error.status && (
          <p className="text-stellar-red-400 font-normal" data-cy="login-secret-key-form-errors">
            {error.message}
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          data-cy="login-secret-key-btn-connect"
          onClick={() => connectAWallet(secretKey)}
          className="mb-8 bg-stellar-violet-700 font-medium rounded text-sm px-5 py-2.5 text-center hover:bg-stellar-violet-500 cursor-pointer"
        >
          Connect
        </button>
      </div>
    </div>
  );
}

export default SecretKeyLogin;
