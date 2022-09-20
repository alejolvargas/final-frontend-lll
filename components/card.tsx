import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';

type comicCardProps = {
    id: number,
    title: string,
    picture: string,
}

const CardMarvel = ({title, picture, id}:comicCardProps) => {
  const router = useRouter()
  const ToDetail = () => {
    router.push(`/comic/${id}`)
  }

  return (
     <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={title}
        height="400"
        image={picture}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {title}
        </Typography>
        </CardContent>
      <CardActions>
        <Button size="small">Comprar</Button>
        <Button size="small" onClick={ToDetail}> Ver detalle</Button>
      </CardActions>
    </Card>
  )
}

export default CardMarvel

