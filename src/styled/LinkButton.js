import styled from 'styled-components';
import React from 'react';

const LinkButtonStyled = styled.div`
  padding: 10px;
  text-align: right;
  font-size: 0.8em;
  text-decoration: underline;
  cursor: pointer;
`;

const LinkButton = ({ children, ...props }) => (
  <LinkButtonStyled {...props} role={'button'}>
    {children}
  </LinkButtonStyled>
);

export default LinkButton;
