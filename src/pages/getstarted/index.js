import { Link, navigate } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import { COTTER_API_KEY_ID } from "../../apiKeys";
import CotterContext from "../../contexts/userContext";
import "./styles.css";
import agent from "../../agent";

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
function GetStartedPage() {
  const { isLoading, isLoggedIn, user } = useContext(CotterContext);
  const [step, setstep] = useState(0);
  const [stepUpdated, setstepUpdated] = useState(false);
  const [brevSetupSuccess, setBrevSetupSuccess] = useState(false);
  const [slug, setSlug] = useState(agent.slug);

  useEffect(() => {
    pingBrev();
  }, [slug]);

  useEffect(() => {
    if (
      (!isLoading || !COTTER_API_KEY_ID || COTTER_API_KEY_ID.length <= 36) &&
      step <= 1 &&
      !stepUpdated
    ) {
      if (isLoggedIn) {
        setstep(2);
        setstepUpdated(true);
      } else {
        setstep(1);
      }
    }
  }, [isLoading, isLoggedIn, step]);

  const pingBrev = async () => {
    try {
      await agent.ping.get();
      setBrevSetupSuccess(true);
    } catch (error) {
      setBrevSetupSuccess(false);
    }
  };

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
          src={"assets/images/logo.svg"}
          alt="Logo"
        ></img>
        <div className="GetStarted__text-title">Cotter Starter Template</div>
        <div className="GetStarted__text-subtitle">
          <span className="icon">&#10003;</span>Pre-built Login Page using{" "}
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
          Quickly Get Started with this Template in 4 Steps
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
            Go to the <Link to="/login">Login Page</Link> and{" "}
            <strong>log in</strong> to see the authentication state and user
            info.
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
              onClick={() => navigate("/dashboard")}
            >
              You are logged in!
            </div>
          )}
        </GetStartedCard>

        <GetStartedCard
          step={step}
          stepNumber={3}
          title="Use Brev to quickly and scalably store users!"
          onToggleStep={toggleStep}
        >
          <div className="GetStartedCard__subtitle">
            Set up Brev to get a backend and database to store users.
            <a
              href="https://app.brev.dev/ivyhacks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Create your Brev Account
            </a>{" "}
            <br />
            <br />
            Then{" "}
            <a
              href="https://docs.brev.dev/#/auth?id=build-a-full-app-with-user-authentication"
              target="_blank"
              rel="noopener noreferrer"
            >
              follow this quick tutorial
            </a>{" "}
            to handle Cotter auth and store users.
            <br />
            <br />
            Add your Brev project slug to agent.ts to hook up the backend.
            That's it!
          </div>
          <div className="inset-button GetStartedCard__inset-button">
            <pre>
              <code>
                {brevSetupSuccess
                  ? "Your Brev project is hooked up!"
                  : `add your Brev project slug on line 8 of agent.ts`}
              </code>
            </pre>
          </div>
          {brevSetupSuccess && (
            <div
              className="success-tag GetStartedCard__success-tag"
              onClick={() => navigate("/dashboard")}
            >
              Brev is hooked up!
            </div>
          )}
        </GetStartedCard>

        <GetStartedCard
          step={step}
          stepNumber={4}
          title="Go to the Dashboard to check how to call API endpoints"
          onToggleStep={toggleStep}
        >
          <div className="GetStartedCard__subtitle">
            Go to the pre-built <strong>Dashboard Page</strong> to see how to
            call your public and protected API Endpoints.
          </div>

          <div className="card GetStartedCard__card-button">
            <Link to="/dashboard">Dashboard{"  "}👉</Link>
          </div>
        </GetStartedCard>

        <GetStartedCard
          step={step}
          stepNumber={5}
          title="Update the import for the Home Page"
          onToggleStep={toggleStep}
        >
          <div className="GetStartedCard__subtitle">
            We've also included a <strong>Landing Page</strong>. Update the
            import on <code>src/pages/_app</code> for the <code>HomePage</code>{" "}
            to <code>../home</code> to replace this tutorial with a landing
            page.
          </div>
        </GetStartedCard>
      </div>
    </div>
  );
}

export default GetStartedPage;
