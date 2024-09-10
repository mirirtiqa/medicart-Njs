"use client"

import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const CardComponent = ({ title, imageSrc, link }) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={2}>
            <a href={link} style={{ textDecoration: 'none' }}>
                <Card style={{ transition: 'box-shadow 0.3s', cursor: 'pointer' }}
                    onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)'}
                    onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}>
                    <CardHeader
                        title={
                            <Typography variant="h6" align="center" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                                {title}
                            </Typography>
                        }
                    />
                    <CardMedia
                        component="img"
                        height="140"
                        image={imageSrc}
                        alt={title}
                        style={{ objectFit: 'cover' }}
                    />
                </Card>
            </a>
        </Grid>
    );
};

const CardGrid = () => {
    const cards = [
        { title: 'Medicines', imageSrc: '/images/medicines.png', link: '/medicines' },
        { title: 'Lab Tests', imageSrc: '/images/lab-tests.png', link: '/lab' },
        { title: 'Doctors', imageSrc: '/images/doctors.png', link: '/doctors' },
        { title: 'Cancer Care', imageSrc: '/images/cancer-care.png', link: '/cancer-care' },
        { title: 'Care Plans', imageSrc: '/images/care-plans.png', link: '/care-plans' },
        { title: 'Support for', imageSrc: '/images/support-for.png', link: '/support-for' },
    ];

    return (
        <div style={{ padding: '5rem', paddingBottom: '7rem', paddingTop : '10rem' }}>
            <Typography paddingBottom={'7rem'} fontWeight={'bold'} variant="h4" align="center" gutterBottom>
                Categories
            </Typography>
            <Grid container spacing={3}>
                {cards.map((card, index) => (
                    <CardComponent key={index} title={card.title} imageSrc={card.imageSrc} link={card.link} />
                ))}
            </Grid>
        </div>
    );
};

export default CardGrid;
