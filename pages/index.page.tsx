import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import GridMarvel from 'dh-marvel/components/grid-marvel';
import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import { ComicType } from 'dh-marvel/features/types/postComic.types';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';

type postProps = {
    comics: ComicType[],
    total: number

}



const Index: NextPage<postProps> = ({ comics, total }: postProps) => {
    const [data, setData] = useState<ComicType[]>(comics)
    const [page, setPage] = useState(1);
   

    const handleChange = async (e: React.ChangeEvent<unknown>, value: number) => {

        setPage(value);
       
    };

    const getComicsPage = async () => {
        /* offset : Omita el número especificado de recursos en el conjunto de resultados. */
        const offset = 12 * (page - 1);
        console.log(`el vaor de offset es ${offset}`)
        const response = await fetch(`/api/paginacion/comics?offset=${offset}`)
        const results = await response.json()
        setData(results)
        console.log(setData)

    }

    useEffect(() => {
        getComicsPage()
    }, [page])


    return (
        <LayoutGeneral>
            <Head>
                <title>Home1</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <BodySingle title={"MARVEL"}>
                <Stack spacing={2}>
                    <Pagination count={Math.round(total / 12)} page={page} onChange={handleChange} hidePrevButton={page == 1 ? true : false} />
                </Stack>
                <GridMarvel comics={data} />
                <Stack spacing={2}>
                    <Pagination count={Math.round(total / 12)} page={page} onChange={handleChange} hidePrevButton={page == 1 ? true : false} />
                </Stack>
            </BodySingle>
        </LayoutGeneral>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await getComics(0, 12)


    return {
        props: {
            comics: response.data.results,
            total: response.data.total
        },
    }
}



export default Index


