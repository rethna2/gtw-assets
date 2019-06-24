import React from 'react';
import { TextArea, ButtonBar, Button } from 'styled';
class CommentInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: props.content || ''
    };
  }

  onCancel = () => {
    this.setState({ comment: '' });
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  onSubmit = () => {
    if (this.state.comment.trim() === '') {
      return;
    }
    this.setState({
      comment: ''
    });
    this.props.onSubmit({
      content: this.state.comment
    });
  };

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <TextArea
          value={this.state.comment}
          onChange={e => this.setState({ comment: e.target.value })}
          placeholder="Enter your comment here..."
        />
        <ButtonBar>
          <Button onClick={this.onCancel}>Cancel</Button>
          <Button
            onClick={this.onSubmit}
            updating={this.props.callInProg === 'comment'}
            primary
          >
            Submit
          </Button>
        </ButtonBar>
      </div>
    );
  }
}

export default CommentInput;
