import React from 'react';
import styled, { css } from 'styled-components';
import Loader from '../comps/SpinKit';

const Button = ({ children, updating, ...props }) => (
  <button {...props} disabled={updating || props.disabled}>
    {children}
    {updating && <Loader />}
  </button>
);

const StyledButton = styled(Button)`
  font-family: 'Avenir-Heavy', sans-serif;
  font-size: 12px;
  font-weight: normal;
  color: var(--darkColor);
  background-color: white;
  border: 2px solid var(--darkColor);
  height: 30px;
  outline: none;
  &:hover,
  &:active {
    background: var(--darkColor);
    color: white;
    /*border: 2px solid #0074a3;*/
  }

  ${props =>
    props.primary &&
    css`
      background: var(--darkColor);
      color: #ffffff;
      border: 2px solid var(--darkColor);

      &:hover,
      &:active {
        background: var(--darkColor2);
        /*color: var(--darkColor);*/
      }
    `} ${props =>
    props.width &&
    css`
      width: ${props.width}px;
    `}
  border-radius: 3px;
  padding: 5px 20px;
  transition: 200ms all ease-in-out;

  &:disabled {
    background: #b5bac3;
    border: 2px solid #b5bac3;
    cursor: not-allowed;
    color: #ffffff;
    &:hover,
    &:active {
      background: #b5bac3;
      color: #ffffff;
    }
  }

  @media print {
    display: none;
  }
`;

export default StyledButton;
