import { Link } from "@reach/router";
import React from "react";
import LoginForm from "../../components/LoginForm";
import "./styles.css";

function LoginPageGift() {
  return (
    <div className="LoginPageGift__columns">
      <div className="LoginPageGift__column LoginPageGift__login-column">
        <div className="LoginPageGift__login-container">
          <Link to="/">
            <div className="logo">
              <img
                src="https://storage.googleapis.com/cotter/assets/cotter_logo_round.svg"
                className="LoginPageGift__logo"
                alt="logo"
              />
            </div>
          </Link>
          <div className="LoginPageGift__message">
            Welcome!
            <br />
            Let's get started.
          </div>
          <div className="LoginPageGift__message-subtitle">
            Sign in or create a new account.
          </div>
          <div className="LoginPageGift__LoginForm">
            <LoginForm
              type="EMAIL"
              authMethod="MAGIC_LINK"
              onSuccess={(resp) => {
                window.location.href = "/";
              }}
              onError={(err) => alert(err)}
              width={340}
              height={300}
              styles={{
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
              }}
            />
          </div>
        </div>
      </div>
      <div className="LoginPageGift__column LoginPageGift__image-column">
        <img
          src="/assets/images/login_img.png"
          alt="Login"
          className="LoginPageGift__image"
        />
      </div>
    </div>
  );
}

export default LoginPageGift;
