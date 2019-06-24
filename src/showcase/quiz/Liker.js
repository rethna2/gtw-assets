import React from 'react';
import styled from 'styled-components';
import Rater from '../Rater';

const Wrapper = styled.div`
  margin-left: 25px;
  margin-bottom: 30px;
  & .tickSpace {
    width: 25px;
    overflow: visible;
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

  & .optionTxt {
    max-width: 500px;
    width: 100%;
    padding: 10px;
    box-shadow: var(--shadow);
    border-radius: 3px;
    background-color: var(--lightColor2);
  }

  & .item {
    margin-bottom: 20px;
  }

  & .raterWrap {
    padding: 5px;
    margin-left: 10px;
    background-color: white;
    display: inline-block;
    box-shadow: var(--shadow);
  }
`;

export default function Liker({ question, onOptionChange, hasSubmit }) {
  const update = (i, j) => {
    const userAns = [...question.userAns];
    console.log('before:', userAns);
    userAns[i] = j;
    console.log('after:', userAns);
    onOptionChange(userAns);
  };
  return (
    <Wrapper>
      {question.content.map((ques, i) => {
        console.log('i =', question.userAns[i]);
        return (
          <div className="item">
            <p>
              {ques.text}
              <span className="raterWrap">
                <Rater
                  value={question.userAns[i]}
                  onStarClick={value => update(i, value)}
                />
              </span>
            </p>
          </div>
        );
      })}
    </Wrapper>
  );
}
