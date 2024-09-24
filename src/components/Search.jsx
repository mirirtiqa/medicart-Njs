"use client"
import { useState, useEffect } from 'react';
import { Autocomplete,TextField, InputAdornment, List, ListItem, ListItemText,Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { db } from '@/lib/firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation' 


const SearchContainer = styled.div`
  // padding: 20px;
  // max-width: 600px;
  margin: 0 auto;
`;


const Search = ({width}) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

 
  const handleSearch = async () => { 
    if (!searchInput.trim()) return;
  
    try {

      const doctorsRef = collection(db, 'doctors');
      const docQuery = query(doctorsRef, where('name', '>=', searchInput));
      const docQuerySnapshot = await getDocs(docQuery);
  
      const medicinesRef = collection(db, 'medicines');
      const medQuery = query(medicinesRef, where('Name', '>=', searchInput));
      const medQuerySnapshot = await getDocs(medQuery);
  
      
  
      const results = [];
  
     
      medQuerySnapshot.forEach((doc) => {
        results.push({ id: doc.id, type: 'medicine', ...doc.data() });
      });
  
    
      docQuerySnapshot.forEach((doc) => {
        results.push({ id: doc.id, type: 'doctor', ...doc.data() });
      });
  
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  
  const handleSelect = (event, selectedOption) => {
    if (selectedOption) {
      if (selectedOption.type === 'medicine') {
        router.push(`/medicine/${selectedOption.id}`); 
      } else if (selectedOption.type === 'doctor') {
        router.push(`/doctors/${selectedOption.id}`); 
      }
    }
  };
  

  useEffect(() => {
    handleSearch();
  }, [searchInput]);

  const getDisplayName = (option) => {
    if (option.type === 'doctor') {
      return option.name; 
    } else {
      return option.Name; 
    }
  };

  return (
  
      <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            padding:'0',
            // gap: { xs: 2, sm: 4 },
            maxWidth: '100%',
            // margin: '0 auto'
          }}
        >
        <Autocomplete
        sx={{
          width:`${width}` || '50%',
          bgcolor:'white',
          // margin:'1rem',
          borderRadius:'0.4rem'
        }}
        freeSolo
        options={searchResults}
        getOptionLabel={(option )=> getDisplayName(option) }
        onInputChange={(event, newInputValue) => {
          setSearchInput(newInputValue);
          handleSearch(newInputValue);
        }}
        onChange={handleSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Search for medicines..."
            InputProps={{
              ...params.InputProps,
              startAdornment: <SearchIcon />,
            }}
          />
        )}
      />
      </Box>
















  );
};

export default Search;