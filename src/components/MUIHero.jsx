import { heroSection } from "@/constants";
import { Box, Button, Typography, InputBase } from '@mui/material';

export default function MUIHero() {
  return (
    <Box
      component="section"
      sx={{
        width : '100%',
        height: { xs: '100vh', sm: '100vh' },
        backgroundSize: 'cover',
        display: 'flex',
        backgroundImage: "url('/heroBG.png')",
        paddingTop: { xs: 10, md: 10 }, // Padding for small screens
      }}
    >
      {/* Left Section */}
      <Box
        sx={{
          position: 'relative',
          top: { xs: 0, md: 100 }, // Adjust top positioning for mobile
          left: { xs: 0, md: 50 }, // Adjust left positioning for mobile
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: { xs: '100%', md: '60%' }, // Full width for small screens
          paddingX: { xs: 2, md: 0 },
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
            width: '100%', // Ensure full width for mobile
          }}
        >
          <InputBase
            placeholder="Search for medical products or services"
            sx={{
              p: 2,
              width: { xs: '100%', md: '60%' },
              backgroundColor: 'white',
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
                py: 2,
                px: { xs: 0, md: 4 }, // Full width for small screens, padding for larger
                width: '100%', // Full width for smaller screens
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
