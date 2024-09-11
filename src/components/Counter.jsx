"use client";
import React, { useState } from "react";
import styled from 'styled-components';
const StyledButton = styled.button`
  border-right: 1px solid ${(props) => props.borderColor || "#01D6A3"};
  padding: 2px 8px;
  font-size: ${(props) => props.fontSize || '16px'};
  color: #01D6A3;
  border-radius: 1px;
  cursor: pointer;
  &:hover {
    background-color:#01D6A3;
    color:white;
  }
`;
const Counter = ({ item, updateQuantity,removeFromCart }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10);

    if (value >= 1) {
      setQuantity(value);
    } else if (value == 0) {
      setQuantity(value);
    }
  };
  function handlePlus() {
    setQuantity((prev) => {
      const newQty = prev + 1;
      updateQuantity(item.id, newQty)
      return newQty
    });
  }
  function handleMinus() {
    setQuantity((prev) => {
      const newQty = prev - 1;
      if (newQty < 0) {
        return prev;
      } else if (newQty == 0) {
        removeFromCart(item.id)
      } else{
        updateQuantity(item.id, newQty)
        return newQty
      }
    });
  }

  return (
   
    <div style={{border: "1px solid #01D6A3"}}>
      <StyledButton onClick={handlePlus}>+</StyledButton>
      <input
        value={quantity}
        min="0"
        style={{ width: "50px", textAlign: "center"}}
        onChange={handleChange}
      />
      <StyledButton style={{borderLeft: "1px solid #01D6A3",borderRight:"0"}} onClick={handleMinus}>-</StyledButton>
      </div>
   
  );
};

export default Counter;
