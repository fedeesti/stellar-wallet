import { useState } from 'react';
import Modal from '../modal/Modal';

function LoginWithAlbedo() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mb-6 min-w-[250px] flex justify-between items-center px-8">
      <button
        onClick={openModal}
        data-cy="login-albedo-btn"
        className="border border-[#3a3e4d] hover:border-[#4b4f5d] rounded-md bg-[#292d3e] p-3 mr-3 flex flex-row justify-center items-center cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="896"
          height="1024"
          viewBox="0 0 896 1024"
          className="w-6 h-6 mx-3"
        >
          <path
            fill="#0691b7"
            d="M463.313 7.189h-42.172L-5.776 1016.272l1.276.54h113.923l85.432-201.929a843.025 843.025 0 00546.847-2.85l86.639 204.779h60.61l1.277-.54L463.31 7.189zm.856 813.714A804.155 804.155 0 01209.8 779.56l259.081-612.373 257.936 609.659a804.61 804.61 0 01-262.648 44.056z"
          ></path>
        </svg>
        <span className="text-base text-[#ffffff] pt-0.5 pr-2" data-cy="login-albedo-btn-title">
          Connect with Albedo
        </span>
      </button>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
}

export default LoginWithAlbedo;
