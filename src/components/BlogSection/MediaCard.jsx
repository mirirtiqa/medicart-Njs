import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import styled from 'styled-components';
import Image from 'next/image';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';


export default function MediaCard({title,cardImage,cardDescription,cardFooterText}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
      <CardMedia
        sx={{ height: 140 }}
        image={cardImage}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {cardDescription}
        </Typography>
      </CardContent>

      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        <Avatar aria-label="icon" src="/footericon.jpg" sx={{ mr: 2 }}>
          A
        </Avatar>
        <Typography variant="subtitle1">{cardFooterText}</Typography>
      </Box>
        </CardActionArea>
    </Card>
  );
}