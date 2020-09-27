import React from "react";
import { Router } from "@reach/router";
import HomePage from "../home";
import LoginPage from "../login";
import CotterProvider from "../../contexts/userProvider";
import { COTTER_API_KEY_ID } from "../../apiKeys";

function App() {
  return (
    <CotterProvider apiKeyID={COTTER_API_KEY_ID} loginPagePath="/login">
      <Router>
        <HomePage path="/" />
        <LoginPage path="/login" />
      </Router>
    </CotterProvider>
  );
}

export default App;
