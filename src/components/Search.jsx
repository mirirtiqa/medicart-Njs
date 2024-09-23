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


const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  // Firebase search function
  const handleSearch = async () => {
    if (!searchInput.trim()) return;

    try {
      const medicinesRef = collection(db, 'medicines');
      const q = query(medicinesRef, where('Name', '>=', searchInput));  
      const querySnapshot = await getDocs(q);

      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });

      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const handleSelect = (event, selectedOption) => {
    if (selectedOption) {
      router.push(`/medicine/${selectedOption.id}`); 
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchInput]);

  return (
  
      <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            padding:'0',
            // gap: { xs: 2, sm: 4 },
            maxWidth: '50%',
            // margin: '0 auto'
          }}
        >
        <Autocomplete
        sx={{
          width:'30rem',
          bgcolor:'white',
          // margin:'1rem',
          borderRadius:'0.4rem'
        }}
        freeSolo
        options={searchResults}
        getOptionLabel={(option) => option.Name}
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

 {/* <TextField
        variant="outlined"
        fullWidth
        placeholder="Search for medicines..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

   
      {searchInput && searchResults.length > 0 && (
        <SearchResults>
        {searchResults.length > 0 && (
          <List>
            {searchResults.map((medicine, index) => (
              <ListItem key={index}>
                <ListItemText primary={medicine.Name} />
              </ListItem>
            ))}
          </List>
        ) 
       
        }
      </SearchResults>

      )} */}