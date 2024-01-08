import { Board } from "./types/common";
import Card from "./Card";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Board = ({
  board,
  index,
  onAddCard,
}: {
  board: Board;
  index: number;
  onAddCard: (boardId: string) => void;
}) => {
  return (
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
              </div>
            )}
          </Droppable>
          <button onClick={() => onAddCard(board.id)}>Add Card</button>
        </BoardWrapper>
      )}
    </Draggable>
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
