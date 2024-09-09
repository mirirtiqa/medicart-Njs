
'use client';
import { useCart } from '@/contexts/CardContext';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore';
import styled from 'styled-components';
import { medColRef } from '@/lib/firebase';



const Container = styled.div`
  display: flex;
  padding: 20px;
`;

const FilterPane = styled.div`
  width: 250px;
  padding: 20px;
  background-color: #f8f9fa;
  margin-right: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MedicinesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px; /* Space between categories */
`;

const CategoryRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 16px;
`;

const StyledCard = styled(Card)`
  min-width: 300px;
  flex: 0 0 auto;
  border: 1px solid black;
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
`;

const StyledCardMedia = styled(CardMedia)`
  height: 140px;
`;

const StyledTypography = styled(Typography)`
  font-weight: bold;
  color: #333;
`;

const CategorySection = styled.div`
  margin-bottom: 40px;
`;

const CategoryBanner = styled.div`
  background-color: #01D6A3;
  padding: 10px;
  color: white;
  // text-align: center;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export default function MedicineCard() {
  const { updateQuantity } = useCart();
  const [medicinesByCategory, setMedicinesByCategory] = useState({});
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  // Fetch medicines and group by category
  const fetchAllMedicines = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(medColRef);
      const medicines = [];
      querySnapshot.forEach((doc) => {
        medicines.push({ id: doc.id, ...doc.data() });
      });

      
      const groupedByCategory = medicines.reduce((acc, medicine) => {
        const { Category } = medicine;
        if (!acc[Category]) {
          acc[Category] = [];
        }
        acc[Category].push(medicine);
        return acc;
      }, {});

      setMedicinesByCategory(groupedByCategory);
      setAllCategories(Object.keys(groupedByCategory));
    } catch (error) {
      console.error('Error fetching medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMedicines();
  }, []);

  // Handle category checkbox change
  const handleCategoryChange = (category) => {
    setFilteredCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  
  const displayedCategories = filteredCategories.length
    ? filteredCategories
    : allCategories;

  return (
    <Container>
      {/* Filter Pane */}
      <FilterPane>
        <Typography variant="h6" gutterBottom>
          Filter by Category
        </Typography>
        {allCategories.map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              id={category}
              checked={filteredCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={category} style={{ marginLeft: '8px' }}>
              {category}
            </label>
          </div>
        ))}
      </FilterPane>

      {/* Medicines Display */}
      <MedicinesContainer>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          displayedCategories.map((category) => (
            <CategorySection key={category}>
              <CategoryBanner>
                <Typography variant="h5">{category}</Typography>
              </CategoryBanner>
              <CategoryRow>
                {medicinesByCategory[category].map((medicine) => (
                  <StyledCard key={medicine.id}>
                    <StyledCardMedia
                      image="/medicines/paracetamol.jpg" 
                      title={medicine.Name}
                    />
                    <CardContent>
                      <StyledTypography gutterBottom variant="h5" component="div">
                        {medicine.Name}
                      </StyledTypography>
                      <StyledTypography variant="body2" sx={{ color: 'text.secondary' }}>
                        {medicine.Description}
                      </StyledTypography>
                    </CardContent>
                    <CardActions sx={{ gap: 15 }}>
                      <Typography variant="subtitle2">
                        {'\u20B9'} {medicine.Price} MRP
                      </Typography>
                {/* <input
                  type="number"
                  min="0"
                  style={{ width: '80px', }}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                /> */}

                      <Button size="small" sx={{
              backgroundColor: 'tertiary.main',
              color: 'white',
              '&:hover': { bgcolor: 'white', color: 'tertiary.main' }
            }} onClick={() => addToCart(medicine)}>Add to Cart</Button>
                    </CardActions>
                  </StyledCard>
                ))}
              </CategoryRow>
            </CategorySection>
          ))
        )}
      </MedicinesContainer>
    </Container>
  );
}


