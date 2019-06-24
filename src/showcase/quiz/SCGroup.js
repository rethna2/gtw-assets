import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: 25px;
  margin-bottom: 30px;
  & .tickSpace {
    width: 25px;
    overflow: visible;
  }

  & .questionWrap {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid white;
  }

  & .option {
    display: flex;
    margin-bottom: 20px;

    & input {
      transform: scale(2);
      margin-top: 10px;
      margin-right: 15px;
    }
  }

  & .qText {
    margin-bottom: 15px;
  }

  & .optionTxt {
    max-width: 500px;
    width: 100%;
    padding: 10px;
    box-shadow: var(--shadow);
    border-radius: 3px;
    background-color: var(--lightColor2);
  }
`;

export default function SCGroup({ question, onOptionChange, hasSubmit }) {
  const update = (i, j) => {
    const userAns = [...question.userAns];
    userAns[i] = j;
    console.log('userAns', userAns);
    onOptionChange(userAns);
  };
  return (
    <Wrapper>
      {question.content.map((ques, i) => {
        return (
          <div className="questionWrap">
            <p className="qText">{ques.qText} </p>
            <div>
              {ques.options.map((option, j) => {
                let resp = '';
                if (hasSubmit) {
                  console.log('question.userAns[i]', question.userAns[i], j);
                  if (question.userAns[i] === j && !option.isCorrect) {
                    resp = 'fa-times';
                  }
                  if (option.isCorrect) {
                    resp = 'fa-check';
                  }
                }
                return (
                  <div className="option">
                    <div className="tickSpace">
                      {' '}
                      <i className={'response fa ' + resp}> </i>{' '}
                    </div>
                    <input
                      type="radio"
                      checked={question.userAns[i] === j}
                      name={`option${i}`}
                      onClick={e => update(i, j)}
                    />
                    <div className="optionTxt"> {option.text}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </Wrapper>
  );
}
