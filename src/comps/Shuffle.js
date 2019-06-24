import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MultiBackend, { Preview } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';

//@DragDropContext(HTML5Backend)
@DragDropContext(MultiBackend(HTML5toTouch))
class Shuffle extends React.Component {
  generatePreview = (type, item, style) => {
    console.log('generatePreview', item);
    Object.assign(style, {
      marginBottom: 20,
      minWidth: 250,
      maxWidth: 500,
      padding: 10,
      boxShadow: 'var(--shadow)',
      borderRadius: 3,
      backgroundColor: 'var(--lightColor2)',
      opacity: 0.5
    });

    return <div style={style}>{item.text || 'dummmy'}</div>;
  };

  render() {
    console.log('this.props', this.props);
    return (
      <div>
        {this.props.children.map((item, i) => (
          <ShuffleItem
            style={{ padding: 5, backgroundColor: 'blue' }}
            moveItem={this.props.moveItem}
            index={i}
            id={i}
            text={this.props.touchSupport && this.props.options[i].text}
            canDrag={this.props.canDrag}
          >
            {item}
          </ShuffleItem>
        ))}
        <Preview generator={this.generatePreview} />
      </div>
    );
  }
}

const cardSource = {
  canDrag(props) {
    return props.canDrag !== false;
  },
  beginDrag(props) {
    console.log('props', props);
    return {
      id: props.id,
      index: props.index,
      text: props.text
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    if (dragIndex === hoverIndex) {
      return;
    }
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
    props.moveItem(dragIndex, hoverIndex, props.event);
    monitor.getItem().index = hoverIndex;
  }
};

@DropTarget('unitDrag', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('unitDrag', cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
class ShuffleItem extends React.Component {
  render() {
    const { connectDragSource, connectDropTarget } = this.props;
    return connectDragSource(
      connectDropTarget(<div> {this.props.children} </div>)
    );
  }
}

export default Shuffle;
