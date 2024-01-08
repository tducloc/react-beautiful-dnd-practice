import styled from "styled-components";
import { Card } from "./types/common";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, index }: { card: Card; index: number }) => {
  return (
    <Draggable draggableId={card.id} index={index} key={card.id}>
      {(provided) => (
        <CardWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.text}
        </CardWrapper>
      )}
    </Draggable>
  );
};

export default Card;

const CardWrapper = styled.div`
  padding: 20px;
  background-color: #fff;

  margin-top: 20px;
  border-radius: 8px;

  border: 1px solid #eee;
`;
