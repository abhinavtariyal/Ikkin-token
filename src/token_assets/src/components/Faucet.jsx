import React from "react";
import {token,canisterId,createActor}  from "../../../declarations/token";
import { AuthClient } from '@dfinity/auth-client';

function Faucet() {

  const [isDisable,setDisable]= React.useState(false);
  const[buttonText,setButtonText] = React.useState("Give-Me");
  async function handleClick(event) {
    setDisable(true);
     const text = await token.payOut();
     setButtonText(text);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free IKKIN tokens here! Claim 1,000 IKKIN coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" 
        onClick={handleClick}
        disabled = {isDisable}>
        {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
