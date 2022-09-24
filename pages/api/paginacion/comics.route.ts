import type { NextApiRequest, NextApiResponse } from 'next';
import { ComicType } from 'dh-marvel/features/types/postComic.types';
import { getComics } from 'dh-marvel/services/marvel/marvel.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ComicType[]>){
    const { offset } = req.query;
    const offsetValue = offset ? parseInt(offset.toString()) : 0;
    const response = await getComics(offsetValue, 12)
    console.log(response.data.results)
    res.status(200).json(response.data.results); 
}
/* Omita el número especificado de recursos en el conjunto de resultados. */




/* 
ejemplos
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json( {data: users}); 
}

export default function handleAnimal(req, res) {
const {
query: { animal },
} = req;

res.statusCode = 200;
res.setHeader("Content-Type", "application/json");
res.end(JSON.stringify({ message: `Su animal favorito es ${animal}`
}));
} */

/* Omita el número especificado de recursos en el conjunto de resultados. */