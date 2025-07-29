import React from 'react';

interface ButtonProps {
  buttonLabel: string;
  buttonBackgroundColor: string;
  onClick?: () => void; // Optional click handler
}

const Button: React.FC<ButtonProps> = ({ buttonLabel, buttonBackgroundColor, onClick }) => {
  const bgColorClass = `bg-${buttonBackgroundColor}-500 hover:bg-${buttonBackgroundColor}-600`;
  const commonStyles = "text-white font-semibold py-2 px-4 rounded-md transition duration-300 shadow-md";

  return (
    <button
      className={`${bgColorClass} ${commonStyles}`}
      onClick={onClick}
    >
      {buttonLabel}
    </button>
  );
};

export default Button;