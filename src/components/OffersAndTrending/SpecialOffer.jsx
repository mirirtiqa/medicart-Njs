import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";

const SpecialOffer = () => {
    const calculateTimeLeft = () => {
        const endTime = new Date("2024-08-31T23:59:59");
        const difference = endTime - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            const time = calculateTimeLeft();
            setTimeLeft(time);

            if (Object.keys(time).length === 0) {
                setIsExpired(true);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    if (isExpired) return null;

    const formatTime = (time) => String(time).padStart(2, '0').split('');

    return (
        <Link href="https://example.com/special-offer" target="_blank" rel="noopener noreferrer">
      <Box
        sx={{
          padding: 3,
          backgroundColor: "#01D6A3",
          borderRadius: 2,
          boxShadow: 3,
          transition: "box-shadow 0.3s",
          height: "14rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            boxShadow: 6,
          },
        }}
      >
        <Typography variant="h6" fontWeight="bold" textAlign="center" mb={1}>
          SPECIAL OFFER
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold" textAlign="center" mb={2}>
          LIMITED TIME OFFER
        </Typography>
        <Stack direction="row" spacing={1}>
          {formatTime(timeLeft.hours || 0).map((digit, index) => (
            <Box
              key={`hour-${index}`}
              sx={{
                backgroundColor: "black",
                color: "white",
                borderRadius: 1,
                fontSize: "1.5rem",
                fontWeight: "bold",
                padding: 1,
                textAlign: "center",
              }}
            >
              {digit}
            </Box>
          ))}
          <Typography variant="h4" fontWeight="bold">
            :
          </Typography>
          {formatTime(timeLeft.minutes || 0).map((digit, index) => (
            <Box
              key={`minute-${index}`}
              sx={{
                backgroundColor: "black",
                color: "white",
                borderRadius: 1,
                fontSize: "1.5rem",
                fontWeight: "bold",
                padding: 1,
                textAlign: "center",
              }}
            >
              {digit}
            </Box>
          ))}
          <Typography variant="h4" fontWeight="bold">
            :
          </Typography>
          {formatTime(timeLeft.seconds || 0).map((digit, index) => (
            <Box
              key={`second-${index}`}
              sx={{
                backgroundColor: "black",
                color: "white",
                borderRadius: 1,
                fontSize: "1.5rem",
                fontWeight: "bold",
                padding: 1,
                textAlign: "center",
              }}
            >
              {digit}
            </Box>
          ))}
        </Stack>
      </Box>
    </Link>
    );
};

export default SpecialOffer;
