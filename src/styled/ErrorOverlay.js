import React from 'react';
import styled from 'styled-components';
//import { setError } from 'model/user/actions';

const OverlayWrapper = styled.div`
  opacity: 0;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  transform: scale(0);
  transition: all 0.2s;
  color: #2d3237;
  &.active {
    transform: scale(1);
    opacity: 1 !important;
  }

  & .content {
    pointer-events: auto;
    margin: 200px auto;
    min-height: 200px;
    width: 400px;
    background-color: #f6f6f8;
    border: 3px solid #cd5d5d;
    border-radius: 5px;
  }

  & .overlayClose {
    cursor: pointer;
  }

  & .title {
    font-size: 24px;
    font-family: 'Avenir-Medium', sans-serif;
    border-bottom: 1px solid #eee;
    background-color: #cd5d5d;
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
  }
`;

class ErrorOverlay extends React.Component {
  render() {
    const { title, children, ...otherProps } = this.props;
    return (
      <OverlayWrapper {...otherProps}>
        <div className="content">
          <div className="title" onMouseDown={this.panelDragStart}>
            <div>Error!!!</div>
            <div>
              <i
                className="fa fa-times overlayClose"
                onClick={() => {setError && this.props.dispatch(setError(null))}}
              >
                {' '}
              </i>
            </div>
          </div>
          <div style={{ margin: 30 }}>{children}</div>
        </div>
      </OverlayWrapper>
    );
  }
}

export default ErrorOverlay;
