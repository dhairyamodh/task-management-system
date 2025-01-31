import React from "react";

interface CheckboxProps {
  onChange: () => void;
  checked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ onChange, checked }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onChange}
        className={`w-5 h-5 flex items-center justify-center rounded-full border ${
          checked
            ? "bg-green-500 border-green-500"
            : "bg-gray-100 border-gray-200"
        } focus:outline-none focus:ring-2 focus:ring-blue-400`}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Checkbox;
