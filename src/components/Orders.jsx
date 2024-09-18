import { Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import styled from 'styled-components';
import { useCart } from '@/contexts/CardContext'
const StyledContainer = styled(Container)`
  padding: 20px;
  border: 1px solid #e0e0e0;
  max-width: 800px;
  margin-top:2rem;
`;


const StyledCard = styled(Card)`
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const OrderDate = styled(Typography)`
  font-size: 1rem;
  font-weight: 500;
`;

const TotalAmount = styled(Typography)`
  font-size: 1rem;
  font-weight: 500;
  text-align: right;
`;

const ItemDetails = styled.div`
  margin-top: 10px;
  margin-bottom:2rem;
`;

const ReviewButton = styled(Button)`
  margin-top: 10px;
  border-color: #0073e6;
  color: #0073e6;
`;

export default function Orders() {
    const { orders} = useCart();
  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Your Orders
      </Typography>
      {orders.map((order) => (
        <StyledCard key={order.id} variant="outlined">
          <CardContent>
            <OrderHeader>
              {/* <OrderDate variant="body1">
                Order Placed: {order.orderDate.toDate().toDateString()}
              </OrderDate> */}
              <TotalAmount variant="body1">
                Total: ₹{order.items.reduce((acc, item) => acc + item.Price, 0)}
              </TotalAmount>
            </OrderHeader>
            <Typography   variant="body2">Order ID: {order.id}</Typography>
            <Typography variant="body2">Shipping Address: {
                `${order.deliveryAddress.fullName}, 
                    ${order.deliveryAddress.mobileNumber},
                    ${order.deliveryAddress.flat}, 
                    ${order.deliveryAddress.area}, 
                    ${order.deliveryAddress.landmark}, 
                    ${order.deliveryAddress.city}, 
                    ${order.deliveryAddress.state}, 
                   ${order.deliveryAddress.pincode},
                    ${order.deliveryAddress.country}`
                
                }</Typography>
                {console.log(order.deliveryAddress)}

            <ItemDetails>
              {order.items.map((item, index) => (
                <div key={index} style={{margin:'1rem'}}>
                  <Typography  sx={{fontWeight:'bold'}} variant="body1">
                    {item.Name}
                  </Typography>
                  <ReviewButton sx={{color:'tertiary.main', borderColor:"tertiary.main", marginTop:'0.5rem'}} variant="outlined">Write a Product Review</ReviewButton>
                </div>
              ))}
            </ItemDetails>
          </CardContent>
        </StyledCard>
      ))}
    </StyledContainer>
  );
}


