import React from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { Loader, Section, Button } from 'styled';
import styled from 'styled-components';
import {
  fetchComments,
  commentContent,
  updateCommentContent
} from 'model/content/actions';
import Profile from './Profile';
import { isSmallScreen } from 'utils';

const Wrapper = styled.div`
  padding-left: 30px;
  margin: 15px 0;
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

let comments = [
  {
    content: 'First Comment',
    userId: 'rethna',
    _id: '1',
    children: [
      {
        content: 'First sub Comment',
        userId: 'ganesh',
        _id: '2',
        children: []
      },
      {
        content: 'Second sub Comment',
        userId: 'naveen',
        _id: '3',
        children: []
      }
    ]
  },
  {
    content: 'Second Comment',
    userId: 'rethna',
    _id: '4',
    children: []
  },
  {
    content: 'Third Comment',
    userId: 'rethna2@gmail.com',
    _id: '5',
    children: []
  }
];

class Comments extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 3,
      commentsVisible: false,
      editId: null,
      replyId: null
    };
  }

  showComments = () => {
    this.setState({ commentsVisible: true });
    this.props.dispatch(fetchComments());
  };

  // three cases : direct comment, edit, reply
  onSubmit = (obj, isDirectComment) => {
    if (this.state.replyId || isDirectComment) {
      if (this.state.replyId) {
        obj = { ...obj, replyTo: this.state.replyId };
      }
      this.props.dispatch(commentContent(obj));
    } else if (this.state.editId) {
      this.props.dispatch(
        updateCommentContent({ ...obj, commentId: this.state.editId })
      );
    }
    this.setState({ editId: null, replyId: null });
  };

  onCancel = () => {
    this.setState({ editId: null, replyId: null });
  };

  onEditClick = e => {
    const id = e.target.dataset.id;
    console.log('id', id, e.target.dataset, e.target);
    if (!id) {
      return;
    }
    this.setState({ editId: id, replyId: null });
  };

  onReplyClick = e => {
    const id = e.target.dataset.id;
    console.log('id', id, e.target.dataset, e.target);
    if (!id) {
      return;
    }
    this.setState({ replyId: id, editId: null });
  };

  displayNest = comments => (
    <React.Fragment>
      {comments.map((comment, i) => (
        <Wrapper>
          <div className="unit">
            <Profile
              comment={comment}
              onEdit={this.onEditClick}
              onReply={this.onReplyClick}
              userId={this.props.userId}
            />

            {this.state.editId === comment._id ? (
              <CommentInput
                onCancel={this.onCancel}
                onSubmit={this.onSubmit}
                content={comment.content}
              />
            ) : (
              <p className="comment">{comment.content}</p>
            )}
          </div>
          {this.state.replyId === comment._id && (
            <div className="replyWrapper">
              <CommentInput onCancel={this.onCancel} onSubmit={this.onSubmit} />
            </div>
          )}
          {comment.children.length > 0 && this.displayNest(comment.children)}
        </Wrapper>
      ))}
    </React.Fragment>
  );

  render() {
    if (!this.props.isLoggedIn || isSmallScreen()) {
      return null;
    }
    if (!this.state.commentsVisible) {
      return (
        <div style={{ margin: 20 }}>
          <Button primary onClick={this.showComments}>
            Show Comments
          </Button>
        </div>
      );
    } else {
      return (
        <Section title="Comments" style={{ width: 600 }}>
          {!this.props.comments ? (
            <Loader />
          ) : (
            <div>
              <CommentInput
                callInProg={this.props.callInProg}
                onAddComment={this.onAddComment}
                onSubmit={obj => this.onSubmit(obj, true)}
              />
              {this.displayNest(this.props.comments)}
            </div>
          )}
        </Section>
      );
    }
  }
}

export default connect(state => ({
  isLoggedIn: !!state.user.token,
  comments: state.content.comments ? state.content.comments.toJS() : null,
  userId: state.user._id,
  callInProg: state.content.callInProg
}))(Comments);
