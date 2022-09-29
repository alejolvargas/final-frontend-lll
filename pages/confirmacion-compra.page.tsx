import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    magirTop: '220'
}));

const Confirmacion = () => {
  return (
      <LayoutGeneral>
        <Box sx={{ flexGrow: 1,
              maxWidth:900,
              marginTop:5
        }}>
            <Grid container spacing={2}>
                  <Grid item xs={12} marginY="" >
                    <Item>felicitaciones</Item>
                </Grid>
                <Grid item xs={12}>
                    <Item>imagen</Item>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Item>datos personales</Item>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Item>direccion d entrega</Item>
                </Grid>
            </Grid>
        </Box>
      </LayoutGeneral>
  )
}

export default Confirmacion