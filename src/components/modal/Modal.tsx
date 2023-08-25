interface IProps {
  closeModal: () => void;
}

function Modal({ closeModal }: IProps) {
  return (
    <div
      className="fixed w-full z-30 min-w-[360px] min-h-screen overflow-hidden left-0 inset-y-0 text-stellar-ghostwhite bg-stellar-black/90"
      onClick={closeModal}
    >
      <div
        className="absolute w-4/5 max-w-[600px] bg-stellar-black z-[calc(30+1)] overflow-hidden -translate-x-2/4 translate-y-[-35%] mt-0 pt-14 pb-8 px-6 rounded-lg left-2/4 top-[35%]"
        data-cy="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute cursor-pointer right-3 top-4">
          <button
            type="button"
            className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto"
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
        <div className="overflow-y-auto max-h-[70vh]" data-cy="modal-title">
          Modal
        </div>
      </div>
    </div>
  );
}
export default Modal;
