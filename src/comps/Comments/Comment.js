import React, { Component } from 'react';
import styled from 'styled-components';
import CommentInput from './CommentInput';
import CommentsList from './CommentsList';

let padding = 0;
let editId = null;
let replyId = null;
const Wrapper = styled.div`
  padding-left: 30px;
  margin: 15px;
  & .unit {
    display: flex;
    background-color: var(--lightColor);
    padding: 5px;
    box-shadow: var(--shadow);
    & .comment {
      margin: 3px 15px;
    }
  }

  & .replyWrapper {
    background-color: var(--lightColor);
    padding: 5px;
    box-shadow: var(--shadow);
  }
`;

class Comment extends Component {
  constructor() {
    super();
    this.state = { isReply: false, isEdit: false };
  }
  edit = () => {
    this.setState({ isEdit: true });
  };

  reply = () => {
    console.log('Hello');
    this.setState({ isReply: true });
  };

  onSubmit = () => {};

  render() {
    var comment = this.props.comment;
    return (
      <Wrapper>
        <div>
          <div className="unit">
            <div className="profile">
              <div>
                <i className="fa fa-user"> </i>
                <span className="authorName">
                  {comment.userId.substr(0, comment.userId.indexOf('@'))}
                </span>
              </div>
              <div>
                {comment.userId === this.props.userId ? (
                  <button className="btn btn-primary" onClick={this.edit}>
                    Edit
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={this.reply}>
                    Reply
                  </button>
                )}
              </div>
            </div>
            {this.state.isEdit ? (
              <CommentInput
                onCancel={() =>
                  this.setState({ isReply: false, isEdit: false })
                }
                onSubmit={this.onSubmit}
              />
            ) : (
              <p className="comment">{comment.content}</p>
            )}
          </div>
          {this.state.isReply && (
            <div className="replyWrapper">
              <CommentInput
                onCancel={() => this.setState({ isReply: false })}
                onSubmit={this.onSubmit}
                replyTo={comment.commentId}
              />
            </div>
          )}
        </div>
        <CommentsList comments={comment.children} userId={this.props.userId} />
      </Wrapper>
    );
  }
}

export default Comment;
