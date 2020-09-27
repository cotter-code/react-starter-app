import { Link, navigate } from "@reach/router";
import React from "react";
import LoginForm from "../../components/LoginForm";
import "./styles.css";

function LoginPage() {
  return (
    <div className="LoginPage__columns">
      <div className="LoginPage__column LoginPage__login-column">
        <div className="LoginPage__login-container">
          <Link to="/">
            <div className="logo">
              <img
                src="https://www.cotter.app/assets/cotter_logo.png"
                className="LoginPage__logo"
                alt="logo"
              />
            </div>
          </Link>
          <div className="LoginPage__message">
            Welcome!
            <br />
            Let's get started.
          </div>
          <div className="LoginPage__message-subtitle">
            Sign in or create a new account.
          </div>
          <LoginForm
            type="EMAIL"
            authMethod="MAGIC_LINK"
            onSuccess={() => (window.location.href = "/")}
            onError={(err) => alert(err)}
          />
        </div>
      </div>
      <div className="LoginPage__column LoginPage__image-column">
        <img
          src="/assets/images/login_img4.png"
          alt="Login"
          className="LoginPage__image"
        />
      </div>
    </div>
  );
}

export default LoginPage;
