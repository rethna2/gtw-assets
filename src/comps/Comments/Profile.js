import React from 'react';
import styled from 'styled-components';
import { LinkButton } from 'styled';

const ProfileStyled = styled.div`
  min-width: 100px;
  font-size: 11px;
  border-right: 1px solid var(--darkColor);
  padding: 3px;

  & .fa-user {
    font-size: 2.5em;
  }

  & .authorName {
    display: inline-block;
    margin-left: 7px;
  }
`;
const Profile = ({ comment, onEdit, onReply, userId }) => (
  <ProfileStyled>
    <div>
      <i className="fa fa-user"> </i>
      <span className="authorName">
        {comment.userId.indexOf('@') > 0
          ? comment.userId.substr(0, comment.userId.indexOf('@'))
          : comment.userId}
      </span>
    </div>
    <div>
      {comment.userId === userId ? (
        <LinkButton onClick={onEdit} data-id={comment._id}>
          Edit
        </LinkButton>
      ) : (
        <LinkButton
          className="btn btn-primary"
          onClick={onReply}
          data-id={comment._id}
        >
          Reply
        </LinkButton>
      )}
    </div>
  </ProfileStyled>
);

export default Profile;
