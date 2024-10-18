import "../blocks/Modal.css";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default function ModalWithForm({
  children,
  handleSubmit,
  isVisible,
  formTitle,
}) {
  const { closeActiveModal } = useContext(AppContext);

  return (
    <div className={`modal ${isVisible ? "" : "modal_hidden"}`}>
      <div className="modal__box">
        <h3 className="modal__title">{formTitle}</h3>
        <button className="modal__close" type="button" onClick={() => {}}>
          <img
            src={"../src/assets/close.svg"}
            alt="popup close button"
            className="modal__close-icon"
            onClick={closeActiveModal}
          />
        </button>
        <form className="modal__form" onSubmit={handleSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}
