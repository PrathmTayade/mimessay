import { useState } from "react";
import "./App.css";
import OtpVerificationPopup from "./OtpVerificationPopup";

function App() {
  const [showVerficationModal, setShowVerificationModal] = useState(false);

  const handleClose = () => {
    setShowVerificationModal(!showVerficationModal);
  };
  return (
    <main className="App">
      <h2>Assignment submisson for MiM-Essay: Prathamesh Tayade</h2>
      <button className="submit-button" onClick={handleClose}>
        Enter OTP
      </button>
      <div>
        {showVerficationModal && (
          <OtpVerificationPopup handleClose={handleClose} />
        )}
      </div>
    </main>
  );
}

export default App;
