import "../blocks/Modal.css";

export default function ModalWithForm({ children }) {
  return (
    <div className="modal">
      <div className="modal__box">
        <h3 className="modal__title">Sign in</h3>
        <button className="modal__close" type="button" onClick={() => {}}>
          <img
            src={"../src/assets/modal-close.svg"}
            alt="popup close button"
            className="modal__close-icon"
          />
        </button>
        <form className="modal__form">{children}</form>
      </div>
    </div>
  );
}
