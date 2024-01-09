import { useOnClickOutside } from "hooks/useClickOutside";
import React, { useRef } from "react";
import styled from "styled-components";

const CardForm = ({
  value,
  children,
  onChange,
  onCloseForm,
}: {
  value: string;
  children?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCloseForm: () => void;
}) => {
  const inputContainerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(inputContainerRef, onCloseForm);

  return (
    <InputContainer ref={inputContainerRef}>
      <Input autoFocus type="text" value={value} onChange={onChange} />
      {children}
    </InputContainer>
  );
};

export default CardForm;

const InputContainer = styled.div`
  margin-top: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
