import "../blocks/Modal.css";
import ModalWithForm from "./ModalWithForm";

export default function SigninModal() {
  return (
    <ModalWithForm>
      <label htmlFor="email-signin" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email-signin"
          name="email"
          placeholder="Enter email"
          minLength="2"
          maxLength="64"
          required
        />
      </label>
      <label htmlFor="password-signin" className="modal__label">
        Password
        <input
          type="passwprd"
          className="modal__input"
          id="password-signin"
          name="password"
          placeholder="Enter password"
          required
        />
      </label>
      <button className="modal__round-button">Sign in</button>
      <div className="modal__text-button">
        or
        <button className="modal__text-button-link"> Sign up</button>
      </div>
    </ModalWithForm>
  );
}
