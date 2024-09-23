"use client"
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Box, Typography, CircularProgress,Button, Grid } from '@mui/material';
import { useRouter } from 'next/navigation' 
import Image from 'next/image';
import Counter from '@/components/Counter';
import { useCart } from '@/contexts/CardContext';

const MedicineDetail = ({ params }) => {
  const router = useRouter();
  const id = params.id; 
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCounter, setShowCounter] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, clearCart,addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const fetchMedicine = async () => {
        const docRef = doc(db, 'medicines', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMedicine(docSnap.data());
        } else {
          console.log('No such document!');
        }
        setLoading(false);
      };

      fetchMedicine();
    }
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!medicine) {
    return <Typography>No medicine details available.</Typography>;
  }

   

  const handleBuyNow = () => {
    console.log(`Proceed to buy ${medicine.Name}`);
    router.push('/cart');
  };



  return (
    <Box padding={10}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{padding:'0'}}>
            <Image
              src={'/medicines/paracetamol.jpg'} 
              alt={medicine.Name}
              width={500}
              height={500}
              style={{ borderRadius: '8px',padding:'0' }}
            />
          </Box>
        </Grid>

       
        <Grid item xs={12} sm={6} md={8}>
          <Typography variant="h4" gutterBottom>
            {medicine.Name}
          </Typography>

          <Typography variant="h6" color="text.secondary" gutterBottom>
          {'\u20B9'}{medicine.Price}
          </Typography>
        

          <Typography variant="body1" paragraph sx={{py:'0',marginBottom:'0', fontWeight:'500'}}>
            Description:
          </Typography>
          <Typography variant="body1" paragraph sx={{marginTop:'1',padding:'0'}}>
            {medicine.Description}
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Category: {medicine.Category}
          </Typography>

          
          <Box mt={2} mb={1}>
            <Button
              onClick={() => {
                addToCart(medicine);
                if (!showCounter) {
                  setShowCounter(true); 
                }
                console.log("item added")
              }}
              sx={{ marginRight: 2,backgroundColor: 'tertiary.main',
                color: 'white', }}
            >
              Add to Cart
            </Button>
            <Button
              onClick={handleBuyNow}
              sx={{backgroundColor: 'tertiary.main',
                color: 'white',}}
            >
              Buy Now
            </Button>
          </Box>
          {showCounter && (

(() => {
  const i = cartItems.find((item) => item.id === medicine.id);
  
  
  return i ? (
    <Counter 
      item={i}
      updateQuantity={updateQuantity}
      removeFromCart={removeFromCart} 
    />
  ) : null; 
})()
)}

        </Grid>
      </Grid>
    </Box>
  );
};

export default MedicineDetail;
