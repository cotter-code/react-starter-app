import { Link } from "@reach/router";
import React, { useState } from "react";
import "./styles.css";

function Logo() {
  const [hoverOpen, sethoverOpen] = useState(false);
  return (
    <div
      className="Logo__container"
      onMouseEnter={() => sethoverOpen(true)}
      onMouseLeave={() => sethoverOpen(false)}
    >
      <Link to="/">
        <div className="card-button Logo__card">
          <img
            className="Logo__logo Logo__item"
            src="https://storage.googleapis.com/cotter/assets/cotter_logo_round.svg"
            alt="Cotter Logo"
          />
          <div className="Logo__plus Logo__item">+</div>
          <div className="Logo__logo Logo__item">🥞</div>
        </div>
      </Link>
      <div className={`Logo__menu ${hoverOpen && "Logo__menu-hover"}`}>
        <div className="card-button Logo__card-menu">
          <a
            href="https://www.cotter.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="Logo__logo Logo__item"
              src="https://storage.googleapis.com/cotter/assets/cotter_logo_round.svg"
              alt="Cotter Logo"
            />
            <div className="Logo__text">Cotter ↗</div>
          </a>
        </div>
        <div className="card-button Logo__card-menu">
          <a href="https://brev.dev" target="_blank" rel="noopener noreferrer">
            <div className="Logo__logo Logo__item">🥞</div>
            <div className="Logo__text">Brev ↗</div>
          </a>
        </div>
      </div>
    </div>
  );
}
export default Logo;
