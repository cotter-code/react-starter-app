import { Link } from "@reach/router";
import React, { useState } from "react";
import LoginForm from "../../components/LoginForm";
import "./styles.css";

function LoginPage() {
  const [login, setlogin] = useState(true);

  // LOGIN HANDLERS
  const onLoginSuccess = async (payload) => {
    alert("LOGIN SUCCESS");
  };
  const onLoginError = (err) => {
    alert("LOGIN ERROR");
    console.log(err);
  };

  // SIGNUP HANDLERS
  const onSignupBegin = async (payload) => {
    try {
      const url = "<BREV_CHECK_EMAIL_URL>";
      const resp = await fetch(
        `${url}?email=${encodeURIComponent(payload.identifier)}`
      );
      const response = await resp.json();
      if (resp.status !== 200) {
        return "Something went wrong";
      }
      if (response.exists) {
        return "User already exists";
      }
    } catch (e) {
      return "Something went wrong";
    }
    return null;
  };
  const onSignupSuccess = async (payload) => {
    alert("SIGNUP SUCCESS");
    try {
      const url = "<BREV_SIGNUP_URL>";
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const response = await resp.json();
      console.log(response);
      if (resp.status !== 200) {
        onLoginError(response);
      }
    } catch (e) {
      onLoginError(e);
    }
  };
  const onSignupError = (err) => {
    alert("SIGNUP ERROR");
    console.log(err);
  };
  return (
    <div className="LoginPage__columns">
      {/* LEFT COLUMN */}
      <div className="LoginPage__column LoginPage__login-column">
        <div className="LoginPage__login-container">
          {/*  LOGO  */}
          <Link to="/">
            <div className="logo">
              <img
                src="assets/images/logo.svg"
                className="LoginPage__logo"
                alt="logo"
              />
            </div>
          </Link>

          {/* SIGNUP COMPONENT */}
          <div
            className={`LoginPage__component ${
              !login && "LoginPage__component-active"
            }`}
          >
            <div className="LoginPage__message">Sign Up</div>
            <div className="LoginPage__message-subtitle">
              Create a new account to get started.
            </div>
            <div className="LoginPage__LoginForm">
              <LoginForm
                type="EMAIL"
                authMethod="MAGIC_LINK"
                onBegin={onSignupBegin}
                onSuccess={onSignupSuccess}
                onError={onSignupError}
                width={340}
                height={300}
                additionalFields={[
                  {
                    name: "name",
                    label: "Full Name",
                    placeholder: "Enter your full name",
                  },
                ]}
                styles={loginFormStyles}
              />
            </div>
            <div className="LoginPage__switch-login">
              Already have an account?{" "}
              <span onClick={() => setlogin(true)}>Login</span>
            </div>
          </div>

          {/*  LOGIN COMPONENT  */}
          <div
            className={`LoginPage__component ${
              login && "LoginPage__component-active"
            }`}
          >
            <div className="LoginPage__message">Login</div>
            <div className="LoginPage__message-subtitle">
              Login to access your account.
            </div>
            <div className="LoginPage__LoginForm">
              <LoginForm
                type="EMAIL"
                authMethod="MAGIC_LINK"
                onSuccess={onLoginSuccess}
                onError={onLoginError}
                width={340}
                height={300}
                styles={loginFormStyles}
                additionalFields={null}
              />
            </div>
            <div className="LoginPage__switch-login">
              Don't have an account?{" "}
              <span onClick={() => setlogin(false)}>Sign Up</span>
            </div>
          </div>
        </div>
      </div>
      {/* RIGHT COLUMN */}
      <div className="LoginPage__column LoginPage__image-column">
        <img
          src="/assets/images/login_img.png"
          alt="Login"
          className="LoginPage__image"
        />
      </div>
    </div>
  );
}
const loginFormStyles = {
  input_label: {
    fontFamily: "Inter",
    width: 300,
    fontSize: 12,
    letterSpacing: "-0.002em",
  },
  input_text_container_default: {
    boxShadow:
      "inset 3px 3px 6px 0px rgba(0, 0, 0, 0.06), inset -3px -3px 6px 0px #fff",
    borderRadius: "10px",
    backgroundColor: "rgb(242, 244, 248)",
    backgroundClip: "border-box",
    border: "none",
    padding: "16px 20px",
    width: 300,
  },
  input_text: {
    backgroundColor: "rgb(242, 244, 248)",
    fontSize: 15,
    fontFamily: "Inter",
  },
  button_container: {
    boxShadow:
      "rgba(0, 0, 0, 0.06) 4px 4px 8px 0px, rgb(255, 255, 255) -4px -4px 8px 0px",
    borderRadius: "10px",
    padding: "16px 20px",
    fontSize: "15px",
    backgroundColor: "rgb(242, 244, 248)",
    width: 300,
  },
  button_text: {
    fontFamily: "Inter",
    fontWeight: 700,
    letterSpacing: "-0.6px",
    color: "#000000",
  },
};

export default LoginPage;
