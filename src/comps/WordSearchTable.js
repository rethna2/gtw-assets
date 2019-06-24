import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  user-select: none;
  touch-action: none;
  font-size: 0.8rem !important;
  /*
  td{
    padding: 0px;
    width: 40px;
    height: 40px;
    border: 2px solid #006674;
    cursor: default;
    text-align: center;
    vertical-align: middle;
    &.selected {
      background-color: #fbb;
    }
  }
  */

  & .wrap {
    box-shadow: var(--shadow);
    border: 1px solid #aaa;
  }

  span {
    display: inline-block;
    box-sizing: border-box;
    padding: 0px;
    width: 40px;
    height: 40px;
    font-size: 1.3em;
    overflow: hidden;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    cursor: default;
    text-align: center;
    vertical-align: middle;
    &.selected {
      background-color: #fbb;
    }
    padding-top: 8px;

    &.mid {
    }

    &.small {
      width: 30px;
      height: 30px;
      border-width: 1px;
      font-size: 20px;
    }

    &.large {
      width: 60px;
      height: 60px;
      border-width: 4px;
      font-size: 30px;
    }
  }

  .selector {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 4px solid red;
    position: absolute;
    margin: 4px 0;
    left: 0;
    top: 0;
    display: block;
    pointer-events: none;
  }
  #completedOnes {
    .selector {
      border: 2px solid gray;
    }
  }
  @media print {
    & .wrap {
      box-shadow: none;
    }
  }

  @media screen and (max-width: 500px) {
    margin: 0 auto;
  }
