import styled from 'styled-components';

export default styled.div`
  min-height: 100vh;
  min-width: 300px;
  background-color: var(--lightColor);
  color: var(--darkColor);
  display: static;
  font-family: var(--font2);

  & .buttonMenu {
    display: none;

    @media only screen and (max-width: 500px) {
      display: block;
      font-size: 1.5em;
      text-align: right;
      margin-right: 10px;
    }
  }
  & .buttonBar {
    margin: 20px 50px;
    font-size: 16px;
    text-align: right;

    & button {
      min-width: 30px;
      margin-left: 20px;
    }

    @media print {
      display: none;
    }

    @media only screen and (max-width: 500px) {
      position: absolute;
      right: 0;
      z-index: 10;
      margin: 0;
      margin-top: 20px;
      padding: 0 20px 20px 20px;
      background-color: white;
      box-shadow: var(--shadow);
      display: none;

      &.active {
        display: block;
      }
      & button {
        display: block;
        margin-top: 15px;
        margin-left: 0;
        width: 95px;
      }

      /* rater */
      & > span {
        display: none;
      }
    }
  }

  & header {
    & > * {
      padding: 10px 0 0 20px;
    }
    h3 {
      font-size: 1.6em;
      font-family: 'Coiny';
    }
    p {
      font-style: italic;
      margin-bottom: 20px;
    }
  }
  & .contentWrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  & #clueWrapper {
    display: flex;
    flex-wrap: wrap;
    max-height: 500px;
    overflow: auto;
    & > div {
      width: 300px;
    }
    .clueHeader {
      padding: 5px;
      color: var(--darkColor);
      font-family: var(--font1);
      margin-bottom: 10px;
    }
    .hintItem {
      cursor: pointer;
      clear: both;
      margin-bottom: 5px;
      &.selected {
        .hintTxt {
          background-color: var(--lightColor);
        }
      }
      .done {
        background-color: var(--darkColor);
        color: white;
        border-bottom: 1px solid white;
      }
      .posLabel {
        border-radius: 4px;
        padding: 5px 0;
        width: 30px;
        text-align: center;
        background-color: var(--darkColor);
        color: white;
        float: left;
      }
      .hintTxt {
        width: calc(100% - 35px);
        padding: 3px 0 5px 35px;
        line-height: 1.4em;
      }
      .hint {
        padding-left: 30px;
      }
    }

    @media print {
      .hintItem {
        .posLabel {
          color: black;
        }
      }
    }
  }
  & #puzzleWrapper {
    margin: 20px;
    box-shadow: 0 2px 1px 1px rgba(140, 150, 160, 0.5);
    background-color: white;
    font-family: var(--font2);
    & #puzzle {
      border-collapse: collapse;
      text-align: center;
      float: left;
      user-select: none;
      & td {
        padding: 0px;
        width: ${props => props.cellWidth}px;
        height: ${props => props.cellWidth}px;
        border: 1px solid #006674;
        background-color: #006674;
        position: relative;
        cursor: default;
        vertical-align: middle;
        & .pos {
          font-size: 0.6rem;
          pointer-events: none;
          vertical-align: super;
          position: absolute;
          top: 0;
          left: 0;
          display: block;
        }
      }
    }

    @media print {
      box-shadow: none;
      -webkit-print-color-adjust: exact;
      #puzzle {
        td {
          border: 2px solid gray;
          background-color: #bbb !important;
          width: 2.5rem;
          height: 2.5rem;

          &.placeHolder {
            background-color: white !important;
          }
        }
      }
    }
    @media only screen and (max-width: 500px) {
      margin: 0;
    }
  }

  & .goodJob {
    padding: 20px;

    & h1 {
      font-size: 2em;
    }

    & .info {
      margin: 20px 0;
    }
  }

  & #smallScreenHint {
    width: 100%;
    background-color: var(--lightColor2);
    padding: 10px;
    margin: 10px;
    box-shadow: var(--shadow);
    display: none;
  }
`;
