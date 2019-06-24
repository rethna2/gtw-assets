import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    font-family: var(--font1);
    display: fixed;
    bottom: 0;
    background-color: var(--mediumColor);
    user-select: none;
    & .wrapper {
      display: flex;
      flex-wrap: wrap;

    }

    & li {
      cursor: pointer;
      border: 1px solid $darkColor;
      padding: 10px;
      font-size: 1.5em;
      list-style-type:none;
      &:hover {
        background-color: white;
      }
    }
  }
`;

class EnglishInput extends React.Component {
  input1Click = e => {
    if (e.target.tagName != 'LI') {
      return;
    }
    // this.props.onPick(e.target.innerHTML.trim());
    this.props.onPick(e.target.dataset.val);
  };

  render() {
    return (
      <StyledWrapper>
        <div id="consos" className="wrapper" onClick={this.input1Click}>
          <li data-val="A">A</li>
          <li data-val="B">B </li>
          <li data-val="C">C </li>
          <li data-val="D">D</li>
          <li data-val="E">E</li>
          <li data-val="F">F</li>
          <li data-val="G">G</li>
          <li data-val="H">H </li>
          <li data-val="I">I </li>
          <li data-val="J">J</li>
          <li data-val="K">K</li>
          <li data-val="L">L</li>
          <li data-val="M">M</li>
          <li data-val="N">N </li>
          <li data-val="O">O</li>
          <li data-val="P">P</li>
          <li data-val="Q">Q</li>
          <li data-val="R">R</li>
          <li data-val="S">S</li>
          <li data-val="T">T </li>
          <li data-val="U">U </li>
          <li data-val="V">V</li>
          <li data-val="W">W</li>
          <li data-val="X">X</li>
          <li data-val="Y">Y</li>
          <li data-val="Z">Z</li>
        </div>
      </StyledWrapper>
    );
  }
}

export default EnglishInput;
