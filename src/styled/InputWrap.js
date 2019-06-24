import styled, { css } from 'styled-components';
import React from 'react';

const InputWrapper = styled.div`
  margin: 10px 0;

  ${props =>
    props.sameLine &&
    css`
      display: flex;
      margin-right: 50px;
    `} & input {
    border: none;
    outline: none;
    border-bottom: 1px solid ${props => (props.error ? '#f00' : '#ccc')};
    padding: 2px 5px 2px 15px;
    background-color: inherit;
    display: block;
    width: 100%;
  }

  & label {
    display: block;
    margin-right: 20px;
    margin-bottom: 5px;
    align-self: flex-end;
    min-width: 120px;
  }

  & .errorLable {
    font-family: 'Avenir-Roman', sans-serif;
    font-size: 10px;
    color: #de1c1c;
  }
`;

const InputWrap = ({ error, label, children, sameLine, ...otherProps }) => (
  <InputWrapper error={error} style={otherProps.style} sameLine={sameLine}>
    {!!label && <label>{label}</label>}
    {children}
    {error && <label className="errorLable">{error}</label>}
  </InputWrapper>
);

export default InputWrap;
