import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import CotterContext from "../../contexts/userContext";
import {
  AUTHENTICATION_METHOD,
  IDENTIFIER_TYPE,
  VerifySuccess,
} from "cotter/lib/binder";

interface LoginFormOptions {
  type: IDENTIFIER_TYPE;
  authMethod: AUTHENTICATION_METHOD;
  onSuccess: (response: VerifySuccess) => void;
  onError: (err: any) => void;
}

/**
 * ```jsx
 * <LoginForm
 *    type="EMAIL"
 *    authMethod="MAGIC_LINK"
 *    onSuccess={() => navigate("/")}
 *    onError={(err) => alert(err)}
 * />;
 * ```
 *
 * Initiate Cotter's login form
 **/

function LoginForm({
  onSuccess,
  onError,
  type = IDENTIFIER_TYPE.EMAIL,
  authMethod = AUTHENTICATION_METHOD.MAGIC_LINK,
}: LoginFormOptions) {
  const { cotter } = useContext(CotterContext);
  useEffect(() => {
    if (cotter) {
      const cotterMethod =
        authMethod === AUTHENTICATION_METHOD.MAGIC_LINK
          ? cotter.signInWithLink()
          : cotter.signInWithOTP();

      const cotterType =
        type === IDENTIFIER_TYPE.EMAIL
          ? cotterMethod.showEmailForm()
          : cotterMethod.showPhoneForm();

      cotterType.then((resp) => onSuccess(resp)).catch((err) => onError(err));
    }
  }, [cotter, onSuccess, onError, authMethod, type]);
  return (
    <div id="cotter-form-container" style={{ width: 300, height: 300 }}></div>
  );
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default LoginForm;
