import React from "react";
import {token}  from "../../../declarations/token";
import {Principal} from "@dfinity/principal"
function Transfer() {
  const[recipientId,setId] = React.useState("");
  const[amount,setAmount] =React.useState("");
  const[msgText,setMsgText] =React.useState("");
  const[isHidden,setIsHidden] =React.useState(true);
  const[isDisable,setDisable] =React.useState(false);

  async function handleClick() {
    const recipient = Principal.fromText(recipientId);
    const amt = Number(amount);
    setDisable(true);
    const text = await token.transfer(recipient,amt);
    setMsgText(text);
    setDisable(false);
    setIsHidden(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e)=>setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled = {isDisable}>
            Transfer
          </button>
        </p>
        <p hidden= {isHidden}>{msgText}</p>
      </div>
    </div>
  );
}

export default Transfer;
