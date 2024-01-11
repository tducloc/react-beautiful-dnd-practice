import { useState } from "react";
import styled from "styled-components";

const Title = ({
  title,
  onSaveTitle,
  onDeleteBoard,
}: {
  title: string;
  onSaveTitle: (title: string) => void;
  onDeleteBoard: () => void;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(title);
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleEnterEditMode = () => {
    setIsEdit(true);
  };

  const handleSaveChanges = () => {
    setIsEdit(false);
    onSaveTitle(value);
  };

  const renderTitleForm = () => {
    return (
      <TitleWrapper>
        <TitleInputWrapper
          autoFocus
          type="text"
          value={value}
          onChange={handleInputChange}
          onBlur={handleSaveChanges}
        />
      </TitleWrapper>
    );
  };

  if (isEdit) {
    return renderTitleForm();
  }

  return (
    <TitleWrapper
      onClick={handleEnterEditMode}
      onMouseOver={() => {
        setShowDeleteButton(true);
      }}
      onMouseLeave={() => {
        setShowDeleteButton(false);
      }}
    >
      <TitleTextWrapper>{title}</TitleTextWrapper>

      {showDeleteButton && (
        <DeleteIconWrapper
          onClick={(e) => {
            e.stopPropagation();
            onDeleteBoard();
          }}
        >
          <i className="fa-solid fa-x" />
        </DeleteIconWrapper>
      )}
    </TitleWrapper>
  );
};

export default Title;

const TitleWrapper = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  cursor: pointer;
`;

const TitleTextWrapper = styled.div`
  flex-grow: 1;
`;

const DeleteIconWrapper = styled.i`
  position: relative;
  font-size: 14px;
  cursor: pointer;
  z-index: 2;
  padding: 6px 8px;
  border-radius: 12px;

  &:hover {
    background-color: #333;
    color: #fff;
  }

  svg {
    display: block;
  }
`;

const TitleInputWrapper = styled.input`
  padding: 12px;
  outline: none;
  border: none;
  width: 100%;
  font-size: 24px;
`;
