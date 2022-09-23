import React from 'react'
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import Head from 'next/head'
import AccordionCharactes from 'dh-marvel/components/accordin-characters'
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Image from 'next/image'
import { getCharacter, getCharacters } from 'dh-marvel/services/marvel/marvel.service'
import { Character } from 'dh-marvel/features/types/postComic.types'
import { CharacterDetailProps } from 'dh-marvel/features/types/postComic.types'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CharacterDetail: NextPage<CharacterDetailProps> = ({ id, name, thumbnail, description, comics }: CharacterDetailProps) => {

  
    const urlImage = `${thumbnail.path}/portrait_incredible.${thumbnail.extension}`;

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <LayoutGeneral>
            <Head>
                <title>Detalle del Personaje</title>
                <meta name="Detalle Personaje" content={name} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BodySingle title={name} >
                <Box sx={{ maxWidth: 900 }}
                 alignItems='center'
                 justifyContent='center'
                 marginTop='10px'>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {<Image src={urlImage} alt='Portada del comic' height={300} width={200} />}
                        </Grid>
                        <Grid item xs={6}>

                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                   
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        <div>{description}</div>
                                    </Typography>
                                   
                                </CardContent>
                               
                            </Card>

                        </Grid>

                        <Grid item xs={12}>
                            <AccordionCharactes id={id} title="Comics" characters={comics} />
                        </Grid>
                      
                    </Grid>
                </Box>
            </BodySingle>
        </LayoutGeneral>
    )
}



export const getStaticPaths: GetStaticPaths = async () => {
    const response = await getCharacters(0, 12);
    const characters: Character[] = await response.data.results;
    const paths = characters.map(char => ({
        params: { id: `${char.id}` }
    }))
    return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<CharacterDetailProps> = async ({ params }: GetStaticPropsContext<any>) => {
    const { id } = params;
    const response = await getCharacter(id);
    const character: Character = await response
    return {
        props: { id: character.id, name: character.name, thumbnail: character.thumbnail, description: character.description, comics: character.comics },
    };
}


export default CharacterDetail