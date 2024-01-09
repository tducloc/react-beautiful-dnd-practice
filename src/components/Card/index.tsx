import styled from "styled-components";
import { Card } from "../../types/common";
import { Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import CardForm from "./CardForm";

const Card = ({
  card,
  index,
  onSaveEditCard,
}: {
  card: Card;
  index: number;
  onSaveEditCard: (card: Card) => void;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(card.text);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClickEdit = () => {
    setIsEdit(true);
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
    <Draggable draggableId={card.id} index={index} key={card.id}>
      {(provided) => (
        <CardWrapper ref={provided.innerRef} {...provided.draggableProps}>
          <CardDragHandle {...provided.dragHandleProps}>
            {card.text}
          </CardDragHandle>

          <EditButton
            className="fas fa-pen"
            onClick={handleClickEdit}
          ></EditButton>
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
`;

const CardDragHandle = styled.div`
  cursor: pointer;
  flex: 1;
  padding: 20px;
  user-select: none;
`;

const EditButton = styled.i`
  position: relative;
  cursor: pointer;
  z-index: 2;
  margin: 20px;

  &:hover {
    color: #0079bf;
  }
`;
