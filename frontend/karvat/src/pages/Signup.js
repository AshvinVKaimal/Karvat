import React from "react";
import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import PhoneInput from 'react-phone-input-2';
import { useHistory } from 'react-router-dom';
import 'react-phone-input-2/lib/style.css';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  const [emailError, setEmailError] = useState("");
  const [accountTypeError, setAccountTypeError] = useState("");
  const [PhoneNumberError, setPhoneNumberError] = useState("");
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
      length: false,
      number: false,
      specialChar: false,
      uppercase: false,
      lowercase: false
  });
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [invitationCodeError, setInvitationCodeError] = useState("");
  const [nameError, setNameError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [correctOTP, setCorrectOTP] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValid, setOtpValid] = useState(false);

  const verifyOTP = async () => {
    console.log(otp);
    console.log(correctOTP);
    if (otp == correctOTP) {
      setOtpValid(true);
      signup();
    } else {
      setSignUpError("incorrect otp")
    }
  };

  const validateName = async (name) => {
    const isEmpty = /^$/.test(name);
    if (isEmpty) {
      setNameError("Please enter name");
      return "Please enter name";
    } else {
      setNameError("");
      return "";
    }
  }

  const validatePhoneNumber = async (value, country, e) => {
    const isEmpty = /^.{0,5}$/.test(phoneNumber);
    if (isEmpty) {
      setPhoneNumberError("Please enter phone number");
      return "Please enter phone number";
    } else {
      setPhoneNumberError("");
      return "";
    }
  }

  const validateEmail = async (email) => {
    const isEmpty = /^$/.test(email);
    if (isEmpty) {
      setEmailError("Please enter email");
      return "Please enter email";
    }

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
        setEmailError(response.data.message);
        return response.data.message;
      } else if (response.data.message == "Please enter email") {
          setEmailError(response.data.message);
          return response.data.message;
      } else {
          setEmailError('');
          return '';
      }
    } catch (error) {
      console.error(error);
      setEmailError("Error checking email");
      return "Error checking email";
    }
  };

  const validatePassword = (password) => {

    const lengthRegex = /.{8,}/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    const isValidLength = lengthRegex.test(password);
    const containsNumber = numberRegex.test(password);
    const containsSpecialChar = specialCharRegex.test(password);
    const containsUppercase = uppercaseRegex.test(password);
    const containsLowercase = lowercaseRegex.test(password);

    setPasswordRequirements({
        length: isValidLength,
        number: containsNumber,
        specialChar: containsSpecialChar,
        uppercase: containsUppercase,
        lowercase: containsLowercase
    });

    const isPasswordValid = isValidLength && containsNumber && containsSpecialChar && containsUppercase && containsLowercase;
    if (isPasswordValid) {
        setValidPassword(true);
    }
   
  };

  const emailTyped = (e) => {
    const value = e.target.value;
    setEmailError("");
    validateEmail(value);
  };

  const passwordTyped = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const accountTypeCheck = (e) => {
    const value = e.target.value;
    setAccountType(value);
    setAccountTypeError(''); 
    if (value == '') {
        setAccountTypeError('Please select your account type'); 
    }

  };

  const repeatPasswordTyped = (e) => {
    const value = e.target.value;
    setRepeatPassword(value);
    if (value == password) {
        setRepeatPasswordError('');
    } else {
        setRepeatPasswordError('Password does not match');
    }
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    validatePhoneNumber();
    if (PhoneNumberError) {
      return PhoneNumberError;
    }
    try {
      const response = await axios.post(
        "/SendOTP",
        { name, phoneNumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );      
      if (response.data.success) {
        setOtpSent(true);
        setCorrectOTP(response.data.otp);
      } else {
        setPhoneNumberError("unable to send otp");
      }
    } catch (error) {
      console.error('Error sending OTP:');
    }
  };

  const setOTPval = (e) => {
    const {value} = e.target;
    setOTP(value);
    console.log(otp);
  }

  const setInvitationCodeVal = (e) => {
    const {value} = e.target;
    setInvitationCode(value);
  }

  const validateInvitationCode = async (e) => {
    const {value} = e.target;
    setInvitationCode(value);
    const isEmpty = /^$/.test(value);
    if (isEmpty) {
      setInvitationCodeError("Please enter invitation code");
      return "Please enter invitation code";
    }
    
    try {
      const response = await axios.post(
        "/AuthenticateInvitationCode",
        { value },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.exists) {
        setInvitationCodeError("");
        return response.data.message;
      } else {
        setInvitationCodeError(response.data.message);
          return response.data.message;
      }
    } catch (error) {
      console.error(error);
      setInvitationCodeError("Error checking invitation code");
      return "Error checking invitation code";
    }

  }

  const signup = async () => {
    validateEmail(email);
    validatePassword(password);
    validatePhoneNumber(phoneNumber);
    validateName(name);
    console.log(nameError, otpValid, emailError, validPassword, accountType, invitationCodeError)
    if (!nameError && otpValid && !emailError && validPassword && (!accountType === "vendor" || !invitationCodeError)) {
      try {
        const response = await axios.post(
          "/Signup",
          { email, name, password, accountType, phoneNumber, invitationCode },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        window.location.reload();
      } catch (error) {
        setSignUpError("unable to sign up");
      }
    } else {
      setSignUpError("invalid details");
    }
  };

  return (
    <React.StrictMode>
      <div className="bg-krvt_cream h-full min-h-screen">
        <div className="max-w-lg mx-auto">
          <h1 className="flex"></h1>
          <h1 className="flex text-krvt_brick font-karvat text-6xl mt-5 justify-center text-center">
            Sign Up
          </h1>
          <p className="flex text-krvt_moss font-body text-xl mb-5 justify-center text-center">
            To access the true Karvat experience,<br></br>
            enter your e-mail and password to sign up.
          </p>
        </div>

        <div className="flex justify-center mx-auto">
          <div className="grid gap-5 p-3 w-2/3">
            <div className="flex flex-col">
              <label 
                htmlFor="accountType" 
                className="text-krvt_brick font-body text-2xl ml-2 mb-1"
              >
                Account Type
              </label>
              <select 
                id="accountType" 
                name="accountType" 
                className={`border-2 border-krvt_brick rounded-md p-2  ${accountTypeError ? 'error' : ''}`} 
                onChange={accountTypeCheck}
              >
                <option 
                  value=""
                >
                  Select Account Type
                </option>
                <option 
                  value="customer"
                >
                  Customer
                </option>
                <option 
                  value="vendor"
                >
                  Vendor
                </option>
              </select>
              {accountTypeError && <div className="error-message">{accountTypeError}</div>}
            </div>
            {accountType === "vendor" && (
            <div className="flex flex-col">
              <label
                htmlFor="invitation-code"
                className="text-krvt_brick font-body text-2xl ml-2 mb-1"
              >
                Invitation Code
              </label>
              <input
                type="text"
                id="invitation-code"
                name="invitation-code"
                className={`border-2 border-krvt_brick rounded-md p-2 ${
                  invitationCodeError ? "error" : ""
                }`}
                value={invitationCode}
                onChange={setInvitationCodeVal}
                onBlur={validateInvitationCode}
              />
              {invitationCodeError && <div className="error-message">{invitationCodeError}</div>}
            </div>
          )}
            <div className="flex flex-col">
              <label
                htmlFor="phone-number"
                className="text-krvt_brick font-body text-2xl ml-2 mb-1"
              >
                Phone Number
              </label>
              <PhoneInput
                className = "border-2 border-krvt_brick rounded-md"
                country={'in'}
                value={phoneNumber}
                onChange={(value) => setPhoneNumber(value)}
                onBlur={validatePhoneNumber}
                // inputClass="border-2 border-krvt_brick rounded-md p-2"
                // style={{
                //   border: '2px solid #krvt_brick',
                //   borderRadius: '0.25rem',
                //   padding: '0.5rem',
                // }}
                // inputStyle={{
                //   border: '2px solid var(--krvt_brick)',
                //   borderRadius: '0.375rem', // Tailwind's rounded-md
                //   padding: '0.5rem', // Tailwind's p-2
                // }}
              />
            <a href="#" onClick={sendOTP}>
              Get OTP
            </a>
            {PhoneNumberError && <div className="error-message">{PhoneNumberError}</div>}
            </div>
           
            {!PhoneNumberError && otpSent && (
              <div className="flex flex-col">
              <label
                htmlFor="otp"
                className="text-krvt_brick font-body text-2xl ml-2 mb-1"
              >
                OTP
              </label>
              <input
                type="otp"
                id="otp"
                name="otp"
                className="border-2 border-krvt_brick rounded-md p-2"
                value={otp}
                // onBlur={emailTyped}
                onChange={setOTPval}
              ></input>
              </div>
            )}

            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-krvt_brick font-body text-2xl ml-2 mb-1"
              >
                Name
              </label>
              <input
                type="name"
                id="name"
                name="name"
                className={`border-2 border-krvt_brick rounded-md p-2 ${
                  nameError ? "error" : ""
                }`}
                value={name}
                onBlur={(e) => validateName(e.target.value)}
                onChange={(e) => setName(e.target.value)}
              ></input>
              {nameError && <div className="error-message">{nameError}</div>}
            </div>

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
                value={password} 
                onChange={passwordTyped}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`border-2 border-krvt_brick rounded-md p-2`}
                value={password}
                onChange={passwordTyped}
              ></input>
              <div className="">
                <p className={`${passwordRequirements.length ? 'valid-password' : 'invalid-password'}`}>
                  At least 8 characters
                </p>
                <p className={`${passwordRequirements.number ? 'valid-password' : 'invalid-password'}`}>
                  At least one number
                </p>
                <p className={`${passwordRequirements.specialChar ? 'valid-password' : 'invalid-password'}`}>
                  At least one special character
                </p>
                <p className={`${passwordRequirements.uppercase ? 'valid-password' : 'invalid-password'}`}>
                  At least one uppercase letter
                </p>
                <p className={`${passwordRequirements.lowercase ? 'valid-password' : 'invalid-password'}`}>
                  At least one lowercase letter
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <label 
                htmlFor="repeat-password" 
                className="text-krvt_brick font-body text-2xl ml-2 mb-1"
              >
                Repeat Password
              </label>
              <input 
                type="password" 
                id="repeat-password" 
                name="repeat-password" 
                className={`border-2 border-krvt_brick rounded-md p-2`} 
                value={repeatPassword} 
                onChange={repeatPasswordTyped}
              ></input>
              {repeatPasswordError && <div className="error-message">{repeatPasswordError}</div>}
            </div>

            <button
              className="bg-krvt_brick text-krvt_cream font-karvat text-2xl rounded-md w-1/3 place-self-center p-2 mt-2"
              onClick={verifyOTP}
            >
              Sign Up
            </button>
            {signUpError && <p className="error-message justify-center text-center">{signUpError}</p>}
            <p className="flex text-krvt_moss font-body text-xl mt-5 justify-center text-center">
              Have an account?
            </p>
            <a
              href="/login"
              className="font-body text-3xl relative bottom-5 text-center text-krvt_brick"
            >
              Login!
            </a>
          </div>
        </div>
      </div>
    </React.StrictMode>
  );
};

export default Signup;
