import "../blocks/Modal.css";
import { useContext } from "react";
import ModalWithForm from "./ModalWithForm";
import { UserContext } from "../contexts/UserContext";
import { AppContext } from "../contexts/AppContext";
import { useFormValidation } from "../utils/useFormValidation";

export default function SigninModal({ isVisible }) {
  const { setUserState } = useContext(UserContext);
  const { setActiveModal } = useContext(AppContext);
  const { values, errors, isValid, handleChange } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    setUserState((userState) => ({
      ...userState,
      loggedIn: true,
      username: values.email.split("@")[0], //TODO: replace w username retrieved from DB
      email: values.email,
      password: values.password,
    }));
    setActiveModal("");
  };

  return (
    <ModalWithForm
      isVisible={isVisible}
      handleSubmit={handleSubmit}
      formTitle={"Sign in"}
    >
      <label htmlFor="email-signin" className="modal__label">
        Email
        <input
          type="email"
          className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
          id="email-signin"
          name="email"
          placeholder="Enter email"
          minLength="2"
          maxLength="64"
          required
          value={values.email || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.email}</span>
      </label>
      <label htmlFor="password-signin" className="modal__label">
        Password
        <input
          type="password"
          className={`modal__input ${
            errors.password ? "modal__input_error" : ""
          }`}
          id="password-signin"
          name="password"
          placeholder="Enter password"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.password}</span>
      </label>
      <button
        className={`modal__round-button ${
          !isValid ? "modal__round-button_error" : ""
        }`}
        type="submit"
      >
        Sign in
      </button>
      <div className="modal__text-button">
        or
        <button
          className="modal__text-button-link"
          type="button"
          onClick={() => setActiveModal("signup")}
        >
          {" "}
          Sign up
        </button>
      </div>
    </ModalWithForm>
  );
}
