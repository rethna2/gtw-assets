import React, { Component } from 'react';
import { findDOMNode, render } from 'react-dom';
import styled from 'styled-components';
import Shuffle from '../Shuffle';

const Wrapper = styled.div`
  margin-left: 25px;
  margin-bottom: 30px;

  & .option {
    display: flex;
    margin-bottom: 20px;
    min-width: 250px;
    max-width: 500px;
    width: 100%;
    padding: 10px;
    box-shadow: var(--shadow);
    border-radius: 3px;
    background-color: var(--lightColor2);
  }

  & .optionText {
  }

  & .orderLabel {
    margin: -10px;
    margin-right: 15px;
    padding: 10px;
    background-color: var(--mediumColor);
  }
`;

export default class ShuffleShowcase extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //var sortable = Sortable.create(document.getElementById('shuffleParent'), {onSort:this.onSort});
  }

  onSort = e => {
    let list = document
      .getElementById('shuffleParent')
      .querySelectorAll('.option');
    let a = [];
    for (let i = 0; i < list.length; i++) {
      let id = list[i].getAttribute('id');
      id = Number(id.substr(6));
      a.push(id);
    }
    this.props.onOptionChange(a);
  };

  componentWillUnmount() {}

  moveItem = (dragIndex, hoverIndex) => {
    let arr = [...this.props.question.userAns];
    let item = arr[dragIndex];
    arr = [...arr.slice(0, dragIndex), ...arr.slice(dragIndex + 1)];
    arr = [...arr.slice(0, hoverIndex), item, ...arr.slice(hoverIndex)];
    console.log('arr=', arr);
    this.props.onOptionChange(arr);
    /*
    let words = this.state.data.get("words");
    let obj = words.get(dragIndex);
    words = words.splice(dragIndex, 1);
    words = words.splice(hoverIndex, 0, obj);
		this.setState(({ data }) => ({ data: data.set("words", words) }));
		*/
  };

  render() {
    let { question, onOptionChange } = this.props;
    const displayMap = question.options.map((item, i) => {
      const i2 = question.userAns[i];
      return question.options[question.shuffle[i2]];
    });
    return (
      <Wrapper>
        <Shuffle
          moveItem={this.moveItem}
          canDrag={!this.props.hasSubmit}
          options={displayMap}
          touchSupport={true}
        >
          {displayMap.map((option, i) => {
            if (i >= question.noOfOptions) {
              return false;
            }

            return (
              <div key={i} id={'option' + i} className="option">
                {this.props.hasSubmit && !question.isUserCorrect && (
                  <i className="orderLabel">
                    {' '}
                    {question.shuffle[question.userAns[i]] + 1}
                  </i>
                )}
                <span className="optionText"> {option.text} </span>
              </div>
            );
          })}
        </Shuffle>
      </Wrapper>
    );
  }
}
