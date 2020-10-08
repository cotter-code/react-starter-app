import { Link, navigate } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import { COTTER_API_KEY_ID } from "../../apiKeys";
import CotterContext from "../../contexts/userContext";
import "./styles.css";
import "../home/styles.css";
import agent from "../../agent";
import Cotter from "cotter";

function Dashboard() {
  const { isLoggedIn, isLoading } = useContext(CotterContext);
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [brevSetupSuccess, setBrevSetupSuccess] = useState(false);

  const [slug, setSlug] = useState(agent.slug);

  useEffect(() => {
    pingBrev();
  }, [slug]);

  const pingBrev = async () => {
    try {
      await agent.ping.get();
      setBrevSetupSuccess(true);
    } catch (error) {
      setBrevSetupSuccess(false);
    }
  };

  const getUsers = async () => {
    console.log("get users called");
    let users = await agent.Users.get();
    setUsers(users.users);
    setLoaded(true);
    console.log(users);
  };

  useEffect(() => {
    getUsers();
  }, [isLoggedIn, isLoading]);

  if (!brevSetupSuccess) {
    return (
      <div className="HomePage__container" style={{ flexDirection: "column" }}>
        <div>
          <h2>Set up 🥞 Brev to securely and scalably store your users!</h2>
          <h4>Two steps to having a fully functional app!</h4>
          <ol>
            <li>
              <a
                href="https://app.brev.dev/alphasignup?utm_source=reactstarter"
                target="_blank"
                rel="noopener noreferrer"
              >
                Create your Brev Account
              </a>
            </li>
            <li>
              <a
                href="https://docs.brev.dev/#/auth?id=build-a-full-app-with-user-authentication"
                target="_blank"
                rel="noopener noreferrer"
              >
                follow this quick tutorial
              </a>
            </li>
          </ol>
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="HomePage__container" style={{ flexDirection: "column" }}>
        <p className={"ellipsis"}>loading</p>
      </div>
    );
  if (!isLoggedIn)
    return (
      <div className="HomePage__container" style={{ flexDirection: "column" }}>
        <p>not logged in.</p>
      </div>
    );

  if (users === undefined) {
    return (
      <div className="HomePage__container" style={{ flexDirection: "column" }}>
        <h2>🥞 Brev isn't storing your users!</h2>
        <p>
          Follow the
          <a
            href="https://docs.brev.dev/#/auth?id=build-a-full-app-with-user-authentication"
            target="_blank"
            rel="noopener noreferrer"
          >
            quick tutorial here
          </a>{" "}
          to securely and scalably store your users!
        </p>
      </div>
    );
  }

  return (
    <div className="HomePage__container" style={{ flexDirection: "column" }}>
      {loaded === false ? (
        <p className={"ellipsis"}>loading</p>
      ) : (
        <>
          <div style={{ width: "100%" }}>
            <h4>Your Users</h4>
          </div>
          {users.length > 0 ? (
            <>
              <table>
                <thead>
                  <tr>
                    <th>name</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <h6>
              No users yet. Head to the <a href="/login">login page</a>
            </h6>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
