import React from "react";
import { Router } from "@reach/router";
import HomePage from "../getstarted"; // 👈  Change the import to home
import LoginPage from "../login";
import CotterProvider from "../../contexts/userProvider";
import { COTTER_API_KEY_ID } from "../../apiKeys";
import Logo from "../../components/Logo";
import Navbar from "../../components/Navbar";

function App() {
  return (
    <CotterProvider apiKeyID={COTTER_API_KEY_ID}>
      <Navbar />
      <Logo />
      <Router>
        <HomePage path="/" />
        <LoginPage path="/login" />
      </Router>
    </CotterProvider>
  );
}

export default App;
