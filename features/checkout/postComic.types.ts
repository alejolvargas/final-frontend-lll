export type ComicType = {
    id: number,
    title: string,
    
     thumbnail: {
        path: string,
        extension: string,
    },
    description: string,
    price: number,
    oldPrice: number
}

export type cardType = {
    title: string,
    picture: string
}

export type Character = {
    id: number,
    name: string,
    description: string,
    modified: string,
    thumbnail: {
      path: string,
      extension: string,
    }
}