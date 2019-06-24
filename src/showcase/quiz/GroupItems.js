import React from 'react';
import styled from 'styled-components';
import { DragSource, DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
const Wrapper = styled.div`
  display: flex;

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

  & .groupWrapper {
    width: 500px;
  }

  & .group {
    min-height: 100px;
    margin: 20px;
    padding: 5px;
    background-color: white;
    box-shadow: var(--shadow);
    border-radius: 3px;
  }

  & .item {
    margin: 5px;
    padding: 10px;
    border: 1px solid var(--darkColor);
    border-radius: 3px;
    background-color: var(--mediumColor);
    text-align: center;
  }

  & .itemWrapper {
    /*width: 300px;*/
    display: flex;
    flex-direction: column;
  }

  & .groupItemWrap {
    margin-top: 10px;
  }

  & .groupItem {
    display: inline-block;
    padding: 4px;
    margin: 5px;
    background-color: var(--mediumColor);
  }
`;

const boxTarget = {
  drop(props) {
    console.log(props);
    return { name: props.groupId };
  }
};

@DropTarget('unitDrag', boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))
class Group extends React.Component {
  render() {
    return this.props.connectDropTarget(
      <div className="group">
        <p>{this.props.group.text} </p>
        <div className="groupItemWrap">
          {this.props.items.map(item => {
            let resp = '';
            if (this.props.hasSubmit) {
              if (this.props.group.items.find(i => i.text === item.text)) {
                resp = 'fa-check';
              } else {
                resp = 'fa-times';
              }
            }
            return (
              <span>
                <span className="groupItem">{item.text}</span>
                <i className={'response fa ' + resp}> </i>
              </span>
            );
          })}
        </div>
      </div>
    );
  }
}

const boxSource = {
  beginDrag(props) {
    return {
      name: props.item.index
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      console.log('??', monitor.getItem());
      console.log('??', dropResult);
      props.onDrop(Number(monitor.getItem().name), Number(dropResult.name));
      return;
      window.alert(
        // eslint-disable-line no-alert
        `You dropped ${item.name} into ${dropResult.name}!`
      );
    }
  }
};

@DragSource('unitDrag', boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class Item extends React.Component {
  render() {
    return this.props.connectDragSource(
      <span className="item">{this.props.item.text}</span>
    );
  }
}

@DragDropContext(HTML5Backend)
class GroupItems extends React.Component {
  getSolved = (items, index) => {
    const { userAns } = this.props.question;
    return items.filter((item, i) => userAns[i] === index);
  };

  update = (i, j) => {
    const userAns = [...this.props.question.userAns];
    userAns[i] = j;
    console.log('userAns', userAns);
    this.props.onOptionChange(userAns);
  };

  render() {
    const { question, hasSubmit } = this.props;
    let items = question.content.map(group => group.items);
    items = items.reduce((a, wa) => [...wa, ...a], []);
    items = items.map((item, i) => items[question.shuffle[i]]);
    items = items.map((item, i) => ({ ...item, index: i }));
    let notSolved = items.filter(
      (item, index) => question.userAns[index] === null
    );
    return (
      <Wrapper>
        <div className="groupWrapper">
          {question.content.map((group, i) => (
            <Group
              group={group}
              hasSubmit={hasSubmit}
              groupId={i}
              items={this.getSolved(items, i)}
            />
          ))}
        </div>
        <div className="itemWrapper">
          {notSolved.map((item, i) => (
            <Item item={item} onDrop={this.update} />
          ))}
        </div>
      </Wrapper>
    );
  }
}

export default GroupItems;
