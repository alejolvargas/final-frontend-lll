import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { useRouter } from 'next/router'
import useOrder from 'context/useOrden'
import { useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    magirTop: '220'
}));
const Item2 = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: '#ffff',
    magirTop: '220',
    backgroundColor: '#008000',
    fontSize: '25px'

}));

const Confirmacion: NextPage = () => {

    const { state: { orderDetail }, dispatch } = useOrder();
    const router = useRouter();
    console.log(orderDetail)
   /*  useEffect(() => {
        if (!orderDetail.length > 0)
            router.push("/")
    }, []) */


    return (
        <LayoutGeneral>
            <Box sx={{
                flexGrow: 1,
                maxWidth: 900,
                marginTop: 5
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Item2 >Que disfrutes tu compra</Item2>
                    </Grid>
                    <Grid item xs={12} container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center" >

                        <Card sx={{ width: 300 }} >
                            <CardMedia
                                component="img"
                                height="140"
                                image={orderDetail.order?.image}
                                alt={orderDetail.order?.name}

                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {orderDetail.order?.name}
                                </Typography>
                                <Typography variant="body1">
                                    {orderDetail.order?.price}
                                </Typography>

                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Item>
                            <Typography variant="h6">
                                Datos Personales
                            </Typography>
                            <Typography variant="body1">
                        {orderDetail.customer?.name}
                            </Typography>
                            <Typography variant="body1">
                                {orderDetail.customer?.email}
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Item>   
                            <Typography variant="h6" >
                                Direccion de entrega
                            </Typography>
                            <Typography variant="body1">
                                {orderDetail.customer?.address.address1}
                            </Typography>
                             <Typography variant="body1">
                                {orderDetail.customer?.address.city}
                             </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </LayoutGeneral>
    )
}

export default Confirmacion