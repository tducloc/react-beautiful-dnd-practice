import styled from "styled-components";
import { Card } from "./types/common";
import { Draggable } from "react-beautiful-dnd";
import { useRef, useEffect } from "react";

const Card = ({
  card,
  index,
  isEdit = false,
  handleClickEditButton,
  onChange,
}: {
  card: Card;
  index: number;
  isEdit?: boolean;
  handleClickEditButton?: () => void;
  onChange?: (card: Card) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus
  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  if (isEdit)
    return (
      <CardWrapper
        style={{
          padding: isEdit ? 0 : 20,
        }}
      >
        <Input
          ref={inputRef}
          type="text"
          value={card.text}
          onChange={(e) => {
            if (onChange) {
              onChange({
                ...card,
                text: e.target.value,
              });
            }
          }}
        />
      </CardWrapper>
    );

  return (
    <Draggable draggableId={card.id} index={index} key={card.id}>
      {(provided) => (
        <CardWrapper>
          <div
            className="card-content"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {card.text}
          </div>

          <EditButton
            className="fas fa-pen"
            onClick={handleClickEditButton}
          ></EditButton>
        </CardWrapper>
      )}
    </Draggable>
  );
};

export default Card;

const CardWrapper = styled.div`
  background-color: #fff;
  margin-top: 20px;
  border-radius: 8px;
  border: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .card-content {
    flex: 1;
    padding: 20px;
    user-select: none;
  }
`;

const Input = styled.input`
  border: none;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
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
