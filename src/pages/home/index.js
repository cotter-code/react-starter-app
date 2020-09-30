import React from "react";
import "./styles.css";

function HomePage() {
  return (
    <div className="HomePage__container">
      <div className="HomePage__text HomePage__column">
        <img
          className="HomePage__logo"
          src={"assets/images/logo.svg"}
          alt="Logo"
        ></img>
        <div className="HomePage__text-title">Cotter Starter Template</div>
        <div className="HomePage__text-subtitle">
          <span className="icon">&#10003;</span>Pre-built Login Page using{" "}
          <a
            href="https://www.cotter.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cotter
          </a>
        </div>
        <div className="HomePage__text-subtitle">
          <span className="icon">&#10003;</span>Authentication State Management
        </div>
        <div className="HomePage__text-subtitle">
          <span className="icon">&#10003;</span>User Management
        </div>
        <div className="HomePage__text-subtitle">
          <span className="icon">&#10003;</span>Serverless Backend API with{" "}
          <a href="https://brev.dev" target="_blank" rel="noopener noreferrer">
            Brev
          </a>
        </div>
      </div>
      <div className="HomePage__image-column HomePage__column">
        <img
          src="/assets/images/home_img.png"
          alt="Home"
          className="HomePage__image"
        />
      </div>
    </div>
  );
}

export default HomePage;
