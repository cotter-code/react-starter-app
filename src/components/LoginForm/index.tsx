import PropTypes from "prop-types";
import React, { useContext, useEffect } from "react";
import CotterContext from "../../contexts/userContext";
import {
  AUTHENTICATION_METHOD,
  IDENTIFIER_TYPE,
  Styles,
  VerifySuccess,
} from "cotter/lib/binder";

interface LoginFormOptions {
  type: IDENTIFIER_TYPE;
  authMethod: AUTHENTICATION_METHOD;
  onSuccess: (response: VerifySuccess) => void;
  onError: (err: any) => void;
  styles?: Styles;
  width: number;
  height: number;
}

/**
 * ```jsx
 * <LoginForm
 *    authMethod="MAGIC_LINK"
 *    onSuccess={() => navigate("/")}
 *    type="EMAIL"
 *    onError={(err) => alert(err)}
 *    styles={{
 *      input_label: {color: "#ffffff"}
 *    }}
 *    width={300}
 *    height={300}
 * />;
 * ```
 *
 * Initiate Cotter's login form
 **/

function LoginForm({
  onSuccess,
  onError,
  styles,
  type = IDENTIFIER_TYPE.EMAIL,
  authMethod = AUTHENTICATION_METHOD.MAGIC_LINK,
  width = 300,
  height = 300,
}: LoginFormOptions) {
  const { cotter } = useContext(CotterContext);
  useEffect(() => {
    if (cotter) {
      if (styles) {
        cotter.config.Styles = styles;
      }
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
  }, [cotter, onSuccess, onError, authMethod, type, styles]);
  return (
    <div
      id="cotter-form-container"
      style={{ width: width, height: height }}
    ></div>
  );
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default LoginForm;
