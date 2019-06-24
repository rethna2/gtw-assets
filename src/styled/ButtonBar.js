import styled from 'styled-components';

const ButtonBar = styled.div`
  display: flex;
  justify-content: ${props =>
    props.align === 'left' ? 'flext-start' : 'flex-end'};
  margin: 20px 0;
  & > * {
    margin-left: 20px;
  }

  @media print {
    display: none;
  }

  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export default ButtonBar;
