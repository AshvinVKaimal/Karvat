import React from "react";
import { useEffect, useState } from "react";
import { Navigate, Route, useNavigate } from 'react-router-dom';
import "../App.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateEmail = async (email) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setEmailError("Invalid email format");
      return "Invalid email format";
    }

    try {
      const response = await axios.post(
        "/AuthenticateEmail",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.exists) {
        setEmailError("");
        return "";
      } else {
        setEmailError(response.data.message.toString());
        return response.data.message.toString();
      }
    } catch (error) {
      console.error(error);
      setEmailError("Error checking email");
      return "Error checking email";
    }
  };

  const validatePassword = async (password) => {
    try {
      const response = await axios.post(
        "/AuthenticatePassword",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.valid) {
        setPasswordError("");
        return "";
      } else {
        setPasswordError(response.data.message);
        return response.data.message;
      }
    } catch (error) {
      console.error(error);
      setPasswordError("Error checking password");
      return "Error checking password";
    }
  };

  const emailTyped = (e) => {
    const value = e.target.value;
    setEmailError("");
    validateEmail(value);
  };

  const passwordTyped = (e) => {
    const value = e.target.value;
    setPasswordError("");
    validatePassword(value);
  };

  const login = async () => {
    if (!emailError && !passwordError) {
      try {
        const confirm = await axios.post(
          "/Login",
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const response = await fetch(`/GetUser`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to fetch user data');
            }
          }).then(data => {
              if (data.loggedIn == false) {
                navigate("/login");
              }
              if (data.accountType === "vendor") {
                navigate('/vendor/dashboard');
              }
              if (data.accountType === "customer") {
                navigate("/user/account");
              }
          }).catch(error => {
            console.error('Error fetching user data:', error);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <React.StrictMode>
      <div className="bg-krvt_cream h-full min-h-screen">
        <div className="max-w-lg mx-auto">
          <h1 className="flex"></h1>
          <h1 className="flex text-krvt_brick font-karvat text-6xl mt-5 justify-center text-center">
            Login
          </h1>
          <p className="flex text-krvt_moss font-body text-xl mb-5 justify-center text-center">
            To access the true Karvat experience,<br></br>
            enter your e-mail and password to log in
          </p>
        </div>

        <div className="flex justify-center mx-auto">
          <div className="grid gap-5 p-3 w-2/3">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-krvt_brick font-body text-2xl ml-2 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`border-2 border-krvt_brick rounded-md p-2 ${
                  emailError ? "error" : ""
                }`}
                value={email}
                onBlur={emailTyped}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              {emailError && <div className="error-message">{emailError}</div>}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-krvt_brick font-body text-2xl ml-2 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`border-2 border-krvt_brick rounded-md p-2 ${
                  passwordError ? "error" : ""
                }`}
                value={password}
                onBlur={passwordTyped}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              {passwordError && (
                <div className="error-message">{passwordError}</div>
              )}
            </div>
            <button
              className="bg-krvt_brick text-krvt_cream font-karvat text-2xl rounded-md w-1/3 place-self-center p-2 mt-2"
              onClick={login}
            >
              Login
            </button>
            <p className="flex text-krvt_moss font-body text-xl mt-5 justify-center text-center">
              Don't have an account?
            </p>
            <a
              href="/signup"
              className="font-body text-3xl relative bottom-5 text-center text-krvt_brick"
            >
              Sign up!
            </a>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default Login;
