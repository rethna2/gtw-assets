import React, { Component } from 'react';
import { findDOMNode, render } from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  user-select: none;

  & svg {
    position: absolute;
    top: 0;
    pointer-events: none;
  }
  & .optionWrapper {
    display: flex;
    margin-bottom: 25px;
    & .option {
      width: 250px;
      border-radius: 3px;
      background-color: var(--lightColor2);
      padding: 10px;
      box-shadow: var(--shadow);
    }

    & .pointer {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: white;
      border: 2px solid var(--darkColor);
      margin: 15px;

      &.rightMatch {
        margin-left: 50px;
      }
    }

    & .responseGroup {
      width: 30px;
      margin: 10px 0 0 10px;
      font-size: 1.5em;
    }
  }
`;

export default class Match extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //var sortable = Sortable.create(document.getElementById('shuffleParent'), {onSort:this.onSort});
    document
      .querySelectorAll('.optionWrapper .leftMatch')
      .forEach((node, i) => {
        node.addEventListener('mousedown', this.onMouseDown);

        let line = document.getElementById('cloneLine').cloneNode(true);
        line.setAttribute('id', 'line' + i);
        document.getElementById('svgNode').appendChild(line);
      });

    if (this.props.hasSubmit) {
      this.rights = document.querySelectorAll('.rightMatch');
      this.lefts = document.querySelectorAll('.leftMatch');
      let rect = findDOMNode(this.rootNode).getBoundingClientRect();
      this.offset = { x: rect.left, y: rect.top };
      for (let i = 0; i < this.lefts.length; i++) {
        const leftRect = this.lefts[
          this.props.question.shuffle[i]
        ].getBoundingClientRect();
        const rightRect = this.rights[i].getBoundingClientRect();

        let line = document.getElementById('line' + i);
        line.setAttribute('x1', leftRect.left - this.offset.x + 15);
        line.setAttribute('y1', leftRect.top - this.offset.y + 15);
        line.setAttribute('x2', rightRect.left - this.offset.x + 15);
        line.setAttribute('y2', rightRect.top - this.offset.y + 15);
      }
    }
  }

  onMouseDown = e => {
    console.log('e ', e.currentTarget.id);
    if (this.props.hasSubmit) {
      return;
    }
    /*
		this.node = document.createElement("Line");
		this.node.setAttribute('x1', 100);
		this.node.setAttribute('y1', 100);
		this.node.setAttribute('x2', 200);
		this.node.setAttribute('y2', 200);
		*/
    this.index = e.currentTarget.id;
    this.index = Number(this.index.substr(4));
    //let rect = document.querySelector(".matchOptions").getBoundingClientRect();
    let rect = findDOMNode(this.rootNode).getBoundingClientRect();
    console.log('new rect', rect);
    this.offset = { x: rect.left, y: rect.top };
    this.rights = document.querySelectorAll('.rightMatch');
    let nodeRect = e.currentTarget.getBoundingClientRect();
    //this.node = document.getElementById("cloneLine").cloneNode(true);
    this.node = document.getElementById('line' + this.index);
    if (!this.node) {
      return;
    }
    this.node.setAttribute('x1', nodeRect.left - this.offset.x + 15);
    this.node.setAttribute('y1', nodeRect.top - this.offset.y + 15);
    this.node.setAttribute('x2', nodeRect.left - this.offset.x + 15);
    this.node.setAttribute('y2', nodeRect.top - this.offset.y + 15);
    //document.getElementById("svgNode").appendChild(this.node);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  onMouseMove = e => {
    console.log('onMove');
    this.node.setAttribute('x2', e.clientX - this.offset.x);
    this.node.setAttribute('y2', e.clientY - this.offset.y);
    this.ans = -1;
    for (let i = 0; i < this.rights.length; i++) {
      let rect = this.rights[i].getBoundingClientRect();
      let dx = rect.left - e.clientX;
      let dy = rect.top - e.clientY;
      let diff = Math.sqrt(dx * dx + dy * dy);
      if (diff < 30) {
        this.node.setAttribute('x2', rect.left - this.offset.x + 15);
        this.node.setAttribute('y2', rect.top - this.offset.y + 15);
        this.ans = this.rights[i].getAttribute('id');
        this.ans = Number(this.ans.substr(5));
        break;
      }
    }
  };

  onMouseUp = e => {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    if (this.ans == -1) {
      this.node.setAttribute('x1', -200);
      this.node.setAttribute('y1', -200);
      this.node.setAttribute('x2', -200);
      this.node.setAttribute('y2', -200);
    } else {
      let arr = this.props.question.userAns;
      arr[this.ans] = this.index;
      this.props.onOptionChange(arr);
    }
  };

  onSort = e => {
    console.dir(e);
    let list = document
      .getElementById('shuffleParent')
      .querySelectorAll('.option');
    let a = [];
    for (let i = 0; i < list.length; i++) {
      let id = list[i].getAttribute('id');
      id = Number(id.substr(6));
      a.push(id);
    }
    console.log('a ', a);
    this.props.onOptionChange(a);
  };

  componentWillUnmount() {}

  render() {
    let { question, onOptionChange } = this.props;
    let onChange = e => {
      console.log(e.target.id);
      onOptionChange(Number(e.target.id.substr(6)));
    };

    return (
      <Wrapper ref={n => (this.rootNode = n)}>
        <div id="matchParent" ref={n => (this.node = n)}>
          {question.options.map((option, i) => {
            if (i >= question.noOfOptions) {
              return false;
            }
            let opt = question.options[question.shuffle[i]];

            let resp = '';
            if (this.props.hasSubmit) {
              console.log(question.shuffle[i], question.userAns[i]);
              if (question.userAns[i] == i) {
                resp = 'fa-check';
              } else {
                resp = 'fa-times';
              }
            }

            return (
              <div className="optionWrapper">
                <div className="option">
                  <span> {option.text}</span>
                </div>
                <div id={'left' + i} className="pointer leftMatch" />
                <div
                  id={'right' + question.shuffle[i]}
                  className="pointer rightMatch"
                />
                <div className="option">
                  <span> {opt.optionRight}</span>
                </div>
                <div className="responseGroup">
                  <i className={'response fa ' + resp}> </i>
                </div>
              </div>
            );
          })}
        </div>
        <svg
          id="svgNode"
          fill="none"
          stroke="#006674"
          strokeLinecap="round"
          strokeWidth="5"
          width="800"
          height="400"
        >
          <line id="cloneLine" x1="-100" y1="-100" x2="-100" y2="-100" />
        </svg>
      </Wrapper>
    );
  }
}
