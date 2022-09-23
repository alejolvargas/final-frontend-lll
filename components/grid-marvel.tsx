import React, { FC } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardMarvel from './card'
import { ComicType } from 'dh-marvel/features/types/postComic.types';

interface Props {
    comics: ComicType[]
}

 
const GridMarvel:FC<Props> = ({comics}) => {
    
  return (
   <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {comics.map((postComic, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <CardMarvel id = {postComic.id} title={postComic.title} picture={`${postComic.thumbnail.path}/portrait_incredible.${postComic.thumbnail.extension}`}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default GridMarvel
