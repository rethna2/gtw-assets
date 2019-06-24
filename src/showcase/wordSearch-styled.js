import styled from 'styled-components';

export default styled.div`
  min-height: 100vh;
  min-width: 300px;
  background-color: var(--lightColor);
  color: var(--darkColor);
  display: static;
  font-family: var(--font2);
  line-height: 1.5em;
  & .wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 20px;
    & .puzzleWrapper {
      background-color: var(--lightColor2);
      margin-top: 65px;
    }
    @media only screen and (max-width: 500px) {
      margin: 0;
      .puzzleWrapper {
        margin: 0 auto;
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

  & .clueWrapper {
    max-height: 500px;
    overflow-y: auto;
    .hintItem {
      cursor: pointer;
      display: flex;
      margin-bottom: 10px;
      &.selected {
        .hintTxt {
          background-color: var(--lightColor);
        }
      }
      .posLabel {
        border-radius: 4px;
        /*padding: 5px 0;*/
        width: 30px;
        min-width: 30px;
        text-align: center;
        background-color: var(--darkColor);
        color: white;
        float: left;
        /*margin-bottom: 7px;*/
      }
      .hintTxt {
        width: calc(100% - 35px);
        padding: 3px 0 5px 35px;
        line-height: 1.4em;
      }
      .hint {
        padding-left: 30px;
        flex-grow: 1;
      }
      & .revealIcon {
        margin-left: 10px;
        font-size: 1.2em;
      }

      & .word {
        margin-left: 10px;
        font-size: 1.2em;
        padding: 0 5px;
        font-style: italic;
        /*
        border: 1px solid var(--darkColor);
        background-color: var(--lightColor);
        &.done {
          background-color: #a2efa2;
        }*/
      }
    }

    @media print {
      .hintItem {
        color: black;

        .posLabel {
          color: black;
        }
      }
    }

    @media screen and (max-width: 500px) {
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
`;
