import React from "react";
import {Principal} from "@dfinity/principal";
import {token}  from "../../../declarations/token";
 
function Balance() {
  const[inputValue,setInputValue] = React.useState("");
  const[balanceResult,setBalanceResult] = React.useState("");
  const[tokenSymbol,setTokenSymbol] = React.useState("");
  const[isHidden,setIsHidden] = React.useState(true);

  async function handleClick() {
    // console.log(inputValue);
    const principal = Principal.fromText(inputValue)
    const balance = await token.balanceOf(principal);
    setBalanceResult(balance.toLocaleString());
    setTokenSymbol(await token.getSymbol());
    setIsHidden(false);
    // console.log(tokenSymbol);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          onChange = {(e) => setInputValue(e.target.value)}
          onClick = {handleClick}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden = {isHidden}>This account has a balance of {balanceResult} {tokenSymbol}.</p>
    </div>
  );
}

export default Balance;
