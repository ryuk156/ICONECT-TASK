import React from "react";
import { TextInputType } from "../../types";
import "./index.css";

const TextInput: React.FC<TextInputType> = ({ value, onChange }) => {
  return (
    <>
      <input
        className="inputText"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter custodian"
      />
    </>
  );
};

export default TextInput;
