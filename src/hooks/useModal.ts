import { useState } from 'react';
import { IContentModal } from '../types/types';

const INITIAL_CONTENT_MODAL: IContentModal = {
  viewWarning: false,
  viewSecretKey: false,
  viewConfirmGenerate: false,
  viewGenerateKeypair: false,
};

function useModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [contentModal, setContentModal] = useState<IContentModal>(INITIAL_CONTENT_MODAL);

  const closeModal = () => {
    setIsModalOpen(false);
    setContentModal(INITIAL_CONTENT_MODAL);
  };

  const handleGenerateKeypair = () => {
    setContentModal({ ...INITIAL_CONTENT_MODAL, viewGenerateKeypair: true });
  };

  const handleGenerateConfirm = () => {
    setIsModalOpen(true);
    setContentModal({ ...contentModal, viewConfirmGenerate: true });
  };

  const handleSecretKeyLogin = () => {
    setContentModal({ ...INITIAL_CONTENT_MODAL, viewSecretKey: true });
  };

  const handleWarningLogin = () => {
    setIsModalOpen(true);
    setContentModal({ ...contentModal, viewWarning: true });
  };

  const handleChangeContent = contentModal.viewWarning
    ? handleSecretKeyLogin
    : handleGenerateKeypair;

  return {
    isModalOpen,
    closeModal,
    contentModal,
    handleGenerateConfirm,
    handleWarningLogin,
    handleChangeContent,
  };
}

export default useModal;
