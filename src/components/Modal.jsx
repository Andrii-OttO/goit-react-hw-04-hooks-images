// import React from "react";
import style from "./styles.module.css";
// import PropTypes from "prop-types";
import { useEffect } from "react";

function Modal({ toggleModal, largeImageURL, alt }) {
  console.log("toggleModal", toggleModal);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        toggleModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleModal]);

  const backDroppCloseModal = (event) => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  return (
    <div className={style.Overlay} onClick={backDroppCloseModal}>
      <div className={style.Modal}>
        <img src={largeImageURL} alt={alt} />
      </div>
    </div>
  );
}
// Modal.propTypes = {
//   toggleMod: PropTypes.func,
//   largeImageURL: PropTypes.string,
//   alt: PropTypes.string,
// };
export default Modal;
