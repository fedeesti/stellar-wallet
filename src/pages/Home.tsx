import { useState } from 'react';
import Modal from '../components/modal/Modal';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<string>('');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleGenerateKeypair = () => {
    setContentModal('');
  };

  const handleGenerateConfirm = () => {
    setIsModalOpen(true);
    setContentModal('confirm');
  };

  const handleSecretKeyLogin = () => {
    setContentModal('secret');
  };

  const handleWarningLogin = () => {
    setIsModalOpen(true);
    setContentModal('warning');
  };

  return (
    <div className="relative py-16">
      <div className="relative container m-auto px-6 md:px-12 xl:px-40" data-cy="home-container">
        <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
          <div className="p-6 sm:p-16">
            <h2 className="mb-8 text-2xl font-bold text-center" data-cy="home-title">
              Connect with a wallet
            </h2>
            <div className="mt-16 grid space-y-4" data-cy="home-button-list-container">
              <button
                className="group h-12 px-6"
                data-cy="home-connect-secret-key"
                onClick={handleWarningLogin}
              >
                <div className="relative flex items-center space-x-4 justify-center">
                  <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm sm:text-base underline">
                    Connect with a secret key
                  </span>
                </div>
              </button>
              <button className="group h-12 px-6" data-cy="home-generate-keypair">
                <div className="relative flex items-center space-x-4 justify-center">
                  <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm sm:text-base underline hover:no-underline">
                    Generate key pair for a new account
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          content={contentModal}
          changeContent={handleGenerateKeypair}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default Home;
