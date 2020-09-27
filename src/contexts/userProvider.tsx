import React, { useEffect, useState } from "react";
import Cotter from "cotter";
import { Config } from "cotter/lib/binder";
import User from "cotter/lib/models/User";
import CotterContext from "./userContext";
import { CotterAccessToken } from "cotter-token-js";

export interface CotterProviderOptions extends Config {
  /**
   * The child nodes your Provider has wrapped
   */
  children?: React.ReactNode;
  apiKeyID: string;
  config?: Config;
}

/**
 * ```jsx
 * <CotterProvider
 *   apiKeyID={YOUR_API_KEY_ID}
 * >
 *   <MyApp />
 * </CotterProvider>
 * ```
 *
 * Provides the CotterContext to its child components.
 */
const CotterProvider = (opts: CotterProviderOptions) => {
  let { children, apiKeyID, config } = opts;
  const [loggedIn, setloggedIn] = useState(false);
  const [loading, setloading] = useState(true);
  const [cotter, setcotter] = useState<Cotter | undefined>(undefined);
  const [user, setuser] = useState<User | undefined>(undefined);
  useEffect(() => {
    if (apiKeyID) {
      if (config && config.ApiKeyID) {
        const c = new Cotter(config);
        setcotter(c);
      } else {
        const c = new Cotter(apiKeyID);
        setcotter(c);
      }
    }
  }, [apiKeyID, config]);

  useEffect(() => {
    if (cotter) {
      checkLoggedIn(cotter);
    }
  }, [cotter]);

  const checkLoggedIn = async (cot: Cotter) => {
    const accessToken = await cot.tokenHandler.getAccessToken();
    if (accessToken && accessToken.token?.length > 0) {
      setloggedIn(true);
      const usr = cot.getLoggedInUser();
      setuser(usr);
    } else {
      setloggedIn(false);
      setuser(undefined);
    }
    setloading(false);
  };

  const getAccessToken = async (): Promise<CotterAccessToken | null> => {
    if (cotter) {
      const accessToken = await cotter.tokenHandler.getAccessToken();
      return accessToken;
    } else {
      throw new Error(
        "Cotter is undefined, you may forgot to wrap your component in <CotterProvider>"
      );
    }
  };
  const logout = async (): Promise<void> => {
    if (cotter) {
      await cotter.logOut();
      setloggedIn(false);
      setuser(undefined);
    } else {
      throw new Error(
        "Cotter is undefined, you may forgot to wrap your component in <CotterProvider>"
      );
    }
  };

  return (
    <CotterContext.Provider
      value={{
        isLoggedIn: loggedIn,
        isLoading: typeof window === "undefined" || loading,
        cotter: cotter,
        user: user,
        logout: logout,
        getAccessToken: getAccessToken,
      }}
    >
      {children}
    </CotterContext.Provider>
  );
};

export default CotterProvider;
