"use client"
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { MdClose } from "react-icons/md";

import "./modal.css";

export const Modal = ({ modal, setModal, children }) => {
  const overlayRef = useRef();

  const handleOverlay = (evt) => {
    if (evt.target === overlayRef?.current) {
      setModal(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      style={{ zIndex: 9999 }}
      className={`overlay z-[9] bg-black bg-opacity-40 ${modal ? "open" : ""}`}
    >
      <div className={` modal_wrapperPay bg-white  rounded-lg z-[999999999]`}>
        <div className="relative">
          <button className="absolute right-[-15px] top-[-12px]" onClick={() => setModal(false)}>
            <MdClose size={24} color={"#808088"} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};