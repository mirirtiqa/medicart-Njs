"use client";
import React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Button,
    Box,
} from "@mui/material";
import SpecialOffer from "@/components/OffersAndTrending/SpecialOffer";
const handleClick1 = () => {
    window.open('/cancer-care');
};
const handleClick2 = () => {
    window.open('/newMedical');
};
const OffersAndTrending = () => {
    const trendingProducts = [
        { name: "Comfortable Patient Bed", price: "$8.99", imageSrc: "/images/Product-1.jpg" },
        { name: "Pain Relief Medication", price: "$9.99", imageSrc: "/images/Product-2.jpg" },
        { name: "Soft Patient Bed", price: "$8.99", imageSrc: "/images/Product-3.jpg" },
        { name: "Order Lab Tests Online", price: "Starting at $13.99", imageSrc: "/images/Product-4.jpg" },
        { name: "Prescription Refill", price: "Starting at $13.99", imageSrc: "/images/Product-5.png" },
        { name: "Book Doctor", price: "Starting at $13.99", imageSrc: "/images/Product-6.png" },
        { name: "Ibuprofen", price: "Starting at $3.99", imageSrc: "/images/Product-6.png" },
        { name: "Book Doctor", price: "Starting at $13.99", imageSrc: "/images/Product-6.png" },
    ];

    return (
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} p={3}>
            {/* Left Side: Special Offers */}
            <Box width={{ xs: "100%", md: "33%" }} p={2}>
                <Typography variant="h6" fontWeight="bold" bgcolor="#F1F4F6" p={2} mb={2}>
                    Special Offers
                </Typography>
                {/* First Card: Cancer Care */}
                <Card sx={{ mb: 2, bgcolor: "#F1F4F6" }}>
                    <CardHeader title="Cancer Care" subheader="By MedicareHub" sx={{ textAlign: "center" }} />
                    <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                        <img src="/images/cancer-care-2.png" alt="Cancer Care" style={{ width: "144px", height: "144px" }} />
                    </CardContent><Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            bgcolor: "#01D6A3",
                            '&:hover': { bgcolor: "#fff", color: "#01D6A3" },
                        }}
                        onClick={handleClick1}
                    >
                        Buy Now
                    </Button>

                </Card>


                {/* Second Card: New Medical */}
                <Card sx={{ mb: 2, bgcolor: "#F1F4F6" }}>
                    <CardHeader title="New Medical" subheader="Explore Our New" sx={{ textAlign: "center" }} />
                    <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                        <img src="/images/new-medical.png" alt="New Medical" style={{ width: "144px", height: "144px" }} />
                    </CardContent>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            bgcolor: "#01D6A3",
                            '&:hover': { bgcolor: "#fff", color: "#01D6A3" },
                        }}
                        onClick={handleClick2}
                    >
                        Discover
                    </Button>
                </Card>

                {/* SpecialOffer Component */}
                <Box>
                    <SpecialOffer />
                </Box>
            </Box>

            {/* Right Side: Trending Products */}
            <Box width={{ xs: "100%", md: "67%" }} p={2}>
                <Typography variant="h6" fontWeight="bold" bgcolor="#F1F4F6" p={2} mb={2}>
                    Trending Products
                </Typography>
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                    gap={3}
                >
                    {trendingProducts.map((product, index) => (
                        <Card key={index} sx={{ bgcolor: "#F1F4F6" }}>
                            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                                <img src={product.imageSrc} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                            </CardContent>
                            <CardHeader
                                title={<Typography variant="body2" fontWeight="bold">{product.name}</Typography>}
                                subheader={<Typography variant="body2">{product.price}</Typography>}
                            />
                        </Card>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default OffersAndTrending;
