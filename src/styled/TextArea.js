import styled, { css } from 'styled-components';
import React from 'react';
import { findDOMNode } from 'react-dom';

const TextAreaWrapper = styled.div`
  margin: 10px 0;

  ${props =>
    props.sameLine &&
    css`
      display: flex;
      margin-right: 50px;
    `} & textarea {
    border: none;
    outline: none;
    border-bottom: 1px solid ${props => (props.error ? '#f00' : '#ccc')};
    padding: 2px 5px;
    background-color: inherit;
    resize: none;
    display: block;
    width: 100%;
    line-height: 16px;
  }

  & label {
    display: block;
    margin-bottom: 5px;
    white-space: nowrap;
    margin-right: 10px;
  }

  & .errorLable {
    font-size: 10px;
    color: #de1c1c;
  }
`;

/*
export const TextArea = ({error, label, ...otherProps}) => (
  <TextAreaWrapper error={error} style={otherProps.style}>
    {
      !!label && <label>{label}</label>
    }
    <textarea rows="1" {...otherProps} />
    {
      error  && <label className="errorLable">{error}</label>
    }
  </TextAreaWrapper>
)
*/

class TextArea extends React.Component {
  constructor() {
    super();
    this.inputRef = null;
  }
  onKeyUp = (...args) => {
    if (this.inputRef.scrollTop != 0) {
      let adjustedHeight = this.inputRef.scrollHeight + 3;
      if (adjustedHeight > 200) {
        adjustedHeight = 200;
      }
      this.inputRef.style.height = adjustedHeight + 'px';
    }
  };

  componentDidUpdate() {
    let adjustedHeight = this.calculateHeight() + 3;
    if (adjustedHeight > 200) {
      adjustedHeight = 200;
    }
    this.inputRef.style.height = adjustedHeight + 'px';
  }

  calculateContentHeight = (ta, scanAmount) => {
    var origHeight = ta.style.height,
      height = ta.offsetHeight,
      scrollHeight = ta.scrollHeight,
      overflow = ta.style.overflow;
    if (height >= scrollHeight) {
      ta.style.height = height + scanAmount + 'px';
      ta.style.overflow = 'hidden';
      if (scrollHeight < ta.scrollHeight) {
        while (ta.offsetHeight >= ta.scrollHeight) {
          ta.style.height = (height -= scanAmount) + 'px';
        }
        while (ta.offsetHeight < ta.scrollHeight) {
          ta.style.height = height++ + 'px';
        }
        ta.style.height = origHeight;
        ta.style.overflow = overflow;
        return height;
      }
    } else {
      return scrollHeight;
    }
  };

  calculateHeight = () => {
    let ta = findDOMNode(this.inputRef);
    let style = window.getComputedStyle
        ? window.getComputedStyle(ta)
        : ta.currentStyle,
      taLineHeight = parseInt(style.lineHeight, 10),
      taHeight = this.calculateContentHeight(ta, taLineHeight),
      numberOfLines = Math.ceil(taHeight / taLineHeight);

    return taHeight;
  };

  render() {
    const { error, label, ...otherProps } = this.props;
    return (
      <TextAreaWrapper
        error={error}
        sameLine={otherProps.sameLine}
        style={otherProps.style}
      >
        {!!label && <label>{label}</label>}
        <textarea
          ref={n => {
            this.inputRef = n;
          }}
          rows="1"
          {...otherProps}
        />
        {error && <label className="errorLable">{error}</label>}
      </TextAreaWrapper>
    );
  }
}

export default TextArea;
