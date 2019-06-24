import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  min-height: 60px;
  box-sizing: border-box;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  /*background:linear-gradient(to right,#1d9d74, #006674);  */
  background-color: var(--darkColor);
  border-bottom: 1px solid #eee;
  position: relative;
  z-index: 100;
  color: #fff;
  font-family: 'Coiny', sans-serif;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & .pageTitle {
    font-size: 24px;
    font-family: 'Coiny';
    padding-left: 50px;
  }

  & .title {
    /*font-family:'Great Vibes', cursive, sans-serif;*/
    padding-top: 25px;
    letter-spacing: 3px;
    margin-left: 5px;
    margin-top: -10px;
    font-size: 30px;
    text-decoration: none;
  }

  & a {
    color: var(--lightColor);
  }

  & nav {
    padding-top: 25px;
    padding-left: 15px;
    padding-bottom: 15px;
    a {
      text-decoration: none;
      font-size: 18px;
      display: inline-block;
      margin: 0 30px 0 0;
      &:hover {
        color: var(--darkHColor);
      }
    }
  }

  @media print {
    display: none;
  }
`;

class Header extends Component {
  signOut = () => {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // this.props.dispatch(logout());
  };

  render() {
    //setTimeout(() => new Vivus("svgLogo", {duration:200, type:'oneByOne'}), 500)
    let title = '';
    console.log('this.props.title', this.props);
    let text = ''; //this.props.routes[1] && this.props.routes[1].title;
    if (text) {
      title = (
        <span className="pageTitle">
          {' '}
          <i className="fa fa-arrow-circle-right" aria-hidden="true" /> {text}{' '}
        </span>
      );
    }

    let menu = '';
    const isLoggedIn = this.props.isLoggedIn;
    if (isLoggedIn) {
      menu = (
        <nav>
          <a href="/">Home </a>
          <a href="/dashboard">Dashboard </a>
          <a href="/signin">
            <span onClick={this.signOut}>Sign Out </span>
          </a>
        </nav>
      );
    } else {
      menu = (
        <nav>
          <a href="/">Home </a>
          <a href="/signin">Sign In </a>
        </nav>
      );
    }
    return (
      <Wrapper>
        <div>
          <a href="/">
            <div className="title">
              <span className="weight" style={{ letterSpacing: -1 }}>
                <span style={{ fontSize: 22 }}>goto</span>WISDOM
              </span>
            </div>
          </a>
          {title}
        </div>
        {menu}
      </Wrapper>
    );
  }
}

export default Header;
