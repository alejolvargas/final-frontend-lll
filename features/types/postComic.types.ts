export type ComicType = {
    id: number,
    title: string,
    pageCount: number,
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
    },
    resourceURI: string,
    comics: {
      available: number,
      collectionURI: string,
      items: [],
      returned: number
    },
    urls: [],
  }

    type Items = {
    resourceURI: string,
    name: string,
}

    type Comics = {
    available: number,
    collectionURI: string,
    items: Items[],
    returned: number,
}

export type CharacterDetailProps = {
    id: number,
    name: string,
    thumbnail: {
        path: string,
        extension: string,
    }
    description: string,
    comics: Comics,
}