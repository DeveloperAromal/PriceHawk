import React, { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm backdrop-brightness-10 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <button
          className="absolute z-50 top-0 right-0 m-4 text-white hover:text-gray-700"
          onClick={onClose}
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
