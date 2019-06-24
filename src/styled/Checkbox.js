import styled from 'styled-components';
import React from 'react';

const CheckboxWrapper = styled.div`
  outline: none;
  margin: 10px 0;
  & input[type='checkbox'] {
    width: 16px;
    height: 16px;
    display: inline-block;
    border-radius: 4px;
    vertical-align: middle;
    border: ${props => (props.checked ? '' : '2px solid #cccccc')};
    outline: none;
    transform: scale(1.5);
  }

  & .contentWrap {
    display: inline-block;
    margin-left: 10px;
    cursor: pointer;
  }
`;

const Checkbox = ({ onClick, children, checked }) => (
  <CheckboxWrapper
    onClick={onClick || ''}
    role={'checkbox'}
    aria-checked={checked}
    tabIndex={0}
    checked={checked}
  >
    {/*
      <span className={`checkbox ${checked ? 'checkIcon' : ''}`}>

      </span>
    */}
    <input type="checkbox" checked={checked} />
    <span className="contentWrap">{children}</span>
  </CheckboxWrapper>
);

export default Checkbox;
