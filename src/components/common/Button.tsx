import React from 'react';

interface ButtonProps {
  buttonLabel: string;
  buttonBackgroundColor: 'red' | 'blue' | 'green' | 'yellow' | 'gray';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ buttonLabel, buttonBackgroundColor, onClick }) => {
  let bgColorClass: string;
  switch (buttonBackgroundColor) {
    case 'red':
      bgColorClass = 'bg-red-500 hover:bg-red-600';
      break;
    case 'blue':
      bgColorClass = 'bg-blue-500 hover:bg-blue-600';
      break;
    case 'green':
      bgColorClass = 'bg-green-500 hover:bg-green-600';
      break;
    case 'yellow':
      bgColorClass = 'bg-yellow-500 hover:bg-yellow-600';
      break;
    case 'gray':
      bgColorClass = 'bg-gray-500 hover:bg-gray-600';
      break;
    default:
      bgColorClass = 'bg-gray-500 hover:bg-gray-600';
  }

  return (
    <button
      onClick={onClick}
      className={`${bgColorClass} text-white font-semibold py-2 px-4 rounded-lg text-md transition duration-300 shadow-md`}
    >
      {buttonLabel}
    </button>
  );
};

export default Button;