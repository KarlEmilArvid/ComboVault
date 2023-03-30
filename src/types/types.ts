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

//TODO: ta bort? lägg till typer osv
//export type Games = {
//    Games: GameObjects[];
//}

export type GAMES = {
    Games: {
        GameTitle: {
            Characters: {
                Image: string;
                Information: string;
                Intro: string;
                Name: string;
            }[]
            Game: {
                Image: string;
                Information: string;
                Name: string;
            }
        }[]
    }[]
}

export type GAME = {
    GameTitle: {
        Characters: {
            Image: string;
            Information: string;
            Intro: string;
            Name: string;
        }[]
        Game: {
            Image: string;
            Information: string;
            Name: string;
        }
    }[]
}[]