import React from 'react';
import { Box, Container, Button, Link, Typography, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        backgroundColor: '#033B4A',
        boxShadow: 2,
        py: 0.5,
        width: '100%',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
          px: 2,
        }}
      >
        {/* Left side: GPS icon, Doctor's office (as a link) and timings */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            // gap: { xs: 2, sm: 4 },
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <Link
            href="https://www.google.com/maps/place/Doctor's+Office+Location"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Maps"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              textDecoration: 'none',
              '&:hover': { color: 'gray.300' },
            }}
          >
            <LocationOnIcon fontSize="small" />
            <Typography sx={{ ml: 1, fontSize: { xs: 'auto', sm: 'body1' } }}>
              Doctor's Office
            </Typography>
          </Link>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mt: { xs: 1, sm: 0 },
            }}
          >
            <AccessTimeIcon fontSize="small" sx={{ color: 'white' }} />
            <Typography sx={{ fontSize: { xs: 'auto', sm: 'body1' }, color: 'white' }}>
              Open: Mon-Sat, 9:00 AM - 6:00 PM
            </Typography>
          </Box>
        </Box>

        {/* Right side: Social media icons and Get an Appointment button */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mt: { xs: 0, sm: 0 },
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%', // Ensure it uses the full width available
            justifyContent: 'flex-end', // Align items to the end of the container
          }}
        >
          {/* Social media icons */}
          <Box sx={{ display: { xs: 'none', sm: 'flex', gap : 2 }}}>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              sx={{ color: 'white', '&:hover': { color: 'gray.300' } }}
            >
              <FacebookIcon fontSize="small" />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              sx={{ color: 'white', '&:hover': { color: 'gray.300' } }}
            >
              <TwitterIcon fontSize="small" />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              sx={{ color: 'white', '&:hover': { color: 'gray.300' } }}
            >
              <InstagramIcon fontSize="small" />
            </IconButton>
            <IconButton
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              sx={{ color: 'white', '&:hover': { color: 'gray.300' } }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* "Get an Appointment" button */}
          <Button
            variant="contained"
            href="/doctors"
            sx={{
              backgroundColor: '#01D6A3',
              color: 'white',
              py: 1,
              borderRadius: 1,
              textTransform: 'none',
              fontSize: 'small',
              width: { xs: '100%', sm: 'auto' },
              minWidth: 130,
              '&:hover': { bgcolor: 'white', color: '#01D6A3' },
              mb: { xs: 0.5, sm: 0 }, // Ensure space between elements on small screens
            }}
          >
            Get an Appointment
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