`;

var config = {
  limits: [7, 12, 15],
  classNames: ['small', 'mid', 'large'],
  props: [
    {
      cellSize: 60,
      borderWidth: 4,
      fontSize: 30
    },
    {
      cellSize: 40,
      borderWidth: 2,
      fontSize: 25
    },
    {
      cellSize: 30,
      borderWidth: 1,
      fontSize: 20
    }
  ]
};

class WordSearchTable extends React.Component {
  constructor(props) {
    super(props);
    this.time = new Date().getTime();
    this.noOfRows = props.data.noOfRows;
    this.noOfCols = props.data.noOfCols;
  }

  componentDidMount() {
    document
      .querySelector('#puzzleTable')
      .addEventListener('touchstart', this.onTouchStart);
  }

  onTouchStart = e => {
    // e.preventDefault();
    console.log('this.props.complete', this.props.complete);
    if (this.props.complete) {
      //return;
    }
    e.stopPropagation();
    e.stopImmediatePropagation();
    document
      .querySelector('#puzzleTable')
      .addEventListener('touchmove', this.onTouchMove);
    document
      .querySelector('#puzzleTable')
      .addEventListener('touchend', this.onTouchEnd);
    this.onMouseDown(e);
  };

  onTouchMove = e => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    let time = new Date().getTime();
    if (time - this.time < 200) {
      return;
    }
    this.time = time;
    this.mouseMoveUpdate(e.touches[0].clientX, e.touches[0].clientY);
  };

  onTouchEnd = e => {
    e.preventDefault();
    e.stopPropagation();
    document
      .querySelector('#puzzleTable')
      .removeEventListener('touchmove', this.onTouchMove);
    document
      .querySelector('#puzzleTable')
      .removeEventListener('touchend', this.onTouchEnd);
    this.onMouseUp(e);
  };

  componentWillUnmount() {
    document
      .querySelector('#puzzleTable')
      .removeEventListener('touchstart', this.onTouchStart);
  }

  onMouseDown = e => {
    if (this.props.complete) {
      return;
    }
    console.log(e.target.id);

    let tableWrapper = document.querySelector('#puzzleTable');
    let box = tableWrapper.getBoundingClientRect();
    this.box = { x: box.left, y: box.top };
    if (e.touches && e.touches.length) {
      this.initY = Math.floor(
        (e.touches[0].clientY - this.box.y) / this.cellSize
      );
      this.initX = Math.floor(
        (e.touches[0].clientX - this.box.x) / this.cellSize
      );
    } else {
      this.initY = Math.floor((e.clientY - this.box.y) / this.cellSize);
      this.initX = Math.floor((e.clientX - this.box.x) / this.cellSize);
    }
    console.log('this.initX', this.initX, this.initY);
    if (this.initX >= this.noOfCols || this.initY >= this.noOfRows) {
      return;
    }
    this.isDrag = true;
    this.selector.style.display = 'block';
    let selector = this.selector;
    selector.style.left =
      this.initX * this.cellSize + this.borderWidth / 2 + 'px';
    selector.style.top =
      this.initY * this.cellSize + this.borderWidth / 2 + 'px';
    selector.style.width = this.cellSize - 1 + 'px';
    selector.style.height = this.cellSize - 10 + 'px';
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  onMouseMove = e => {
    e.preventDefault();
    let time = new Date().getTime();
    if (time - this.time < 200) {
      return;
    }
    this.time = time;

    this.mouseMoveUpdate(e.clientX, e.clientY);
  };

  mouseMoveUpdate = (x, y) => {
    const finalY = Math.floor((y - this.box.y) / this.cellSize);
    const finalX = Math.floor((x - this.box.x) / this.cellSize);
    if (
      finalY >= this.noOfRows ||
      finalX >= this.noOfCols ||
      finalY < 0 ||
      finalX < 0
    ) {
      return;
    }

    this.finalY = finalY;
    this.finalX = finalX;

    console.log('before', this.finalX, this.finalY);
    let obj = this.placeSelector(
      this.initX,
      this.initY,
      this.finalX,
      this.finalY
    );
    this.finalX = obj.finalX;
    this.finalY = obj.finalY;
    console.log('after', this.finalX, this.finalY);
  };

  placeSelector = (initX, initY, finalX, finalY, fromRender) => {
    let totalWidth = this.cellSize;

    let angle = Math.atan2(initY - finalY, finalX - initX) * (180 / Math.PI);
    angle = 360 - angle;
    angle = Math.round(angle / 45) * 45;

    let diffX = Math.abs(finalX - initX);
    let diffY = Math.abs(finalY - initY);

    let len;
    if (angle % 90 == 0) {
      len = Math.max(diffX, diffY);
      if (len == diffX) {
        finalY = initY;
      } else {
        finalX = initX;
      }
      len *= totalWidth;
      len += totalWidth;
    } else {
      let diag = Math.sqrt(2 * totalWidth * totalWidth);
      len = Math.min(diffX, diffY);
      if (len == diffX) {
        finalY = initY + ((finalY - initY) / Math.abs(finalY - initY)) * diffX;
      } else {
        finalX = initX + ((finalX - initX) / Math.abs(finalX - initX)) * diffY;
      }
      len *= diag;
      len += diag;
      len += this.borderWidth;
      len = len - totalWidth / 2;
    }
    if (fromRender) {
      return {
        width: len + 'px',
        height: this.cellSize,
        transform: 'rotate(' + angle + 'deg)',
        left: initX * this.cellSize,
        top: initY * this.cellSize,
        borderRadius: this.cellSize / 2,
        transformOrigin: this.cellSize / 2 + 'px ' + this.cellSize / 2 + 'px'
      };
    } else {
      let selector = this.selector;
      selector.style.width = len + 'px';
      selector.style.transform = 'rotate(' + angle + 'deg)';
      selector.style.borderRadius = this.cellSize / 2 + 'px';
      selector.style.transformOrigin =
        (this.cellSize - 1) / 2 + 'px ' + (this.cellSize - 9) / 2 + 'px';
      return { finalX, finalY };
    }
  };

  onMouseUp = e => {
    if (e.touches) {
      //this.mouseMoveUpdate(e.touches[0].clientX, e.touches[0].clientY);
    } else {
      this.mouseMoveUpdate(e.clientX, e.clientY);
    }
    this.isDrag = false;
    if (
      this.initX != this.initY ||
      this.finalX != this.finalY ||
      this.initX != this.finalX
    ) {
      console.log(
        'set it out: ',
        this.initX,
        this.initY,
        this.finalX,
        this.finalY
      );

      if (this.initX !== this.finalX || this.initY !== this.finalY) {
        this.props.selectedWord([
          this.initX,
          this.initY,
          this.finalX,
          this.finalY
        ]);
      } else {
        this.selector.style.display = 'none';
      }
    }
    if (!this.props.createMode) {
      this.selector.style.display = 'none';
    }
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.data.noOfRows != nextProps.data.noOfRows ||
      this.props.data.noOfCols != nextProps.data.noOfCols
    ) {
      this.selector.style.display = 'none';
    } /*else if (nextProps.po) {
      
    }*/
    this.noOfRows = nextProps.data.noOfRows;
    this.noOfCols = nextProps.data.noOfCols;
  }

  render() {
    let { table } = this.props.data;
    let max = Math.max(this.noOfRows, this.noOfCols);
    let index = config.limits.find(n => n >= max);
    index = config.limits.indexOf(index);
    const className = config.classNames[index];
    let cellSize = (this.cellSize = config.props[index].cellSize);
    let borderWidth = (this.borderWidth = config.props[index].borderWidth);

    let style = {
      width: cellSize,
      height: cellSize,
      fontSize: config.props[index].fontSize
    };

    let arr;
    let selectorStyle;
    if (
      (this.props.index !== 0 && !this.props.index) ||
      this.props.index == -1 ||
      this.props.pos === null
    ) {
      arr = [0, 0, 0, 0];
      selectorStyle = { display: 'none' };
    } else {
      arr = this.props.data.words[this.props.index].marker;
      selectorStyle = this.placeSelector(...arr, true);
    }
    let finished = '';
    if (this.props.createMode) {
      finished = this.props.data.words.map((item, i) => {
        let arr = item.marker;
        if (arr && arr.length == 4 && !(arr[0] == arr[2] && arr[1] == arr[3])) {
          let style = this.placeSelector(...arr, true);
          return <span className="selector" style={style} />;
        } else {
          return '';
        }
      });
    }

    return (
      <Wrapper onMouseDown={this.onMouseDown}>
        <div className="wrap" id="puzzleTable">
          {[...Array(this.noOfRows)].map((e, i) => {
            return (
              <div key={i}>
                {[...Array(this.noOfCols)].map((e, j) => {
                  let id = i + '~' + j;

                  return (
                    <span key={id} id={id} className={className}>
                      {table[i][j]}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div id="completedOnes">{finished}</div>
        <span
          id="selector"
          ref={n => (this.selector = n)}
          className="selector"
          style={selectorStyle}
        />
      </Wrapper>
    );
  }
}

export default WordSearchTable;
