'use client';
import { useCart } from '@/contexts/CardContext'
import { Button, Typography, IconButton,Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from 'styled-components';
import { useRouter } from 'next/navigation' 
const CartContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top:3rem;
  box-shadow: 1px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CartPage = () => {
  const router = useRouter(); 
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

 
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.Price * item.quantity,
    0
  );

   function handleCheckout(){
    router.push('\checkout')

  }

  return (
    <CartContainer>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              <ItemDetails>
                <Typography variant="h6">{item.Name}</Typography>
                <Typography variant="body2">{item.Description}</Typography>
                <Typography variant="subtitle1">
                  {'\u20B9'} {item.Price} x {item.quantity}
                </Typography>
              </ItemDetails>
              <QuantityControls>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  style={{ width: '80px', border:'1px solid black' }}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                />
                <IconButton onClick={() => removeFromCart(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </QuantityControls>
            </CartItem>
          ))}
          <Typography variant="h6">Total :  {'\u20B9'} {totalPrice.toFixed(2)}</Typography>

          <Box sx={{display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          marginTop:'1rem'
          }}>
          <Button variant="contained"
            sx={{
              backgroundColor: '#01D6A3',
              '&:hover': { bgcolor: 'white', color: '#01D6A3' }
            }}
          onClick={clearCart}>
            Clear Cart
          </Button>

          <Button variant="contained"
            sx={{
              backgroundColor: '#01D6A3',
              '&:hover': { bgcolor: 'white', color: '#01D6A3' }
            }}
          onClick={handleCheckout}>
            Checkout
          </Button>
          </Box>
        </>
      )}
    </CartContainer>
  );
};

export default CartPage;
