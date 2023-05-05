/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import "./OtpVerificationPopup.css";

const PhoneVerificationPopup = ({ handleClose }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    //handling focus
    inputRefs.current[0].focus();
  }, []);

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    if (isNaN(value) || value === " ") return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setIsError(false);

    if (value !== "") {
      if (index === otp.length - 1) return;

      inputRefs.current[index + 1].focus();
    } else {
      if (index === 0) return;
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData.getData("text/plain");

    //regex to paste only the numbers
    const numbersOnly = clipboardData.match(/\d/g);

    // Check if any numbers exists
    if (numbersOnly) {
      const newOtp = [...otp];
      numbersOnly.forEach((data, index) => {
        newOtp[index] = data;
        inputRefs.current[index + 1].focus();
      });
      setOtp(newOtp);
      setIsError(false);
    } else {
      setIsError(true);
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace key
    if (e.keyCode === 8 && otp[index] === "") {
      if (index === 0) return;
      inputRefs.current[index - 1].focus();
    }
    // Arrow left
    if (e.keyCode === 37 && index !== 0) {
      inputRefs.current[index - 1].focus();
    }
    // Arrow right
    if (e.keyCode === 39 && index !== otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
    // Esc key
    if (e.keyCode === 27) {
      handleClose();
    }
    // Enter
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");

    // Check otp for 6 values
    if (otpValue.length !== 6 || isNaN(otpValue)) {
      setIsError(true);
    } else {
      // send OTP for verification in this case console
      console.log("OTP Verified!");

      //close modal
      handleClose();
    }
  };

  return (
    <div className="phone-verification-popup">
      <div className="popup-content">
        <button type="button" className="closeBtn" onClick={handleClose}>
          X
        </button>
        <h3>Phone Verification</h3>
        <p>Enter the 6-digit OTP sent to your phone number</p>
        <div className="otp-input-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="tel"
              maxLength="1"
              value={digit}
              className={isError ? "error" : ""}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              ref={(ref) => (inputRefs.current[index] = ref)}
            />
          ))}
        </div>
        {isError && (
          <p className="error-message">Please enter a valid 6-digit OTP</p>
        )}
        <button className="submit-button" onClick={handleSubmit}>
          Verify
        </button>
      </div>
    </div>
  );
};

export default PhoneVerificationPopup;
