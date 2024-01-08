interface Board {
  id: string;
  name: string;
  cards: Card[];
}

interface Card {
  id: string;
  text: string;
}

interface Data {
  boards: Board[];
}

export type { Board, Card, Data };
