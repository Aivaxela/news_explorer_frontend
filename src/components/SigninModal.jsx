import "../blocks/Modal.css";
import { useContext, useState } from "react";
import ModalWithForm from "./ModalWithForm";
import { UserContext } from "../contexts/UserContext";

export default function SigninModal() {
  const {userState, setUserState} = useContext(UserContext);
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSigninSubmit = (e) => {
    e.preventDefault();
    console.log(email);
  } 

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
          value={email}
          onChange={handleEmailChange}
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
      <button className="modal__round-button" onClick={(e) => handleSigninSubmit(e)} type="submit">Sign in</button>
      <div className="modal__text-button">
        or
        <button className="modal__text-button-link"> Sign up</button>
      </div>
    </ModalWithForm>
  );
}
