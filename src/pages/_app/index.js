import React from "react";
import { Router } from "@reach/router";
import HomePage from "../home";
import LoginPage from "../loginGift"; // 👈  Change the import to the login page that you want to use
import CotterProvider from "../../contexts/userProvider";
import { COTTER_API_KEY_ID } from "../../apiKeys";
import Logo from "../../components/Logo";

function App() {
  return (
    <CotterProvider apiKeyID={COTTER_API_KEY_ID} loginPagePath="/login">
      <Logo />
      <Router>
        <HomePage path="/" />
        <LoginPage path="/login" />
      </Router>
    </CotterProvider>
  );
}

export default App;
