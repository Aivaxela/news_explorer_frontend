import "../blocks/Modal.css";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { useFormValidation } from "../utils/useFormValidation";
import ModalWithForm from "./ModalWithForm";

export default function SignupModal({ handleSignup, isVisible }) {
  const { setActiveModal } = useContext(AppContext);
  const { values, setErrors, errors, isValid, handleChange, resetForm } =
    useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    if (values.password !== values.passwordConfirm) {
      setErrors({
        ...errors,
        passwordConfirm: "Passwords must match",
      });
      return;
    }
    handleSignup(values, resetForm);
  };

  return (
    <ModalWithForm
      isVisible={isVisible}
      handleSubmit={handleSubmit}
      formTitle={"Sign up"}
    >
      <label htmlFor="username-signup" className="modal__label">
        Username*
        <input
          className="modal__input"
          id="username-signup"
          type="text"
          name="username"
          placeholder="Enter username"
          minLength="6"
          maxLength="32"
          required
          value={values.username || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.username}</span>
      </label>
      <label htmlFor="email-signup" className="modal__label">
        Email*
        <input
          type="email"
          className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
          id="email-signup"
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
      <label htmlFor="password-signup" className="modal__label">
        Password*
        <input
          type="password"
          className={`modal__input ${
            errors.password ? "modal__input_error" : ""
          }`}
          id="password-signup"
          name="password"
          minLength="8"
          maxLength="64"
          placeholder="Enter password"
          required
          value={values.password || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.password}</span>
      </label>

      <label htmlFor="password-confirm-signup" className="modal__label">
        Confirm Password*
        <input
          type="password"
          className={`modal__input ${
            errors.passwordConfirm ? "modal__input_error" : ""
          }`}
          id="password-confirm-signup"
          name="passwordConfirm"
          placeholder="Confirm password"
          required
          value={values.passwordConfirm || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.passwordConfirm}</span>
      </label>
      <button
        className={`modal__round-button ${
          !isValid ? "modal__round-button_error" : ""
        }`}
        type="submit"
      >
        Sign up
      </button>
      <div className="modal__text-button">
        or
        <button
          className="modal__text-button-link"
          type="button"
          onClick={() => setActiveModal("signin")}
        >
          {" "}
          Sign in
        </button>
      </div>
    </ModalWithForm>
  );
}
