import Modal from '../components/modal/Modal';
import useModal from '../hooks/useModal';
import LoginWithAlbedo from '../components/login/LoginWithAlbedo';

function Home() {
  const {
    isModalOpen,
    closeModal,
    contentModal,
    handleWarningLogin,
    handleGenerateConfirm,
    handleChangeContent,
    handleAlbedoLogin,
  } = useModal();

  return (
    <main className="flex flex-col flex-grow items-stretch shrink-0 bg-stellar-bg-primary">
      <div className="relative container w-full my-0 mx-auto px-12" data-cy="home-container">
        <div className="pt-16 flex flex-col items-center">
          <h2 className="mb-2 text-white text-5xl font-normal text-center" data-cy="home-title">
            Connect with a wallet
          </h2>
          <div className="pb-12 pt-16">
            <LoginWithAlbedo openModal={handleAlbedoLogin} />
          </div>
          <div className="flex flex-col items-center py-6" data-cy="home-button-list-container">
            <button className="mb-8" data-cy="home-connect-secret-key" onClick={handleWarningLogin}>
              <div className="relative flex items-center space-x-4 justify-center">
                <span className="block w-max font-medium tracking-wide text-white text-sm sm:text-base underline hover:no-underline">
                  Connect with a secret key
                </span>
              </div>
            </button>
            <button
              className="mb-8"
              data-cy="home-generate-keypair"
              onClick={handleGenerateConfirm}
            >
              <div className="relative flex items-center space-x-4 justify-center">
                <span className="block w-max font-medium tracking-wide text-white text-sm sm:text-base underline hover:no-underline">
                  Generate key pair for a new account
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal content={contentModal} changeContent={handleChangeContent} closeModal={closeModal} />
      )}
    </main>
  );
}

export default Home;
