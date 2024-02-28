import { useState, useRef, useContext } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Context from "./Context";
import MainPage from "./pages/mainpage/MainPage";
import Layout from "./pages/layout/Layout";
function App() {
  const { user, setUser,authenticate } = useContext(Context);
 
  return (
    <>
      <div>
        <input
          type="text"
          className="username"
          ref={usernameRef}
          placeholder="Username"
        />
        <input
          type="password"
          className="password"
          ref={passwordRef}
          placeholder="Password"
        />
        <input
          type="email"
          className="email"
          ref={emailRef}
          placeholder="Email"
        />
                <input
          type="verifyEmail"
          className="verifyEmail"
          ref={verifyEmailRef}
          placeholder="Verify Email"
        />
        
        <button onClick={SignInClicked}>Sign In</button>
        <button onClick={SignUpClicked}>Sign Up</button>
        <button onClick={AuthenticateClicked}>Authenticate</button>
        <button onClick={EmailVerifyClicked}>Verify Email</button>
      </div>
      <div>
      <h1>{JSON.stringify(message)}</h1>
{user && <p>Username: {(user.Username)} Id: {(user.id)}</p>}

</div>

    </>
  );
}

export default App;
