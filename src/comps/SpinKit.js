import PropTypes from 'prop-types';
import React from 'react'; // eslint-disable-line import/no-extraneous-dependencies
import cx from 'classnames';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-block;
  margin-left: 5px;
  & .sk-spinner {
    color: white;
  }

  & .sk-spinner > div {
    background-color: currentColor;
    display: inline-block;
    margin-left: 3px;
  }

  & .sk-three-bounce {
    height: 8px;
  }

  & .sk-three-bounce > div {
    width: 8px;
    height: 8px;
    background-color: currentColor;
    border-radius: 100%;
    display: inline-block;

    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out;
    animation: sk-bouncedelay 1.4s infinite ease-in-out;
    /* Prevent first frame from flickering when animation starts */
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  & .sk-three-bounce > div:first-child {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  & .sk-three-bounce > div:nth-child(2) {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    40% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
`;

const noFadeInWarning =
  "Deprecation Warning (react-spinkit): noFadeIn prop should be replaced with fadeIn='none'";

class Spinner extends React.Component {
  constructor(props) {
    if (props.noFadeIn) {
      console.warn(noFadeInWarning); // eslint-disable-line no-console
    }
    super(props);
    this.displayName = 'SpinKit';
  }

  render() {
    const spinnerInfo = { className: 'sk-three-bounce', divCount: 3 };
    const classes = cx({
      'sk-fade-in': this.props.fadeIn === 'full' && !this.props.noFadeIn,
      'sk-fade-in-half-second':
        this.props.fadeIn === 'half' && !this.props.noFadeIn,
      'sk-fade-in-quarter-second':
        this.props.fadeIn === 'quarter' && !this.props.noFadeIn,
      'sk-spinner': !this.props.overrideSpinnerClassName,
      [this.props.overrideSpinnerClassName]: !!this.props
        .overrideSpinnerClassName,
      [this.props.className]: !!this.props.className,
      [spinnerInfo.className || this.props.name]: true
    });

    const props = Object.assign({}, this.props);
    delete props.name;
    delete props.fadeIn;
    delete props.noFadeIn;
    delete props.overrideSpinnerClassName;
    delete props.className;

    if (this.props.color) {
      props.style = props.style
        ? { ...props.style, color: this.props.color }
        : { color: this.props.color };
    }

    return (
      <Wrapper>
        <div {...props} className={classes}>
          {[...Array(spinnerInfo.divCount)].map((_, idx) => <div key={idx} />)}
        </div>
      </Wrapper>
    );
  }
}

Spinner.propTypes = {
  name: PropTypes.string.isRequired,
  noFadeIn: PropTypes.bool,
  fadeIn: PropTypes.oneOf(['full', 'half', 'quarter', 'none']),
  overrideSpinnerClassName: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string
};

Spinner.defaultProps = {
  name: 'three-bounce',
  noFadeIn: false,
  fadeIn: 'full',
  overrideSpinnerClassName: ''
};

export default Spinner;
