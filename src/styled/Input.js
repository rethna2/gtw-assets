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
    padding: 2px 5px;
    background-color: inherit;
    display: block;
    width: 100%;
  }

  & label {
    display: block;
    margin-bottom: 5px;
    white-space: nowrap;
    margin-right: 10px;
  }

  & .errorLable {
    font-family: 'Avenir-Roman', sans-serif;
    font-size: 10px;
    margin-top: 5px;
    color: #de1c1c;
  }
`;

const Input = ({ error, label, ...otherProps }) => (
  <InputWrapper
    sameLine={otherProps.sameLine}
    error={error}
    style={otherProps.style}
  >
    {!!label && <label>{label}</label>}
    <input type="text" {...otherProps} />
    {error && <label className="errorLable">{error}</label>}
  </InputWrapper>
);

export default Input;
