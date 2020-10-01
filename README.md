# Cotter's React Starter App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), with additional templates:

- Pre-built Login Page Templates
- Authentication State Management
- User Management
- Step-by-step guide

<img width="1398" alt="Cotter's React Starter Template" src="https://user-images.githubusercontent.com/20483939/94357815-eb4ce180-0050-11eb-8467-34388b43deb6.png">

---
## Getting started

**Run the project**
To run the project:
```bash
npm install
# or
yarn
```
then run
```bash
npm start
# or
yarn start
```
and open `http://localhost:3000`

**Copy your Cotter API KEY ID**
Go to [Cotter's Dashboard](https://dev.cotter.app), create a project, and copy your API KEY ID.
Then paste your API Key ID to [`src/apiKeys.js`](https://github.com/cotter-code/react-starter-app/blob/master/src/apiKeys.js).

## Using `CotterProvider` and the `LoginForm`
As you can see, we've already included [`CotterProvider`](https://github.com/cotter-code/react-starter-app/blob/master/src/pages/_app/index.js#L13) for authentication state management. It's already included in `pages/_app` to wrap over your root component.
- [Adding the `LoginForm`](#adding-the-loginform)
- [Using the `CotterProvider`](#using-the-cotterprovider)

### Adding the `LoginForm`
The `LoginForm` component automatically sends a verification email or SMS to the entered email or phone number, and respond with the results.

To use the `LoginForm` component, you can import `LoginForm` and do the following:
```javascript
<LoginForm
  type="EMAIL"                    // - EMAIL or PHONE
  authMethod="MAGIC_LINK"         // - OTP or MAGIC_LINK
  onBegin={onSignupBegin}         // - A function that runs before verification email/SMS is sent
  onSuccess={onSignupSuccess}     // - A function that runs after the login/signup is successful
  onError={onSignupError}         // - A function that runs if the login/signup encountered an error
  width={340}                     // - Width & height of the form
  height={300}                    //   Recommended at least 300x300
  additionalFields={[             // - The form includes 1 field for email/phone. Use this to add
    {                             //   more fields.
      name: "name",
      label: "Full Name",
      placeholder: "Enter your full name",
    },
  ]}
  styles={loginFormStyles}        // - You can style the form on Cotter's Dashboard or pass in CSS here.
/>
```

**`onBegin` function:**

The `onBegin` function receives the user entered fields as a parameter. 
- To stop submission and display an error, **return a string with the error message**.
- To continue submission with no error, **return null**.
[Learn more about `onBegin` function](https://docs.cotter.app/sdk-reference/web/web-sdk-verify-email-phone/checking-the-email-or-phone-before-sending-a-verification-code)

For example:
```javascript
const myOnBeginFunction = (payload) => {
  if (payload.identifier === "myemail@gmail.com") {
    // If there's an error, return a string with the error message
    return "Phone Number is not allowed";
  }
  // If there's no error, return null
  return null;
}

// Payload object looks like this
var payload = {
  identifier: "myemail@gmail.com",
  identifier_type: "PHONE",
  device_type: "BROWSER",
  device_name: "Chrome ...",
  client_json: { // This is available if you set up AdditionalFields
    "name": "Hello World",
    "address": "Street Address"
  }
};
```


**`onSuccess` function:**

When the user successfully login or sign up, the `onSuccess` function will receive a response from Cotter that includes the user-entered fields an a JWT token to validate the user successfully verified their email or phone number. 
[Learn more about `onSuccess` function](https://docs.cotter.app/sdk-reference/web/web-sdk-verify-email-phone#step-3-sending-the-payload-to-your-backend-server)

For example:
```javascript
const onSuccessFunc = (payload) => {
  // Send data to Server
  axios
    .post("https://slug.brev.dev/login", payload)
    .then((resp) => console.log("Response From Server", resp))
    .catch((err) => console.log(err));
}

// Payload object looks like this:
var payload {
    "email": "myemail@gmail.com", // User's email (or phone number),
    "name": "Hello World",
    "address": "Street Address",
    "oauth_token": {
        "access_token": "eyJhbGciOiJFUzI1NiIsImt...", // Access Token to validate
        "id_token": "eyJhbGciOiJFUzI1Ni...",
        "refresh_token": "27805:CNf76faa8trMhjXM...",
        "expires_in": 3600,
        "token_type": "Bearer",
        "auth_method": "OTP"
    },
    "user": {
        "ID": "abcdefgh-abcd-abcd-abcd-af6f81fb5432", // Cotter User ID
        "issuer": "<YOUR_API_KEY_ID>",
        "identifier": "myemail@gmail.com"
    }
}
```


**`onError` function:**

When there's an error, the `onError` function will be invoked. The error returned may differ based on the error, you should display an error message when this is invoked, and try it in `console.log` to see the error responses.

**`additionalFields`:**
The default form includes 1 field which is the email input or phone number input. If you want to collect more information, use this to add more fields.
For example:
```javascript
const additionalFields = [
          {
            label: "Full Name",
            name: "name",
            placeholder: "Enter your full name"
          },
          {
            label: "Address",
            name: "address",
            placeholder: "Enter your address"
          },
          {
            label: "Prefilled Info",
            name: "prefilled",
            type: "hidden",     // availabe types are the same as HTML input type.
            initial_value: "autofill value"
          }
        ]
```


**`styles`:**

There are 2 ways to style your login form.
- Customize the form from the [Cotter Dashboard](https://dev.cotter.app)
- Pass in a styles object

To pass in a styles object, you can find each component's class name using inspect element, then add the style for each class name like the following:
```javascript
const styles = {
    input_label: {
      fontFamily: "Roboto",
      fontSize: 15,
      color: "red",
      fontWeight: 700,
    },
    input_text_container_default: {
      backgroundColor: "#fce883",
      padding: "20px 60px",
    },
    input_text: {
      backgroundColor: "#fce883",
      fontFamily: "Roboto",
      fontSize: 20,
    },
    button_container: {
      borderRadius: 0,
    },
    button_text: {
      color: "aqua",
    },
  }
```

### Using the `CotterProvider`
The `CotterProvider` provides you with useful authentication state and the current user information. To use it:
```javascript
const { isLoading, isLoggedIn, user, logout, getCotter, apiKeyID, checkLoggedIn } = useContext(CotterContext);
```

- **`isLoading`** (bool): tells you if the CotterProvider is loading the necessary data
- **`isLoggedIn`** (bool): tells you if the user is logged-in or not
- **`user`** (object): gives you the user object of the currently logged-in user
```javascript
const user = {
    "ID": "abcdefgh-abcd-abcd-abcd-67ebae3cdfcf",
    "issuer": "abcdefgh-abcd-abcd-abcd-5cc8b69051e8",
    "client_user_id": "abcdefgh-abcd-abcd-abcd-67ebae3cdfcf",
    "enrolled": [
        "WEBAUTHN"
    ],
    "identifier": "putri@cotter.app"
}
```
- **`logout`** (async function): a function to logout the user
```javascript
<div onClick={logout}>Log Out</div>
```
- **`getCotter`** (function): a function to get the Cotter object. [Check out the docs on what you can do with the Cotter object.](https://docs.cotter.app/sdk-reference/web)
- **`apiKeyID`** (string): your API KEY ID that you passed-in to the `CotterProvider`
- **`checkLoggedIn`** (async function): a function to force the `CotterProvider` to check if the user's logged-in



---
# Create React App

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# react-starter-app
