import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 15px;
  padding: 20px;
  width: 500px;
  background-color: var(--lightColor2);
  box-shadow: var(--shadow);
  line-height: 2em;
  & .response {
    margin-left: -20px;
    margin-right: 20px;
    margin-top: -35px;
    margin-bottom: 10px;
    display: inline-block;
  }

  & input {
    border: none;
    outline: none;
    border-bottom: 1px solid var(--darkColor);
    padding: 2px 5px;
    background-color: inherit;
  }
`;

export default function FillUp({ question, onOptionChange, hasSubmit }) {
  let onChange = e => {
    console.log(e.target.id);
    let id = Number(e.target.id.substr(5));
    let userAns = question.userAns;
    userAns[id] = e.target.value;
    onOptionChange(userAns);
  };

  let arr = question.qText.split(/\_{3,}/g);
  let fills = [];
  for (let i = 0; i < arr.length; i++) {
    fills.push(<span>{arr[i]} </span>);
    if (i != arr.length - 1) {
      fills.push(
        <input
          id={'fills' + i}
          className="form-control"
          style={{ width: question.options[i].text.length * 12 + 20 }}
          type="text"
          onChange={onChange}
          value={question.userAns[i]}
        />
      );
      if (hasSubmit) {
        console.log(question.userAns[i], question.options[i].text);
        let resp = 'fa-check';
        if (
          question.userAns[i].trim().toLowerCase() !==
          question.options[i].text.trim().toLowerCase()
        ) {
          resp = 'fa-times';
        }
        fills.push(<i className={'response fa ' + resp}> </i>);
      }
    }
  }

  return <Wrapper>{fills}</Wrapper>;
}
