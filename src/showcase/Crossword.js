import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Timer from '../comps/Timer';
//import Comments from '../comps/Comments';
import TamilInput, { TamilInputWrapper } from '../comps/TamilInput';
import EnglishInput from '../comps/EnglishInput';
import Styled from './Crossword-styled';
//import { submitShowcase } from 'model/content/actions';
import { Button, ButtonBar, Section, Overlay, Loader } from '../styled';
import { getTamilWordArr, isSmallScreen } from '../utils';
import Rater from '../comps/Rater';

class CrosswordShowcase extends Component {
  constructor(props) {
    super(props);
    this.across = <div> Loading... </div>;
    this.down = <div> Loading... </div>;
    this.across2 = '';
    this.down2 = '';
    this.cellWidth = 40;
    this.submitDone = false;
    this.previewMode = false;
    this.firstTime = true;
    this.state = {
      complete: false,
      showComplete: false,
      rating: 0,
      showButtonBar: false
    };
    this.ans = {};
    this.DIR_DATA = ['across', 'down', 'across2', 'down2'];
    this.direction = 0; // 0 - LR, 1 - TB, 2 - RL, 3 - BT

    this.boxID = null;
    console.log('props.content', props.content);
    this.loadInitData(props.content.content);
    this.sortHints(props.content.content);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onKeyUp);
    console.log('content', JSON.stringify(this.props.content));
    console.log('userData', JSON.stringify(this.props.userData));
    setTimeout(() => {
      this.labelPositions();
      this.drawBlack();
      this.fillSavedValue();
    }, 100);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyUp);
  }

  sortHints = data => {
    this.across = data.across
      .sort((a, b) => (a.position > b.position ? 1 : -1))
      .map((item, i) => {
        return (
          <div
            className="hintItem"
            id={'across~' + i}
            onClick={this.onClueClick}
          >
            <div className="posLabel"> {item.position} </div>
            <div className="hintTxt">
              {' '}
              {item.hint + '(' + item.length + ')'}{' '}
            </div>
          </div>
        );
      });

    this.down = data.down
      .sort((a, b) => (a.position > b.position ? 1 : -1))
      .map((item, i) => {
        return (
          <div className="hintItem" id={'down~' + i} onClick={this.onClueClick}>
            <div className="posLabel"> {item.position} </div>
            <div className="hintTxt">
              {' '}
              {item.hint + '(' + item.length + ')'}{' '}
            </div>
          </div>
        );
      });

    this.across2 = data.across2.map((item, i) => {
      return (
        <div
          className="hintItem"
          id={'across2~' + i}
          onClick={this.onClueClick}
        >
          <div className="posLabel"> {item.position} </div>
          <div className="hintTxt"> {item.hint + '(' + item.length + ')'} </div>
        </div>
      );
    });

    if (this.across2 != '') {
      this.across2 = (
        <div>
          <h4 className="clueHeader">Right To Left:</h4>
          <div>{this.across2}</div>
        </div>
      );
    }

    this.down2 = data.down2.map((item, i) => {
      return (
        <div className="hintItem" id={'down2~' + i} onClick={this.onClueClick}>
          <div className="posLabel"> {item.position} </div>
          <div className="hintTxt"> {item.hint + '(' + item.length + ')'} </div>
        </div>
      );
    });

    if (this.down2 != '') {
      this.down2 = (
        <div>
          <h4 className="clueHeader">Bottom To Top::</h4>
          <div>{this.down2}</div>
        </div>
      );
    }
  };

  loadInitData = data => {
    if (data.words && data.words.length != 0) {
      let across = [];
      let down = [];
      let across2 = [];
      let down2 = [];
      let positions = [];
      for (var i = 0; i < data.words.length; i++) {
        let m = data.words[i].marker;
        positions.push(m.x * 100 + m.y);
        //positions.push(Number(data.words[i].marker.join("")));
      }
      console.log('positions', positions);
      positions = positions.sort((a, b) => (a > b ? 1 : -1));
      positions = positions.filter((item, pos, a) => {
        return !pos || item != a[pos - 1];
      });
      console.log('positions2', positions);
      let pos = [];
      for (var i = 0; i < positions.length; i++) {
        pos.push([i + 1, Math.floor(positions[i] / 100), positions[i] % 100]);
      }

      for (var i = 0; i < data.words.length; i++) {
        data.words[i].length = data.words[i].word
          .split(' ')
          .map(
            v => (data.language === 'ta' ? getTamilWordArr(v).length : v.length)
          )
          .join(',');

        data.words[i].word = data.words[i].word.toUpperCase();
        for (var j = 0; j < pos.length; j++) {
          if (
            data.words[i].marker.x == pos[j][1] &&
            data.words[i].marker.y == pos[j][2]
          ) {
            data.words[i].position = pos[j][0];
            break;
          }
        }
        switch (data.words[i].direction) {
          case 'across':
            across.push(data.words[i]);
            break;
          case 'down':
            down.push(data.words[i]);
            break;
          case 'across2':
            across2.push(data.words[i]);
            break;
          case 'down2':
            down2.push(data.words[i]);
            break;
        }
        delete data.words[i].direction;
      }

      //delete data.words;
      data.across = across;
      data.down = down;
      data.across2 = across2;
      data.down2 = down2;
      data.positions = pos;
      const minCellWidth = Math.floor(screen.width / data.noOfCols);
      if (minCellWidth < this.cellWidth) {
        this.cellWidth = minCellWidth;
      } else if (data.noOfCols > 10) {
        this.cellWidth = 30;
      }
    }
    this.state = {
      ...this.state,
      data: data
    };
    setTimeout(() => {
      const id = data.words[0].marker.y + '~' + data.words[0].marker.x;
      const dom = document.getElementById(id);
      if (dom) {
        dom.click();
      }
    }, 1000);
  };

  labelPositions() {
    let positions = this.state.data.positions;
    for (var i = 0; i < positions.length; i++) {
      var arr = positions[i];
      var id = arr[2] + '~' + arr[1];
      document.getElementById(id).innerHTML =
        '<span class = "pos">' + arr[0] + '<span>';
    }
  }

  check = type => {
    let mistakeCount = 0;
    let emptyCount = 0;
    let userAns = {};
    for (let i in this.ans) {
      let node = document.getElementById(i).cloneNode(true);
      let pos = node.querySelector('.pos');
      if (pos) {
        pos.parentNode.removeChild(pos);
      }
      var text = node.innerHTML;
      userAns[i] = text.trim();
      if (text.trim() != '') {
        if (text !== this.ans[i]) {
          if (type == 'check') {
            document.getElementById(i).style.backgroundColor = '#f99';
          }
          mistakeCount++;
        }
      } else {
        emptyCount++;
      }
    }
    if (type == 'check' || type == 'keyup') {
      if (mistakeCount === 0 && emptyCount === 0) {
        this.setState({ complete: true, showComplete: true });
      }
      return;
    }
    let all = ['across', 'down', 'across2', 'down2'];
    let total = 0;
    let incorrect = 0;
    const wordMap = {};
    for (var k = 0; k < all.length; k++) {
      let across = this.state.data[all[k]];
      total += across.length;
      for (var i = 0; i < across.length; i++) {
        wordMap[across[i].word] = true;
        for (var j = 0; j < across[i].ids.length; j++) {
          if (userAns[across[i].ids[j]] != this.ans[across[i].ids[j]]) {
            wordMap[across[i].word] = false;
            incorrect++;
            break;
          }
        }
      }
    }

    if (type == 'save') {
      return {
        userAns
      };
    } else if (type == 'submit') {
      return {
        userAns,
        mistakeCount,
        emptyCount,
        incorrect,
        total,
        wordMap,
        isSubmit: true
      };
    }
  };

  checkWord = () => {
    let dataAttr = this.DIR_DATA[this.direction];
    let ids = this.state.data[dataAttr][this.currentID].ids;
    for (let i = 0; i < ids.length; i++) {
      let node = document.getElementById(ids[i]).cloneNode(true);
      let pos = node.querySelector('.pos');
      if (pos) {
        pos.parentNode.removeChild(pos);
      }
      if (this.ans[ids[i]] !== node.innerHTML.trim()) {
        document.getElementById(ids[i]).style.backgroundColor = '#f99';
      }
    }
  };

  giveUp = () => {
    for (var i in this.ans) {
      var $box = document.getElementById(i);
      var str = '';
      if ($box.querySelector('.pos')) {
        str = $box.querySelector('.pos').outerHTML;
      }
      $box.innerHTML = str + this.ans[i];
      $box.style.backgroundColor = 'var(--lightColor2)';
    }
    this.setState({ showButtonBar: false });
  };

  giveUpWord = () => {
    if (this.currentID) {
      let dataAttr = this.DIR_DATA[this.direction];
      let ids = this.state.data[dataAttr][this.currentID].ids;
      for (let i = 0; i < ids.length; i++) {
        var $box = document.getElementById(ids[i]);
        var str = '';
        if ($box.querySelector('.pos')) {
          str = $box.querySelector('.pos').outerHTML;
        }
        $box.innerHTML = str + this.ans[ids[i]];
      }
    }
    this.setState({ showButtonBar: false });
  };

  reset = () => {
    for (var i in this.ans) {
      var $box = document.getElementById(i);
      var str = '';
      if ($box.querySelector('.pos')) {
        str = $box.querySelector('.pos').outerHTML;
      }
      $box.innerHTML = str;
      $box.style.backgroundColor = 'var(--lightColor2)';
    }
    this.setState({ showButtonBar: false });
  };

  submit = () => {
    if (this.props.content.assessment) {
      this.submitAssessment();
      return;
    }
    const data = this.check('submit');
    this.props.dispatch(
      submitShowcase({
        userData: data,
        title: this.props.content.title,
        contentType: 'crossword',
        id: this.props.content._id.substr(
          this.props.content._id.lastIndexOf('/') + 1
        )
      })
    );
    this.setState({ showButtonBar: false });
  };

  submitAssessment = () => {
    let userAns = {};
    for (let i in this.ans) {
      let node = document.getElementById(i).cloneNode(true);
      let pos = node.querySelector('.pos');
      if (pos) {
        pos.parentNode.removeChild(pos);
      }
      var text = node.innerHTML;
      userAns[i] = text.trim();
    }
    this.props.dispatch(
      submitShowcase({
        userData: { userAns },
        contentType: 'crossword',
        id: this.props.content._id.substr(
          this.props.content._id.lastIndexOf('/') + 1
        ),
        assessment: true
      })
    );
    this.setState({ showButtonBar: false });
  };

  drawBlack() {
    //$("#puzzleWrapper td").css("background-color", "#304269")
    let that = this;
    let all = ['across', 'down', 'across2', 'down2'];
    for (var k = 0; k < all.length; k++) {
      let across = this.state.data[all[k]];
      for (var i = 0; i < across.length; i++) {
        var pos = getId(across[i].position);
        var length = checkMultiword(across[i].length);
        var ids = [];
        let word = across[i].word
          .split(' ')
          .map(v => v.trim())
          .join('');
        if (this.state.data.language == 'ta') {
          word = getTamilWordArr(word);
        } else {
          word = word.split('');
        }
        for (var j = 0; j < word.length; j++) {
          let id;
          switch (all[k]) {
            case 'across':
              id = pos.y + '~' + Number(pos.x + j);
              break;
            case 'down':
              id = Number(pos.y + j) + '~' + pos.x;
              break;
            case 'across2':
              id = pos.y + '~' + Number(pos.x - j);
              break;
            case 'down2':
              id = Number(pos.y - j) + '~' + pos.x;
              break;
          }
          ids.push(id);
          if (across[i].word) {
            this.ans[id] = word[j];
            document.getElementById(id).setAttribute('data-value', 'active'); //word[j]);
          }
          document.getElementById(id).setAttribute('data-' + all[k], i);
          document.getElementById(id).classList.add('placeHolder');
          document.getElementById(id).style.backgroundColor =
            'var(--lightColor2)';
        }
        across[i].ids = ids;
      }
    }

    function getId(pos) {
      let positions = that.state.data.positions;
      for (let i = 0; i < positions.length; i++) {
        if (pos == positions[i][0]) {
          return {
            x: positions[i][1],
            y: positions[i][2]
          };
        }
      }
    }

    function checkMultiword(length) {
      if (isNaN(length)) {
        let len = length.split(',');
        length = 0;
        for (let k = 0; k < len.length; k++) {
          length += Number(len[k]);
        }
      }
      return length;
    }
  }

  fillSavedValue = () => {
    if (
      !this.props.userData ||
      !this.props.userData.userData ||
      !this.props.userData.userData.userAns
    ) {
      return;
    }

    const userAns = this.props.userData.userData.userAns;
    for (let i in userAns) {
      var $box = document.getElementById(i);
      var str = '';
      if ($box.querySelector('.pos')) {
        str = $box.querySelector('.pos').outerHTML;
      }
      $box.innerHTML = str + userAns[i];
    }
  };

  closeGoodJob = shouldSubmit => {
    this.setState({ showComplete: false });
    if (shouldSubmit) {
      this.submit();
    }
  };

  onClueClick = e => {
    let id = e.currentTarget.id;
    var prev = document
      .getElementById('clueWrapper')
      .querySelector('.selected');
    if (prev) {
      prev.classList.remove('selected');
    }
    e.currentTarget.classList.add('selected');
    let direction = id.substr(0, id.indexOf('~'));
    id = Number(id.substr(id.indexOf('~') + 1));
    var box = this.state.data[direction][id].ids[0];
    if (this.boxID) {
      let dataAttr = this.DIR_DATA[this.direction];
      let ids = this.state.data[dataAttr][this.currentID].ids;
      for (let i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).style.backgroundColor =
          'var(--lightColor2)';
      }
      this.boxID = null;
    }
    switch (direction) {
      case 'across':
        this.direction = 0;
        break;
      case 'down':
        this.direction = 1;
        break;
      case 'across2':
        this.direction = 2;
        break;
      case 'down2':
        this.direction = 3;
        break;
    }
    document.getElementById(box).click();
  };

  onCellClick = e => {
    if (!this.boxID) {
      this.boxID = e.target.id;
    } else {
      let dataAttr = this.DIR_DATA[this.direction];
      let ids = this.state.data[dataAttr][this.currentID].ids;
      for (let i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).style.backgroundColor =
          'var(--lightColor2)';
      }
      if (e.target.id == this.boxID) {
        this.direction++;
        this.direction %= 4;
      }
      this.boxID = e.target.id;
    }

    for (var i = 0; i < 4; i++) {
      var dataAttr = this.DIR_DATA[this.direction];
      var dataVar = e.target.getAttribute('data-' + dataAttr);
      if (dataVar) {
        var ids = this.state.data[dataAttr][dataVar].ids;
        for (var i = 0; i < ids.length; i++) {
          document.getElementById(ids[i]).style.backgroundColor =
            'rgb(249, 241, 187)';
        }
        this.currentID = dataVar;
        break;
      } else {
        this.direction++;
        this.direction %= 4;
      }
    }
    if (!isSmallScreen()) {
      var prev = document
        .getElementById('clueWrapper')
        .querySelector('.selected');
      if (prev) {
        prev.classList.remove('selected');
      }
      let clueId = this.DIR_DATA[this.direction] + '~' + this.currentID;
      document.getElementById(clueId).classList.add('selected');
    } else {
      const dir = this.DIR_DATA[this.direction];
      const dom = document.getElementById('smallScreenHint');
      const item = this.state.data[dir][this.currentID];
      dom.innerText = `${item.hint}(${item.length})`;
      dom.style.display = 'block';
    }

    let value = e.target.getAttribute('data-value');
    if (value) {
      e.target.style.backgroundColor = '#f3e47b';
      /* $("#consos").css("display","block");
      $("#tempTable").html("");*/
    }
  };

  onKeyUp = e => {
    if (e.target) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
    }

    if (this.state.complete) {
      return;
    }
    if (
      !this.boxID ||
      (e.keyCode && this.state.data.language !== 'en')
    ) {
      return;
    }
    let input;
    if (e.keyCode) {
      input = String.fromCharCode(e.keyCode).toUpperCase();
      let valid = /^[A-Z]$/.test(input);
      if (!valid) {
        return;
      }
    } else {
      input = e;
    }
    var box = document.getElementById(this.boxID);
    var str = '';
    if (box.querySelector('.pos')) {
      str = box.querySelector('.pos').outerHTML;
    }
    box.innerHTML = str + input;
    var dataAttr = this.DIR_DATA[this.direction];
    var ids = this.state.data[dataAttr][this.currentID].ids;
    if (ids.indexOf(this.boxID) < ids.length - 1) {
      let newID = ids[ids.indexOf(this.boxID) + 1];
      document.getElementById(newID).click();
    }
    this.check('keyup');
  };

  render() {
    let data = this.state.data;
    if (!data) {
      return null;
    }
    return (
      <Styled cellWidth={this.cellWidth}>
        <header>
          <h3> {data.title}</h3>
          <p> {data.desc} </p>
        </header>
        <div>
          <div className="buttonMenu">
            <i
              className={`fa ${
                this.state.showButtonBar ? 'fa-times' : 'fa-bars'
              }`}
              onClick={e => {
                this.setState({ showButtonBar: !this.state.showButtonBar });
              }}
            >
              {' '}
            </i>
          </div>
          <div
            className={`buttonBar ${
              this.state.showButtonBar === true ? 'active' : ''
            }`}
          >
            {false &&
              data.showTimer && (
                <div>
                  <Timer options={{ delay: 1000 }} id="timer" />
                </div>
              )}
            <Rater />
            {this.props.content.assessment === false && (
              <React.Fragment>
                <Button onClick={this.giveUpWord}> Reveal </Button>
                <Button onClick={this.giveUp}> Give Up </Button>
              </React.Fragment>
            )}

            <Button onClick={this.reset}> Reset </Button>
            <Button
              updating={this.props.callInProg === 'submit'}
              onClick={this.submit}
            >
              Submit
            </Button>
            <Button onClick={e => window.print()}>Print</Button>
          </div>
        </div>
        {/* <Rater name = "crosswordRater" value = {this.state.rating} onStarClick = {this.onStarClick} className = "rater" /> */}

        <div className="contentWrapper">
          {isSmallScreen() && <div id="smallScreenHint" />}
          <div id="puzzleWrapper">
            <table id="puzzle">
              {[...Array(this.state.data.noOfRows)].map((e, i) => {
                return (
                  <tr>
                    {[...Array(this.state.data.noOfCols)].map((e, j) => (
                      <td
                        onClick={this.onCellClick}
                        key={i + '~' + j}
                        id={i + '~' + j}
                      />
                    ))}
                  </tr>
                );
              })}
            </table>
          </div>
          {!isSmallScreen() && (
            <Section title="Hints">
              <div id="clueWrapper">
                <div>
                  <h4 className="clueHeader">Across:</h4>
                  <div>{this.across}</div>
                </div>
                {this.across2}
                <div>
                  <h4 className="clueHeader">Down</h4>
                  <div>{this.down}</div>
                </div>
                {this.down2}
              </div>
            </Section>
          )}
        </div>
       
        {data.language === 'ta' && (
          <TamilInputWrapper>
            <TamilInput onPick={this.onKeyUp} />
          </TamilInputWrapper>
        )}
        {data.language === 'en' &&
          isSmallScreen() && <EnglishInput onPick={this.onKeyUp} />}
        <Overlay
          className={this.state.showComplete ? 'active' : ''}
          title="Feedback"
          onClose={this.onFeedbackClose}
          bgOpacity="0.5"
        >
          <div className="goodJob">
            <h1>
              Good Job <i className="fa fa-smile-o"> </i>
            </h1>
            <div className="info">
              Submit your score so that you can track it in your history.
            </div>
            <ButtonBar>
              <Button
                onClick={e => this.closeGoodJob(true)}
                updating={this.props.callInProg === 'submit'}
              >
                Submit
              </Button>
              <Button onClick={e => this.closeGoodJob(false)}>Cancel</Button>
            </ButtonBar>
          </div>
        </Overlay>
        {/*  <Comments /> */}
      </Styled>
    );
  }
}

CrosswordShowcase.propTypes = {
  submitShowcase: PropTypes.func.isRequired,
  content: PropTypes.object,
  userData: PropTypes.object,
  callInProg: PropTypes.bool,
}

export default CrosswordShowcase;
