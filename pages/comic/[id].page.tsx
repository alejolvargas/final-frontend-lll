import { getCharacter, getComics } from 'dh-marvel/services/marvel/marvel.service'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import React from 'react'
import { ComicType } from 'dh-marvel/features/checkout/postComic.types';

type postProps = {
    comics: ComicType[],
}



const detailCard: NextPage<postProps> = ({comics}:postProps) => {
  return (
    <div>detailCard{comics.id}</div>
  )
}

export const getStaticPaths: GetStaticPaths = async() => {
    const res = await getComics(0,12);
    const comics: ComicType[] = await res.data.results;
    const paths = comics.map(comic => ({params: {id:String(comic.id)}}))
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps:GetStaticProps  = async({params}: GetStaticPropsContext<any>) => {
     const {id} = params;
    const posts = await getCharacter(id);
  
    
    return {
        props: {comics: posts.data.results}

    }
} 


export default detailCard


/*
---------ejemplo clase 1 ruta dimanica------------
export const getStaticPaths: GetStaticPaths = async()=>{
  const res = await fetch(`https://api.punkapi.com/v2/beers`)
  const data: Beer[] = await res.json()

  const paths = data.map(beer => ({params: {id: String(beer.id)}}))
  return{
    paths, 
    fallback: false
  }
}


export const getStaticProps: GetStaticProps = async(context)=>{
  const {params} = context

  const res = await fetch(`https://api.punkapi.com/v2/beers/${params?.id}`)
  const data: Beer = (await res.json())[0]

  return {
    props: {
      data
    }
  }
} */