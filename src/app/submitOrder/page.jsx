"use client"
import { Container, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import styled from 'styled-components';
import { useRouter } from 'next/navigation' 

const ReviewContainer = styled(Container)`
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

export default function submitOrder(){
    const router = useRouter();
    return(
        <ReviewContainer maxWidth="md">
            <Typography variant="h4" gutterBottom>
        Order successfully placed
      </Typography>
      <Button
           sx={{
            backgroundColor: 'tertiary.main',
            color:"white"
          }}
            variant="contained"
            onClick={()=>{
                router.push("/")
            }}
          >
            Go to Home
          </Button>
        </ReviewContainer>
    )
}