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
        <div className="relative top-20 left-4 flex flex-col gap-10 md:w-[60%] md:h-3/4">
            <div className="flex flex-col gap-3 text-white">
                <h1 className="text-3xl md:text-5xl font-extrabold">Find top quality <span className="text-green">medical products</span></h1>
                <h1 className="text-3xl md:text-5xl font-extrabold">for your needs</h1>
                <p className="text-slate-400 text-base md:text-lg">{heroSection.description}</p>
            </div>
            <Search/>
            

        </div>  
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
