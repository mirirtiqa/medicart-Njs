"use client"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import styled from 'styled-components';

const medicines = [
    {name:'Paracetamol', price:'100',description:"Medicine for headache and pain releif"}
]

const StyledCard = styled(Card)`
  max-width: 345px;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 140px;
`;

const StyledTypography = styled(Typography)`
  font-weight: bold;
  color: #333;
`;

export default function MedicineCard() {
  return (
    <StyledCard>
      <StyledCardMedia
        image="/medicines/paracetamol.jpg"
        title="paracetamol"
      />
      <CardContent>
        <StyledTypography gutterBottom variant="h5" component="div">
          {medicines[0].name}
        </StyledTypography>
        <StyledTypography variant="body2" sx={{ color: 'text.secondary' }}>
          {medicines[0].description}
        </StyledTypography>
      </CardContent>
      <CardActions sx={{gap:12}}>
      <Typography variant="subtitle2"> {'\u20B9'} {medicines[0].price} MRP</Typography>
        <Button size="small">Add to Cart</Button>
      </CardActions>
    </StyledCard>
  );
}