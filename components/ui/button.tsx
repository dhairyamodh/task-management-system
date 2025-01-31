import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  className,
  disabled,
  ...props
}) => {
  let buttonClass = "";

  switch (variant) {
    case "outline":
      buttonClass =
        "text-black-600 border border-black-600 hover:!bg-black hover:!text-white";
      break;
    case "primary":
      buttonClass = "text-white bg-black hover:!bg-black shadow-md";
      break;
    default:
      buttonClass = "text-black bg-black-600 hover:bg-black-700";
      break;
  }

  const disabledClass = disabled ? "opacity-50 !cursor-not-allowed" : "";

  return (
    <button
      className={`px-3 py-1.5 text-sm rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-black-600 hover:bg-gray-200 transition-all ${buttonClass} ${className} ${disabledClass}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
