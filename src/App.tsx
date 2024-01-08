import { useState, useEffect } from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import { Data } from "./types/common";
import Board from "./Board";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Droppable } from "react-beautiful-dnd";
import { DraggableLocation } from "react-beautiful-dnd";

const initialData: Data = {
  boards: [
    {
      id: "board-1",
      name: "Board 1",
      cards: [
        {
          id: "card-1",
          text: "Example",
        },
      ],
    },
  ],
};

function App() {
  const [data, setData] = useState<Data>(initialData);

  const handleDropCard = (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // let card: Card | undefined;

    const newBoards = [...data.boards];

    const sourceBoard = newBoards.find(
      (board) => board.id === source.droppableId
    );

    const destinationBoard = newBoards.find(
      (board) => board.id === destination.droppableId
    );

    if (sourceBoard && destinationBoard) {
      const [removed] = sourceBoard.cards.splice(source.index, 1);
      destinationBoard.cards.splice(destination.index, 0, removed);

      setData({
        ...data,
        boards: newBoards,
      });
    }
  };

  const handleDropBoard = (
    source: DraggableLocation,
    destination: DraggableLocation
  ) => {
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newBoards = [...data.boards];

    const [removed] = newBoards.splice(source.index, 1);
    newBoards.splice(destination.index, 0, removed);

    setData({
      ...data,
      boards: newBoards,
    });
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (type === "card") {
      return handleDropCard(source, destination);
    }

    if (type === "board") {
      return handleDropBoard(source, destination);
    }
  };

  const handleResetData = () => {
    setData(() => initialData);
  };

  const handleSaveData = () => {
    localStorage.setItem("data", JSON.stringify(data));
    toast.success("Data saved!");
  };

  const handleAddBoard = () => {
    const newBoard = {
      id: `board-${uuidv4()}`,
      name: "New board",
      cards: [],
    };

    setData((prevData) => ({
      ...prevData,
      boards: [...prevData.boards, newBoard],
    }));
  };

  const handleAddCard = (boardId: string) => {
    const newCard = {
      id: `card-${uuidv4()}`,
      text: "New card",
    };

    const newBoards = data.boards.map((board) => {
      if (board.id === boardId) {
        return {
          ...board,
          cards: [...board.cards, newCard],
        };
      }

      return board;
    });

    setData({
      ...data,
      boards: newBoards,
    });
  };

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      setData(JSON.parse(data));
    }
  }, []);

  return (
    <AppWrapper>
      <ToastContainer />
      <ButtonContainer>
        <button onClick={handleSaveData}>Save</button>
        <button onClick={handleResetData}>Reset</button>
      </ButtonContainer>

      <DragDropContext onDragEnd={handleDragEnd}>
        <MainContent>
          <Droppable
            droppableId="container"
            direction="horizontal"
            type="board"
          >
            {(provided) => (
              <BoardSection
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data.boards.map((board, index) => (
                  <Board
                    board={board}
                    key={index}
                    onAddCard={handleAddCard}
                    index={index}
                  />
                ))}

                {provided.placeholder}
              </BoardSection>
            )}
          </Droppable>

          <button onClick={handleAddBoard} style={{ textWrap: "nowrap" }}>
            New board
          </button>
        </MainContent>
      </DragDropContext>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: "url('https://source.unsplash.com/random')";

  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: start;
  overflow-y: hidden;
  overflow-x: auto;

  font-family: "Roboto", sans-serif;

  button {
    padding: 10px;
    border-radius: 8px;
    border: none;
    background-color: #0079bf;
    cursor: pointer;
    color: #fff;
    font-size: 14px;

    &:hover {
      background-color: #026aa7;
    }
  }
`;

const MainContent = styled.div`
  padding: 60px;
  display: flex;
  gap: 20px;
  align-items: start;
  flex-grow: 1;
`;

const BoardSection = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;
