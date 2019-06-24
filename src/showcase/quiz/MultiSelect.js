import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 30px;
  & .tickSpace {
    width: 35px;
    overflow: visible;
  }
  & .option {
    display: flex;
    margin-bottom: 20px;
    min-width: 250px;
    & input {
      transform: scale(2);
      margin-top: 10px;
      margin-right: 15px;
    }

    & > * {
      pointer-events: none;
      user-select: none;
    }
  }

  & .optionTxt {
    cursor: pointer;
    max-width: 500px;
    width: 100%;
    padding: 10px;
    box-shadow: var(--shadow);
    border-radius: 3px;
    background-color: var(--lightColor2);
  }

  @media print {
    .option {
      margin-bottom: 0;
      margin-bottom: 5px;

      input {
        margin-top: 0;
        transform: scale(1.2);
      }
    }
    .optionTxt {
      box-shadow: none;
      padding: 0;
    }
  }
`;

export default function MultiSelect({ question, onOptionChange, hasSubmit }) {
  let onChange = e => {
    let id = Number(e.target.id.substr(6));
    let userAns = question.userAns;
    userAns[id] = !userAns[id];
    onOptionChange(userAns);
  };

  return (
    <Wrapper>
      {question.options.map((option, i) => {
        if (i >= question.noOfOptions) {
          return false;
        }
        let resp = '';
        if (hasSubmit) {
          if (question.userAns == i && !option.isCorrect) {
            resp = 'fa-times';
          }
          if (option.isCorrect) {
            resp = 'fa-check';
          }
        }
        return (
          <div className="option" id={'option' + i} onClick={onChange}>
            <div className="tickSpace">
              {' '}
              <i className={'response fa ' + resp}> </i>{' '}
            </div>
            <input
              type="checkbox"
              checked={question.userAns[i]}
              name="option"
            />
            <div className="optionTxt"> {option.text}</div>
          </div>
        );
      })}
    </Wrapper>
  );
}
