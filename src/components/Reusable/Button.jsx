"use client";
const Button = ({ children, textColor='text-black', bgColor = 'bg-transparent', hoverBGColor = 'hover:bg-transparent', hoverColor = 'hover:text-green', padding='p-0', ...props }) => {
  return (
    <button
      className={`${bgColor} ${hoverColor} ${textColor} ${hoverBGColor} ${padding}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;