export type GameObjects = {

    Game: {
        Image: string;
        Information: string;
        Name: string;
    }

    Posts: {
        MyPosts: string[],
        PublicPosts: string[]
    }
    
}

export type Games = {
    Games: GameObjects[];
}