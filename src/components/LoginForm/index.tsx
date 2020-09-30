import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import CotterContext from "../../contexts/userContext";
import {
  AUTHENTICATION_METHOD,
  IDENTIFIER_TYPE,
  Styles,
  AdditionalField,
  VerifySuccess,
  OnBeginHandler,
  Config,
} from "cotter/lib/binder";

interface LoginFormOptions {
  type: IDENTIFIER_TYPE;
  authMethod: AUTHENTICATION_METHOD;
  onSuccess: (response: VerifySuccess) => void;
  onError: (err: any) => void;
  onBegin?: OnBeginHandler;
  styles?: Styles;
  additionalFields?: AdditionalField[];
  width: number;
  height: number;
}

/**
 * ```jsx
 * <LoginForm
 *    authMethod="MAGIC_LINK"
 *    type="EMAIL"
 *    onSuccess={() => navigate("/")}
 *    onError={(err) => alert(err)}
 *    onBegin={(payload) => checkEmail(payload.identifier)}
 *    styles={{
 *      input_label: {color: "#ffffff"}
 *    }}
 *    additionalFields={[
 *      {
 *        name: "name",
 *        label: "Full Name",
 *        placeholder: "Enter your full name",
 *      },
 *    ]}
 *    width={300}
 *    height={300}
 * />;
 * ```
 *
 * Initiate Cotter's login form
 **/

function LoginForm({
  onBegin,
  onSuccess,
  onError,
  styles,
  additionalFields,
  type = IDENTIFIER_TYPE.EMAIL,
  authMethod = AUTHENTICATION_METHOD.MAGIC_LINK,
  width = 300,
  height = 300,
}: LoginFormOptions) {
  const [loaded, setloaded] = useState(false);
  const [containerID, setcontainerID] = useState("");
  const { getCotter, apiKeyID, checkLoggedIn } = useContext(CotterContext);
  useEffect(() => {
    const randomID = Math.random().toString(36).substring(2, 15);
    setcontainerID(`cotter-form-container-${randomID}`);
  }, []);

  useEffect(() => {
    console.log(containerID);
    if (getCotter && containerID && !loaded) {
      const config: Config = {
        ApiKeyID: apiKeyID,
        Type: type,
      };
      if (styles) {
        config.Styles = styles;
      }
      if (additionalFields && additionalFields.length > 0) {
        config.AdditionalFields = additionalFields;
      }
      config.ContainerID = containerID;
      console.log(config);
      const cotter = getCotter(config);

      let cotterMethod =
        authMethod === AUTHENTICATION_METHOD.MAGIC_LINK
          ? cotter.signInWithLink()
          : cotter.signInWithOTP();

      if (onBegin) {
        cotterMethod =
          authMethod === AUTHENTICATION_METHOD.MAGIC_LINK
            ? cotter.signInWithLink(onBegin)
            : cotter.signInWithOTP(onBegin);
      }

      const cotterType =
        type === IDENTIFIER_TYPE.EMAIL
          ? cotterMethod.showEmailForm()
          : cotterMethod.showPhoneForm();

      setloaded(true);
      cotterType
        .then((resp) => {
          checkLoggedIn();
          onSuccess(resp);
        })
        .catch((err) => onError(err));
    }
  }, [
    onSuccess,
    onError,
    authMethod,
    type,
    styles,
    additionalFields,
    containerID,
    loaded,
    onBegin,
    getCotter,
    apiKeyID,
    checkLoggedIn,
  ]);
  return <div id={containerID} style={{ width: width, height: height }}></div>;
}

LoginForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default LoginForm;
