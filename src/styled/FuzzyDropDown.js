import React, { Component } from 'react';
//import Dropdown from 'react-dropdown';
import styled, { css } from 'styled-components';
import ReactDOM from 'react-dom'
import classNames from 'classnames'

const DEFAULT_PLACEHOLDER_STRING = 'Select...'

class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: {
        label: props.placeholder || DEFAULT_PLACEHOLDER_STRING,
        value: null
      },
      isOpen: false
    }
    this.mounted = true;
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.fireChangeEvent = this.fireChangeEvent.bind(this)
  }

  componentDidMount(){
    this.populate(this.props);
  }

  componentWillReceiveProps (newProps) {
    this.populate(newProps);
  }

  populate = (newProps) => {
    if (!newProps) {
      return;
    }
    if (newProps.value) {
      if (newProps.options && newProps.options.length) {
        const selected = newProps.options.find(item => item.value.toString() === newProps.value);
        if (selected && selected.label) {
          this.setState({selected: {
            value: selected.value,
            label: selected.label,
          }})
        }
      }
    } else if (!newProps.value) {
      this.setState({selected: {
        label: newProps.placeholder || DEFAULT_PLACEHOLDER_STRING,
        value: null
      }})
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false)
    document.addEventListener('touchend', this.handleDocumentClick, false)
    this.populate(this.props);
  }

  componentWillUnmount () {
    this.mounted = false
    document.removeEventListener('click', this.handleDocumentClick, false)
    document.removeEventListener('touchend', this.handleDocumentClick, false)
  }

  handleMouseDown (event) {
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.state.isOpen)
    }
    if (event.type === 'mousedown' && event.button !== 0) return
    event.stopPropagation()
    event.preventDefault()

    if (!this.props.disabled) {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
  }

  setValue (value, label) {
    let newState = {
      selected: {
        value,
        label
      },
      inputValue:'',
      isOpen: false
    }
    this.fireChangeEvent(newState)
    this.setState(newState)
  }

  fireChangeEvent (newState) {
    if (newState.selected !== this.state.selected && this.props.onChange) {
      this.props.onChange(newState.selected)
    }
  }

  renderOption (option) {
    const classes = {
      [`${this.props.baseClassName}-option`]: true,
      [option.className]: !!option.className,
      'is-selected': option.value === this.state.selected.value
    }

    const optionClass = classNames(classes)

    let value = option.value || option.label || option
    let label = option.label || option.value || option

    return (
      <div
        key={value}
        className={optionClass}
        onMouseDown={this.setValue.bind(this, value, label)}
        onClick={this.setValue.bind(this, value, label)}>
        {label}
      </div>
    )
  }

  buildMenu () {
    let { options, baseClassName } = this.props;
    let ops = options.filter(option => option.label.toLowerCase().indexOf(this.state.inputValue.toLowerCase()) === 0)
      .map((option) => this.renderOption(option))

    return ops.length ? ops : <div className={`${baseClassName}-noresults`}>No options found</div>
  }

  handleDocumentClick (event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        if (this.state.isOpen) {
          this.setState({ isOpen: false })
        }
      }
    }
  }

  onInputTextChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.trim().length >= 2) {
      this.setState({isOpen: true, inputValue})
    } else {
      this.setState({isOpen: false, inputValue})
    }
  }

  render () {
    const { baseClassName, placeholderClassName, menuClassName, arrowClassName, className } = this.props

    const disabledClass = this.props.disabled ? 'Dropdown-disabled' : ''
    // const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label;
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label;

    const dropdownClass = classNames({
      [`${baseClassName}-root`]: true,
      [className]: !!className,
      'is-open': this.state.isOpen
    })
    const placeholderClass = classNames({
      [`${baseClassName}-placeholder`]: true,
      [placeholderClassName]: !!placeholderClassName
    })
    const menuClass = classNames({
      [`${baseClassName}-menu`]: true,
      [menuClassName]: !!menuClassName
    })
    const arrowClass = classNames({
      [`${baseClassName}-arrow`]: true,
      [arrowClassName]: !!arrowClassName
    })

    const value = (<div className={placeholderClass}>{placeHolderValue}</div>)
    const menu = this.state.isOpen ? <div className={menuClass}>{this.buildMenu()}</div> : null

    return (
      <div className={dropdownClass}>
        <div className={`${baseClassName}-control ${disabledClass}`} >
          <input placeholder = {this.props.placeholder || ''} type="text" onChange={this.onInputTextChange} value={this.state.inputValue} />
          {/*<div className="dropDownArrow" style={{ visibility: this.state.isOpen ? 'hidden': 'visible' }} />*/}
        </div>
        {menu}
      </div>
    )
  }
}

Dropdown.defaultProps = { baseClassName: 'Dropdown' }
// export default Dropdown



export default styled(Dropdown)`
  position: relative;
  width: ${props => {
    return props.width ? `${props.width}px` : '300px';
  }};
  .Dropdown-control {
    position: relative;
    overflow: hidden;
    background-color: white;
    border-bottom: 1px solid #ccc;
    border-radius: 2px;
    box-sizing: border-box;
    cursor: default;
    outline: none;
    padding: 5px 15px;
    transition: all 200ms ease;
    display: flex;
    justify-content: space-between;
    ${props => props.type === 'box' && css`
      background-color: #f6f5f8;
      border: none;
      max-width: 300px;
    `}
  }

  .Dropdown-control:hover {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  }
  /*
  .Dropdown-arrow {
    border-color: #999 transparent transparent;
    border-style: solid;
    border-width: 5px 5px 0;
    content: ' ';
    display: block;
    height: 0;
    margin-top: -ceil(2.5);
    position: absolute;
    right: 10px;
    top: 14px;
    width: 0
  }

  .is-open .Dropdown-arrow {
    border-color: transparent transparent #999;
    border-width: 0 5px 5px;
  }
  */
  .Dropdown-menu {
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
    box-sizing: border-box;
    margin-top: -1px;
    max-height: 200px;
    overflow-y: auto;
    position: absolute;
    top: 100%;
    width: ${props => (props.width && props.width < 200) ? '200px' : '100%'};
    z-index: 1000;
    -webkit-overflow-scrolling: touch;
  }

  .Dropdown-menu .Dropdown-group > .Dropdown-title {
    padding: 8px 10px;
    color: rgba(51, 51, 51, 1.2);
    font-weight: bold;
    text-transform: capitalize;
  }

  .Dropdown-option {
    box-sizing: border-box;
    color: rgba(51, 51, 51, 0.8);
    cursor: pointer;
    display: block;
    padding: 8px 10px;
  }

  .Dropdown-option:last-child {
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  .Dropdown-option:hover {
    background-color: #eeeeee;
    color: #333;
  }

  .Dropdown-option.is-selected {
    background-color: #eeeeee;
    color: #333;
  }

  .Dropdown-noresults {
    box-sizing: border-box;
    color: #ccc;
    cursor: default;
    display: block;
    padding: 8px 10px;
  }

  & .dropDownArrow{
    width: 10px;
    height: 10px;
  }
`;
