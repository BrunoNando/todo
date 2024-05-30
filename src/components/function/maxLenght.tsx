import React, { useState } from "react";

interface MaxLengthInputProps {
    maxLength: number;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export const MaxLengthInput: React.FC<MaxLengthInputProps> = ({ maxLength, setText }) => {
  const [text, setTextValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    if (inputText.length <= maxLength) {
      setText(inputText);
      setTextValue(inputText);
    }

    // return <input type="text" onChange={handleChange} />;
  };

  const remainingCharacters = maxLength - text.length;

  return (
    <div>
      <textarea
        value={text}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder="Digite aqui sua edição!"
        rows={2}
        cols={15}
        className="p-2 rounded-md resize-none text-md shadow-gray-400 shadow-inner hover:shadow-md"
      />
      <div className="text-gray-400 text-sm">
        Remaining characters: {remainingCharacters}/{maxLength}
      </div>
    </div>
  );
};

// export default MaxLengthInput;