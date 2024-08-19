"use client";
const Button = ({ children, textColor='text-black', bgColor = 'bg-transparent', hoverColor = 'hover:text-green', ...props }) => {
  return (
    <button
      className={`${bgColor} ${hoverColor} ${textColor}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;