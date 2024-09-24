import { Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import styled from 'styled-components';
import { useCart } from '@/contexts/CardContext'

// Styled Components for consistent styling
const ReviewContainer = styled(Container)`
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  gap:2rem;
`;

const ItemCard = styled(Card)`
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top:1rem;
`;

const ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalAmount = styled(Typography)`
  font-weight: 600;
  margin-top: 15px;
  font-size: 1.2rem;
`;

const CheckoutButton = styled(Button)`
  background-color: #00c08b;
  color: white;
  margin-top: 20px;
  &:hover {
    background-color: #00a67d;
  }
`;

export default function ReviewItems({ address,paymentMethod }) {

    const { cartItems} = useCart();


 
  const totalAmount = cartItems.reduce((acc, item) => acc + item.Price * item.quantity, 0);

  return (
    <ReviewContainer maxWidth="md">
      <Typography variant="body1">
        <strong>Delivery Address</strong>
        <div> {`${address.fullName}, 
                    ${address.mobileNumber},
                    ${address.flat}, 
                    ${address.area}, 
                    ${address.landmark}, 
                    ${address.city}, 
                    ${address.state}, 
                   ${address.pincode},
                    ${address.country}`}
        </div>
      </Typography>
      <Typography variant="body1">
        <strong>Payment Method</strong> 
        <div>{paymentMethod}</div>
      </Typography>

      {cartItems.map((item, index) => (
        <ItemCard key={index}>
          <CardContent>
            <ItemDetails>
              <Typography variant="body1">{item.Name}</Typography>
              <Typography variant="body1">₹{item.Price} x {item.quantity}</Typography>
            </ItemDetails>
          </CardContent>
        </ItemCard>
      ))}

      <TotalAmount variant="h6">Total: ₹{totalAmount.toFixed(2)}</TotalAmount>

      <Grid container justifyContent="space-between" style={{ marginTop: '20px' }}>
        <Button variant="outlined" color="error">
          Cancel Order
        </Button>
        {/* <CheckoutButton variant="contained">Proceed to Checkout</CheckoutButton> */}
      </Grid>
    </ReviewContainer>
  );
}




