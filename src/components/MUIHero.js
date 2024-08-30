import { heroSection } from "@/constants";

import { Box,  Button,Typography, TextField, InputBase } from '@mui/material';

export default function MUIHero() {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        height: '100vh',
        backgroundSize: 'cover',
        display: 'flex',
        backgroundImage: "url('/heroBG.png')",
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          position: 'relative',
          top: 100,
          left: 50,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: { md: '60%' },
          height: { md: '75%' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '3rem' },
              color: 'white',
            }}
          >
            Find top quality <span style={{ color: '#01D6A3' }}>medical products</span>
          </Typography>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '3rem' },
              color: 'white',
            }}
          >
            for your needs
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'grey.400',
              fontSize: { xs: '1rem', md: '1.125rem' },
            }}
          >
            {heroSection.description}
          </Typography>
        </Box>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            fontSize: { xs: '1rem', md: '1.125rem' },
          }}
        >
          <InputBase
            placeholder="Search for medical products or services"
            sx={{
              p: 2,
              width: { xs: '100%', md: '60%' },
              backgroundColor: 'white', // Adding a background for better visibility
              borderRadius: 1,
            }}
          />
          <Box sx={{ width: { xs: '100%', md: '20%' } }}>
          <Button
              variant="contained"
              sx={{
                bgcolor: 'tertiary.main',
                color: 'secondary.main',
                '&:hover': {
                  bgcolor: 'secondary.main',
                  color: 'tertiary.main',
                },
                py: 2, // padding y-axis
                px: 4, // padding x-axis
                borderRadius: 1,
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
