import * as React from 'react';
import MuiCard from '@mui/material/Card'; // Alias MUI's Card as MuiCard
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function Card({ children, title, image }) {
  return (
    <MuiCard sx={{ maxWidth: 345, mb: 2 }}>
      {image && (
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title || 'Image'}
        />
      )}
      <CardContent>
        {title && (
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        )}
        {children}
      </CardContent>
    </MuiCard>
  );
}

export default Card;
