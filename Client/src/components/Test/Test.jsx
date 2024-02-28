import Context from "../../Context";

import { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
function Test() {
    const { getRequest, postRequest, setUser, user } = useContext(Context);
    useEffect(() => {
        getThisUser();
    }, []);

    const getThisUser = async () => {
        try{
            const response = await getRequest("/users/getThisUser");
            console.log(response.data);
            setUser(response.data.user)
        } catch(error){
            console.log(error);
        }
    }
    const [message, setMessage] = useState();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const verifyEmailRef = useRef(null);
    const SignInClicked = async () => {
        const response = await signin();
        console.log(response);
        setUser(response.message);
    };
    const EmailVerifyClicked = async () => {

    }
    const AuthenticateClicked = async () => {
        try {
            console.log(user);
            const response = await authenticate(user);
            console.log(response);
            setMessage(response.message);
        } catch (e) {
            console.log(e);
        }
    }
    const signin = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_CALL}/users/signin`,
                {
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                },
                {
                    withCredentials: true,
                }
            );
            setMessage(response.data.message);
            return response.data;
        } catch (error) {
            console.error("Error during sign-in:", error);
            setMessage(error.response.data.message);
            return { error: "An error occurred during sign-in." };
        }
    };
    const SignUpClicked = async () => {
        const response = await signup();
    };
    const signup = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_APP_CALL}/users/signup`,
                {
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                    email: emailRef.current.value,
                },
                {
                    withCredentials: true,
                }
            );
            setUser(response.data.user);
            console.log(response);
            setMessage(response.data.message);
            return response.data;
        } catch (error) {
            console.error("Error during sign-up:", error);
            setMessage(error.response.data.message);
            return { error: "An error occurred during sign-up." };
        }
    };

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
                {/* {user && <p>Username: {(user.Username)} Id: {(user.id)}</p>} */}

            </div>
            <div>
                {user.password}
            </div>
        </>
    );
}

export default Test;