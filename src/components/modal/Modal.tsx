import { IContentModal } from '../../types/types';
import ConfirmGenerate from '../login/ConfirmGenerate';
import GenerateKeypair from '../login/GenerateKeypair';
import SecretKeyLogin from '../login/SecretKeyLogin';
import WarningLogin from '../login/WarningLogin';
import AlbedoLogin from '../login/AlbedoLogin';

interface IProps {
  content: IContentModal;
  changeContent: () => void;
  closeModal: () => void;
}

function Modal({ content, changeContent, closeModal }: IProps) {
  const { viewWarning, viewSecretKey, viewConfirmGenerate, viewGenerateKeypair, viewAlbedoLogin } =
    content;
  return (
    <div
      className="fixed w-full z-30 min-w-[360px] min-h-screen overflow-hidden left-0 inset-y-0 text-stellar-text-primary bg-stellar-black/90"
      onClick={closeModal}
    >
      <div
        data-cy="modal-container"
        onClick={(e) => e.stopPropagation()}
        className="absolute w-4/5 max-w-[600px] bg-stellar-bg-primary z-[calc(30+1)] overflow-hidden -translate-x-2/4 translate-y-[-35%] mt-0 pt-14 pb-8 px-6 rounded-lg left-2/4 top-[35%]"
      >
        <div className="absolute cursor-pointer right-3 top-4">
          <button
            type="button"
            className="bg-transparent text-stellar-text-primary hover:text-stellar-text-tertiary rounded-lg text-sm w-8 h-8 ml-auto"
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
        <div className="overflow-y-auto max-h-[70vh] space-y-6">
          {viewWarning && <WarningLogin onClose={closeModal} changeContent={changeContent} />}
          {viewSecretKey && <SecretKeyLogin />}
          {viewConfirmGenerate && (
            <ConfirmGenerate onClose={closeModal} changeContent={changeContent} />
          )}
          {viewGenerateKeypair && <GenerateKeypair />}
          {viewAlbedoLogin && <AlbedoLogin closeModal={closeModal} />}
        </div>
      </div>
    </div>
  );
}
export default Modal;
