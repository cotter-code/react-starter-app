import { Link } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import { COTTER_API_KEY_ID } from "../../apiKeys";
import CotterContext from "../../contexts/userContext";
import "./styles.css";

function GetStartedCard({ step, stepNumber, title, onToggleStep, children }) {
  const open = step === stepNumber;
  const onClick = () => {
    if (stepNumber === step) {
      onToggleStep(0);
    } else {
      onToggleStep(stepNumber);
    }
  };
  return (
    <div className={`GetStartedCard__card ${open && "card"}`}>
      <div
        className={`GetStartedCard__title ${
          open && "GetStartedCard__title-open"
        }`}
        onClick={onClick}
      >
        <div className="GetStartedCard__title-number">{stepNumber}</div>
        {title}
        <div className="GetStartedCard__title-toggle">{open ? "-" : "+"}</div>
      </div>
      {open && <div className="GetStartedCard__children">{children}</div>}
    </div>
  );
}
function HomePage() {
  const { isLoading, isLoggedIn, user, logout } = useContext(CotterContext);
  const [step, setstep] = useState(0);

  useEffect(() => {
    if (
      (!isLoading || !COTTER_API_KEY_ID || COTTER_API_KEY_ID.length <= 36) &&
      step <= 1
    ) {
      if (isLoggedIn) {
        setstep(3);
      } else {
        setstep(1);
      }
    }
  }, [isLoading, isLoggedIn, step]);

  const toggleStep = (clickedStep) => {
    if (step === clickedStep) {
      setstep(0);
    } else {
      setstep(clickedStep);
    }
  };
  const nextStep = () => {
    setstep(step + 1);
  };
  return (
    <div className="GetStarted__container">
      <div className="GetStarted__text">
        <img
          className="GetStarted__logo"
          src={
            "https://storage.googleapis.com/cotter/assets/cotter_logo_round.svg"
          }
          alt="Logo"
        ></img>
        <div className="GetStarted__text-title">Cotter Starter Template</div>
        <div className="GetStarted__text-subtitle">
          <span className="icon">&#10003;</span>Pre-built Login Pages using{" "}
          <a
            href="https://www.cotter.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cotter
          </a>
        </div>
        <div className="GetStarted__text-subtitle">
          <span className="icon">&#10003;</span>Authentication State Management
        </div>
        <div className="GetStarted__text-subtitle">
          <span className="icon">&#10003;</span>User Management
        </div>
        <div className="GetStarted__text-subtitle">
          <span className="icon">&#10003;</span>Serverless Backend API with{" "}
          <a href="https://brev.dev" target="_blank" rel="noopener noreferrer">
            Brev
          </a>
        </div>
      </div>
      <div className="GetStarted__tutorial">
        <div className="GetStarted__tutorial-subtitle">
          Quickly Get Started with this Template in 5 Steps
        </div>
        <GetStartedCard
          step={step}
          stepNumber={1}
          title="Get your API Keys for Cotter's Login Form"
          onToggleStep={toggleStep}
        >
          <div className="GetStartedCard__subtitle">
            Go to{" "}
            <a
              href="https://dev.cotter.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cotter's Dashboard
            </a>
            , create a project, and <strong>paste your API Key ID</strong> to{" "}
            <code>src/apiKeys.js</code>
          </div>
          <div className="inset-button GetStartedCard__inset-button">
            <code>COTTER_API_KEY_ID = {COTTER_API_KEY_ID}</code>
            {COTTER_API_KEY_ID?.length === 36 && (
              <span className="icon-success GetStartedCard__icon-success">
                &#10003;
              </span>
            )}
          </div>
          {COTTER_API_KEY_ID?.length === 36 && (
            <div
              className="success-tag GetStartedCard__success-tag"
              onClick={nextStep}
            >
              Continue
              <span className="icon-success GetStartedCard__icon-success">
                →
              </span>
            </div>
          )}
        </GetStartedCard>

        <GetStartedCard
          step={step}
          stepNumber={2}
          title="Pick a login page template"
          onToggleStep={toggleStep}
        >
          <div className="GetStartedCard__subtitle">
            This Starter Template includes several login page templates for you
            to use. They're available in <code>pages/loginGift</code> and{" "}
            <code>pages/loginClassic</code>.
            <br />
            <br />
            <strong>Import the one that you like</strong> into{" "}
            <code>pages/_app/index.js</code>.
          </div>
          {COTTER_API_KEY_ID && (
            <div
              className="success-tag GetStartedCard__success-tag"
              onClick={nextStep}
            >
              Imported, next
              <span className="icon-success GetStartedCard__icon-success">
                →
              </span>
            </div>
          )}
        </GetStartedCard>

        <GetStartedCard
          step={step}
          stepNumber={3}
          title="Try logging in!"
          onToggleStep={toggleStep}
        >
          <div className="GetStartedCard__subtitle">
            As you can see, we've already included <code>CotterProvider</code>{" "}
            for authentication state management and{" "}
            <a
              href="https://reach.tech/router/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reach Router
            </a>{" "}
            for routing.
            <br />
            <br />
            Go to the <Link to="/login">Login Page</Link>,{" "}
            <strong>log in</strong>, then{" "}
            <strong>come back to this step</strong> to see the authentication
            state and user info.
          </div>
          <div className="inset-button GetStartedCard__inset-button">
            <pre>
              <code>
                {`const {isLoggedIn, user} = useContext(CotterContext);`}
                <br />
                <br />
                user ={" "}
                {user
                  ? JSON.stringify(user, null, 4)
                  : "'User is not logged-in'"}
              </code>
            </pre>
          </div>
          {isLoggedIn && (
            <div
              className="success-tag GetStartedCard__success-tag"
              onClick={nextStep}
            >
              You are logged in! Next
              <span className="icon-success GetStartedCard__icon-success">
                →
              </span>
            </div>
          )}
        </GetStartedCard>
        <GetStartedCard
          step={step}
          stepNumber={4}
          title="Now, try logging out"
          onToggleStep={toggleStep}
        >
          <div className="GetStartedCard__subtitle">
            To logout, you just need to call the <code>logout</code> function
            provided by <code>CotterProvider</code>.
          </div>
          <div className="inset-button GetStartedCard__inset-button">
            <pre>
              <code>
                {`const {isLoggedIn, logout} = useContext(CotterContext);`}
                <br />
                <br />
                {`<button onClick={logout}>Log Out</button>`}
                <br />
                <br />
                loggedin = {isLoggedIn ? "true" : "false"}
                <br />
              </code>
            </pre>
          </div>
          <div className="GetStartedCard__logout" onClick={logout}>
            Try Logging Out
          </div>
          {!isLoggedIn && (
            <div
              className="success-tag GetStartedCard__success-tag"
              onClick={nextStep}
            >
              You are now logged out!
              <span className="icon-success GetStartedCard__icon-success">
                →
              </span>
            </div>
          )}
        </GetStartedCard>

        <GetStartedCard
          step={step}
          stepNumber={5}
          title="Customize, Add fields, and More!"
          onToggleStep={toggleStep}
        >
          <div className="GetStartedCard__subtitle">
            This Starter Template was made following Cotter's Documentation.
            Learn more about:
            <ul className="GetStartedCard__list">
              <li>
                <a
                  href="https://docs.cotter.app/sdk-reference/backend-handling-response"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Authorize API Calls with Cotter's Access Token
                </a>
              </li>
              <li>
                <a
                  href="https://docs.cotter.app/sdk-reference/web/web-sdk-verify-email-phone/styling"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Style your Login Form
                </a>
              </li>
              <li>
                <a
                  href="https://docs.cotter.app/sdk-reference/web/web-sdk-verify-email-phone/advanced-customization#additional-fields"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Add additional fields
                </a>
              </li>
            </ul>
          </div>
          <div className="card GetStartedCard__card-button">
            <a
              href="https://docs.cotter.app/sdk-reference/web"
              target="_blank"
              rel="noopener noreferrer"
            >
              Full Documentation{"  "}👉
            </a>
          </div>
        </GetStartedCard>
      </div>
    </div>
  );
}

export default HomePage;
