"use client"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore';
import styled from 'styled-components';
import { medColRef,db } from '@/lib/firebase';



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

  const [allMedicines, setAllMedicines] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllMedicines = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(medColRef);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
  
      setAllMedicines(results); 
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMedicines();
  }, []);


  console.log(allMedicines);
  





  return (

    <>
     {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        allMedicines.map((medicine) => (
          <StyledCard key={medicine.id}>
            <StyledCardMedia
              image="/medicines/paracetamol.jpg" 
              title={medicine.name}
            />
            <CardContent>
              <StyledTypography gutterBottom variant="h5" component="div">
                {medicine.name}
              </StyledTypography>
              <StyledTypography variant="body2" sx={{ color: 'text.secondary' }}>
                {medicine.description}
              </StyledTypography>
            </CardContent>
            <CardActions sx={{ gap: 12 }}>
              <Typography variant="subtitle2">
                {'\u20B9'} {medicine.price} MRP
              </Typography>
              <Button size="small">Add to Cart</Button>
            </CardActions>
          </StyledCard>
        ))
      )}
    
    
    </>





  );
}