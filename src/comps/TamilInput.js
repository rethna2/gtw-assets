import React from 'react';
import styled from 'styled-components';
import { Overlay } from '../styled';

const StyledWrapper = styled.div`
    font-family: var(--font1);
    display: flex;
    text-align: center;
    justify-content: space-around;

    & .wrapper {
      display: flex;
      flex-wrap: wrap;

    }

    & li {
      cursor: pointer;
      border: 1px solid $darkColor;
      padding: 10px;
      font-size: 1.5em;
      list-style-type:none;
      &:hover {
        background-color: white;
      }
    }
  }
`;

class TamilInput extends React.Component {
  input1Click = e => {
    if (e.target.tagName != 'LI') {
      return;
    }
    var text = e.target.innerHTML.trim();
    if (text == 'அ') {
      var dom = document.getElementById('vowels').cloneNode(true);
    } else {
      var dom = document.getElementById('partialWords').cloneNode(true);
      var allTd = dom.querySelectorAll('li');
      [].forEach.call(allTd, function(td) {
        if (td.getAttribute('data-val') != 'close') {
          let str = text + td.getAttribute('data-val');
          td.innerHTML = str;
        }
      });
    }
    document.getElementById('tempTable').innerHTML = dom.innerHTML;
    document.getElementById('consos').style.display = 'none';
  };

  input2Click = e => {
    console.log(e.target.innerHTML);
    this.closeSecondPopup();
    if (e.target.tagName != 'LI') {
      return;
    }
    const input = e.target.innerText.trim();
    if (input !== '') {
      // not on fa-times
      this.props.onPick(input);
    }
  };

  closeSecondPopup = () => {
    document.getElementById('tempTable').innerHTML = '';
    document.getElementById('consos').style.display = 'flex';
  };

  render() {
    return (
      <StyledWrapper>
        <div id="consos" className="wrapper" onClick={this.input1Click}>
          <li data-val="&#x0B85;"> &#x0B85; </li>
          <li data-val="&#x0B95;">&#x0B95; </li>
          <li data-val="&#x0B99;">&#x0B99; </li>
          <li data-val="&#x0B9A;">&#x0B9A;</li>
          <li data-val="&#x0B9E;">&#x0B9E;</li>
          <li data-val="&#x0B9F;">&#x0B9F;</li>
          <li data-val="&#x0BA3;">&#x0BA3;</li>
          <li data-val="&#x0BA4;">&#x0BA4;</li>
          <li data-val="&#x0BA8;">&#x0BA8;</li>
          <li data-val="&#x0BAA;">&#x0BAA;</li>
          <li data-val="&#x0BAE;">&#x0BAE;</li>
          <li data-val="&#x0BAF;">&#x0BAF;</li>
          <li data-val="&#x0BB0;">&#x0BB0;</li>
          <li data-val="&#x0BB2;">&#x0BB2;</li>
          <li data-val="&#x0BB5;">&#x0BB5;</li>
          <li data-val="&#x0BB4;">&#x0BB4;</li>
          <li data-val="&#x0BB3;">&#x0BB3;</li>
          <li data-val="&#x0BB1;">&#x0BB1;</li>
          <li data-val="&#x0BA9;">&#x0BA9;</li>
        </div>

        <div id="tempTable" className="wrapper" onClick={this.input2Click} />
        <div style={{ display: 'none' }}>
          <div id="partialWords" className="wrapper">
            <li data-val="&#x0Bcd;">&#x0Bcd;</li>
            <li data-val="" />
            <li data-val="&#x0BBE;">&#x0BBE;</li>
            <li data-val="&#x0BBF;">&#x0BBF;</li>
            <li data-val="&#x0BC0;">&#x0BC0;</li>
            <li data-val="&#x0BC1;">&#x0BC1;</li>
            <li data-val="&#x0BC2;">&#x0BC2;</li>
            <li data-val="&#x0BC6;">&#x0BC6;</li>
            <li data-val="&#x0BC7;">&#x0BC7;</li>
            <li data-val="&#x0BC8;">&#x0BC8;</li>
            <li data-val="&#x0BCA;">&#x0BCA;</li>
            <li data-val="&#x0BCB;">&#x0BCB;</li>
            <li colSpan="2" data-val="&#x0BCC;">
              &#x0BCC;
            </li>
            <li data-val="close">
              <i className="fa fa-times"> </i>
            </li>
          </div>

          <div id="vowels" className="wrapper">
            <li data-val="&#x0B85;">&#x0B85;</li>
            <li data-val="&#x0B86;">&#x0B86;</li>
            <li data-val="&#x0B87;">&#x0B87;</li>
            <li data-val="&#x0B88;">&#x0B88;</li>
            <li data-val="&#x0B89;">&#x0B89;</li>
            <li data-val="&#x0B8A;">&#x0B8A;</li>
            <li data-val="&#x0B8E;">&#x0B8E;</li>
            <li data-val="&#x0B8F;">&#x0B8F;</li>
            <li data-val="&#x0B90;">&#x0B90;</li>
            <li data-val="&#x0B92;">&#x0B92;</li>
            <li data-val="&#x0B93;">&#x0B93;</li>
            <li data-val="&#x0B94;">&#x0B94;</li>
            <li>&#x0B83;</li>
          </div>
        </div>
      </StyledWrapper>
    );
  }
}

export const TamilInputWrapper = ({ children, isMobile }) => {
  if (!isMobile) {
    return (
      <Overlay
        className="active"
        width="300"
        height="300"
        title="Tamil Input"
        modal={false}
        left="800"
      >
        {children}
      </Overlay>
    );
  } else {
    return (
      <div
        style={{
          display: 'fixed',
          bottom: 0,
          backgroundColor: 'white'
        }}
      >
        {children}
      </div>
    );
  }
};

export default TamilInput;
