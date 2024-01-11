import { Board } from "../../types/common";
import Card from "../Card";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useRef, useState } from "react";
import CardForm from "components/Card/CardForm";
import Title from "./Title";

const Board = ({
  board,
  index,
  onEditTitle,
  onDeleteBoard,
  onAddCard,
  onEditCard,
  onDeleteCard,
}: {
  board: Board;
  index: number;
  onEditTitle: (boardId: string, title: string) => void;
  onDeleteBoard: (boardId: string) => void;
  onAddCard: (boardId: string, card: Card) => void;
  onEditCard: (boardId: string, card: Card) => void;
  onDeleteCard: (boardId: string, cardId: string) => void;
}) => {
  const [newCard, setNewCard] = useState<Card | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);

  const handleDeleteCard = (cardId: string) => {
    onDeleteCard(board.id, cardId);
  };

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

  const handleSaveEditCard = (card: Card) => {
    onEditCard(board.id, card);
  };

  const handleNewCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!newCard) {
      return;
    }
    setNewCard({
      ...newCard,
      text: e.target.value,
    });
  };

  const handleSaveTitle = (title: string) => {
    onEditTitle(board.id, title);
  };

  const handleDeleteBoard = () => {
    onDeleteBoard(board.id);
  };

  const renderInput = (newCard: Card) => {
    return (
      <CardForm
        value={newCard.text}
        onChange={handleNewCardInputChange}
        onCloseForm={handleSaveNewCard}
      />
    );
  };

  return (
    <div ref={boardRef}>
      <Draggable key={board.id} draggableId={board.id} index={index}>
        {(dragProvided) => (
          <BoardWrapper
            {...dragProvided.draggableProps}
            ref={dragProvided.innerRef}
          >
            <div {...dragProvided.dragHandleProps}>
              <Title
                title={board.name}
                onSaveTitle={handleSaveTitle}
                onDeleteBoard={handleDeleteBoard}
              />
            </div>
            <Droppable droppableId={board.id} type="card">
              {(provided, snapshot) => (
                <DropArea
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  $isDraggingOver={snapshot.isDraggingOver}
                >
                  {board.cards.map((card, index) => (
                    <Card
                      key={card.id}
                      card={card}
                      index={index}
                      onSaveEditCard={handleSaveEditCard}
                      onDeleteCard={handleDeleteCard}
                    />
                  ))}

                  {newCard && renderInput(newCard)}
                  {provided.placeholder}
                </DropArea>
              )}
            </Droppable>

            <ButtonContainer>
              {newCard ? (
                <>
                  <button onClick={handleSaveNewCard}>Save</button>
                  <button onClick={handleCancelNewCard}>Cancel</button>
                </>
              ) : (
                <button onClick={handleClickAddCard}>Add Card</button>
              )}
            </ButtonContainer>
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
`;

const DropArea = styled.div<{ $isDraggingOver: boolean }>`
  padding: 10px;
  flex-grow: 1;
  background-color: ${(props) =>
    props.$isDraggingOver ? "skyblue" : "inherit"};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 20px;
`;
