"use client"
import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import { heroSection } from "@/constants";
import Button from "@/components/Reusable/Button";
import Search from './Search';

// Styled Components
const HeroContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 100vh; 
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  z-index: -1; 
`;

const HeroContent = styled(Box)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: white;
//   text-align: center;
  background: rgba(0, 0, 0, 0.4);
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      <VideoBackground autoPlay loop muted>
        <source src="/HeroVideo.mp4" type="video/mp4" />
       
      </VideoBackground>

      <HeroContent>
        {/* <Typography variant="h2" component="h1">
          Find top quality medical products <br /> for your needs.
        </Typography> */}
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
       
         <Search width='50%'/>
  
      </Box>
            

      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
