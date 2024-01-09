import { Board } from "./types/common";
import Card from "./Card";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useRef, useState } from "react";
import { useOnClickOutside } from "hooks/useClickOutside";

const Board = ({
  board,
  index,
  onAddCard,
}: {
  board: Board;
  index: number;
  onAddCard: (boardId: string, card: Card) => void;
}) => {
  const [newCard, setNewCard] = useState<Card | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const handleClickAddCard = () => {
    setNewCard({
      id: `card-${Math.random()}`,
      text: "",
    });
  };

  const handleSaveNewCard = () => {
    if (newCard) {
      if (newCard.text) {
        onAddCard(board.id, newCard);
      }
      setNewCard(null);
    }
  };

  const handleCancelNewCard = () => {
    setNewCard(null);
  };

  useOnClickOutside(boardRef, handleSaveNewCard);

  return (
    <div ref={boardRef}>
      <Draggable key={board.id} draggableId={board.id} index={index}>
        {(dragProvided) => (
          <BoardWrapper
            {...dragProvided.draggableProps}
            ref={dragProvided.innerRef}
          >
            <h2 {...dragProvided.dragHandleProps}>{board.name}</h2>
            <Droppable droppableId={board.id} type="card">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    padding: 10,
                    flexGrow: 1,
                    backgroundColor: snapshot.isDraggingOver
                      ? "skyblue"
                      : "inherit",
                  }}
                >
                  {board.cards.map((card, index) => (
                    <Card key={card.id} card={card} index={index} />
                  ))}

                  {provided.placeholder}

                  {newCard && (
                    <Card
                      card={newCard}
                      index={board.cards.length}
                      isEdit
                      onChange={(card) => {
                        setNewCard(card);
                      }}
                    />
                  )}
                </div>
              )}
            </Droppable>
            {!newCard ? (
              <button onClick={handleClickAddCard}>Add Card</button>
            ) : (
              <div
                style={{
                  display: "flex",
                  padding: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginLeft: "auto",
                    gap: 12,
                  }}
                >
                  <button onClick={handleCancelNewCard}>Cancel</button>
                  <button onClick={handleSaveNewCard}>Save</button>
                </div>
              </div>
            )}
          </BoardWrapper>
        )}
      </Draggable>
    </div>
  );
};

export default Board;

const BoardWrapper = styled.div`
  background-color: #eee;
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  margin-left: 20px;

  h2 {
    user-select: none;
    text-align: center;
    padding: 20px;
  }

  button {
    margin-top: auto;
  }
`;
