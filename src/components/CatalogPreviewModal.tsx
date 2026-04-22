import React from "react";
import Modal from "react-modal";
import CatalogFlipbook from "./CatalogFlipbook";

Modal.setAppElement("#root");

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  images: string[];
}

const CatalogPreviewModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  images,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      className="relative bg-transparent border-none shadow-none outline-none"
    >
      <button
        className="absolute top-4 right-4 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow-lg z-50"
        onClick={onRequestClose}
      >
        ✕
      </button>

      <div className="bg-transparent p-4 max-w-4xl w-full flex justify-center">
        <CatalogFlipbook images={images} />
      </div>
    </Modal>
  );
};

export default CatalogPreviewModal;
