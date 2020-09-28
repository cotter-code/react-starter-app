import { Link } from "@reach/router";
import React from "react";
import LoginForm from "../../components/LoginForm";
import "./styles.css";

function LoginPageClassic() {
  return (
    <div className="LoginPageClassic__container">
      <div className="LoginPageClassic__login-container">
        <div className="logo">
          <Link to="/">
            <img
              src="https://storage.googleapis.com/cotter/assets/cotter_logo_round.svg"
              className="LoginPageClassic__logo"
              alt="logo"
            />
          </Link>
        </div>
        <div className="LoginPageClassic__message">
          Welcome!
          <br />
          Let's get started.
        </div>
        <div className="LoginPageClassic__message-subtitle">
          Sign in or create a new account.
        </div>
        <div className="LoginForm">
          <LoginForm
            type="EMAIL"
            authMethod="MAGIC_LINK"
            onSuccess={(resp) => {
              window.location.href = "/";
            }}
            onError={(err) => alert(err)}
            width={300}
            height={280}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPageClassic;
