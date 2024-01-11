import styled from "styled-components";
import { Card } from "../../types/common";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import CardForm from "./CardForm";

const Card = ({
  card,
  index,
  onSaveEditCard,
  onDeleteCard,
}: {
  card: Card;
  index: number;
  onSaveEditCard: (card: Card) => void;
  onDeleteCard: (cardId: string) => void;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(card.text);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClickEdit = () => {
    console.log("here");
    setIsEdit(true);
  };

  const handleClickDelete = () => {
    onDeleteCard(card.id);
  };

  const handleSaveChanges = () => {
    setIsEdit(false);
    onSaveEditCard({
      ...card,
      text: value,
    });
  };

  const handleCloseForm = () => {
    setIsEdit(false);
    setValue(card.text);
  };

  if (isEdit)
    return (
      <CardForm
        value={value}
        onChange={handleInputChange}
        onCloseForm={handleCloseForm}
      >
        <ButtonContainer>
          <button onClick={handleSaveChanges}>Save</button>
          <button onClick={handleCloseForm}>Cancel</button>
        </ButtonContainer>
      </CardForm>
    );

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <CardWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <CardDragHandle>{card.text}</CardDragHandle>

          <ActionButtonsWrapper>
            <ActionButton className="fas fa-pen" onClick={handleClickEdit} />
            <ActionButton className="fa fa-x" onClick={handleClickDelete} />
          </ActionButtonsWrapper>
        </CardWrapper>
      )}
    </Draggable>
  );
};

export default Card;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const CardWrapper = styled.div`
  background-color: #fff;
  margin-top: 20px;
  border-radius: 8px;
  border: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const CardDragHandle = styled.div`
  cursor: pointer;
  flex: 1;
  padding: 20px;
  user-select: none;
`;

const ActionButtonsWrapper = styled.div`
  display: none;
  position: absolute;
  right: 0px;
  top: 0px;
  padding: 4px;
  z-index: 1;
  height: 100%;

  ${CardWrapper}:hover & {
    display: flex;
    flex-direction: column;
  }
`;

const ActionButton = styled.i`
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 12px;
  font-size: 12px;
  display: block;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;
