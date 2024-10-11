import { useContext } from "react";
import "../blocks/Modal.css";
import { AppContext } from "../contexts/AppContext";

export default function ModalWithForm({ children, handleSubmit, isVisible }) {
  const { setActiveModal } = useContext(AppContext);

  return (
    <div className={`modal ${isVisible ? "" : "modal_hidden"}`}>
      <div className="modal__box">
        <h3 className="modal__title">Sign in</h3>
        <button className="modal__close" type="button" onClick={() => {}}>
          <img
            src={"../src/assets/modal-close.svg"}
            alt="popup close button"
            className="modal__close-icon"
            onClick={() => setActiveModal("")}
          />
        </button>
        <form className="modal__form" onSubmit={handleSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}
