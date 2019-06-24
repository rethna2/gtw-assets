import React from 'react';
import Rater from '../core/Rater';
//import { rateContent } from 'model/content/actions';

class ContentRater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.rating || 0
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.rating || 0});
  }

  onStarClick = value => {
    this.setState({ value });
    return;
    this.props.dispatch(rateContent(value));
  };

  render() {
    console.log('ContentRater', this.props);
    return (
      <span
        style={{
          padding: 5,
          backgroundColor: 'white',
          boxShadow: 'var(--shadow)'
        }}
      >
        <span> Rate Me : </span>
        <Rater value={this.state.value} onStarClick={this.onStarClick} />
      </span>
    );
  }
}

export default ContentRater
