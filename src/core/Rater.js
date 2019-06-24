import React, { Component } from 'react';
import cx from 'classnames';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

class StarRatingComponent extends Component {
  /*
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    editing: PropTypes.bool,
    starCount: PropTypes.number,
    starColor: PropTypes.string,
    onStarClick: PropTypes.func,
    renderStarIcon: PropTypes.func,
    renderStarIconHalf: PropTypes.func
  };
  */
  static defaultProps = {
    starCount: 5,
    value: 0,
    editing: true,
    starColor: 'var(--darkColor)',
    emptyStarColor: 'var(--lightColor)'
  };

  constructor(props) {
    super();
  }

  onChange(value) {
    const { editing } = this.props;
    if (!editing) {
      return;
    }
    //this.setState({ value });
  }

  onStarClick(index, value, name) {
    const { onStarClick, editing } = this.props;

    if (!editing) {
      return;
    }

    onStarClick && onStarClick(index, value, name);
  }

  renderStars() {
    const { name, starCount, starColor, emptyStarColor, editing } = this.props;
    const { value } = this.props;
    const starStyles = (i, value) => ({
      float: 'right',
      cursor: editing ? 'pointer' : 'default',
      color: value >= i ? starColor : emptyStarColor
    });
    const radioStyles = {
      display: 'none',
      position: 'absolute',
      marginLeft: -9999
    };

    // populate stars
    let starNodes = [];

    for (let i = starCount; i > 0; i--) {
      const id = name + '_' + i;
      const starNodeInput = (
        <input
          key={id}
          style={radioStyles}
          className="dv-star-rating-input"
          type="radio"
          name={name}
          id={id}
          value={i}
          checked={value === i}
          onChange={this.onChange.bind(this, i, name)}
        />
      );
      const starNodeLabel = (
        <label
          key={'label_' + id}
          style={starStyles(i, value)}
          className={
            'dv-star-rating-star ' +
            (value >= i
              ? 'dv-star-rating-full-star'
              : 'dv-star-rating-empty-star')
          }
          htmlFor={id}
          onClick={this.onStarClick.bind(this, i, value, name)}
        >
          {this.renderIcon(i, value, name)}
        </label>
      );

      starNodes.push(starNodeInput);
      starNodes.push(starNodeLabel);
    }

    return starNodes;
  }

  renderIcon(index, value, name) {
    const { renderStarIcon, renderStarIconHalf } = this.props;

    if (
      typeof renderStarIconHalf === 'function' &&
      Math.ceil(value) === index &&
      value % 1 !== 0
    ) {
      return renderStarIconHalf(index, value, name);
    }

    if (typeof renderStarIcon === 'function') {
      return renderStarIcon(index, value, name);
    }

    return <i style={{ fontStyle: 'normal' }}>&#9733;</i>;
  }

  render() {
    const { editing, className } = this.props;
    const classes = cx(
      'dv-star-rating',
      {
        'dv-star-rating-non-editable': !editing
      },
      className
    );

    return <Wrapper className={classes}>{this.renderStars()}</Wrapper>;
  }
}

export default StarRatingComponent;
