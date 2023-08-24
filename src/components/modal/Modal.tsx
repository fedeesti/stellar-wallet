import WarningLogin from '../generateKeys/WarningLogin';
import SecretKeyLogin from '../generateKeys/SecretKeyLogin';

interface IProps {
  content: string;
  changeContent: () => void;
  closeModal: () => void;
}

function Modal({ content, changeContent, closeModal }: IProps) {
  return (
    <div
      id="small-modal"
      className="fixed flex flex-col items-center justify-center inset-0 bg-black/30 transition-all ease-in-out duration-300"
    >
      <div
        className="relative w-full max-w-[90%] max-h-[80%] sm:max-w-xl sm:max-h-full overflow-y-auto"
        data-cy="modal-container"
      >
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center p-5">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              data-cy="modal-btn-close"
              onClick={closeModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="mx-6 space-y-6">
            <h3 className="text-2xl text-center font-medium text-gray-900" data-cy="modal-title">
              Connect with a secret key
            </h3>
            {content === 'warning' ? (
              <WarningLogin onClose={closeModal} changeContent={changeContent} />
            ) : (
              <SecretKeyLogin />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
