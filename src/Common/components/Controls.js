import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DefaultStyle from '../styles';
import { css } from 'aphrodite';
import onClickOutside from "react-onclickoutside";
//Resource: https://redux.js.org/faq/organizing-state

class DropdownComponent extends Component {
  constructor(props) {
    super(props);
    this.handleMultiDropdown = this.handleMultiDropdown.bind(this);
    this.state = {
      shouldShow: false
    }
  }
  handleMultiDropdown(e) {
    this.setState({
      shouldShow: !this.state.shouldShow
    })
  }
  handleClickOutside(e) {
    this.setState({
      shouldShow: false
    })
  }
  render() {
    const { FieldControls } = DefaultStyle;
    const { options, onChange, name, value, multiple } = this.props;
    if (!multiple) {
      return (
        <div className={`select-container ${css(FieldControls.selectFilterContainer)}`}>
          <select
            onChange={
              e => {
                const { value:selectedValue, selectedIndex } = e.target;
                e.preventDefault();
                onChange(selectedIndex, (selectedValue==""));
              }
            }
            value={value}
            className={`select control-${name} ${css(FieldControls.select)}`}>
            {
              options.map((item, key) => (
                <option key={key} value={item.value}>
                  {item.text}
                </option>
              ))
            }
          </select>
        </div>
      )
    }
    else {
      const displayValue = value.length === 0 ?
        options[0].text : 
          (value.length > 1 ? `${name} - ${value.length}` : 
          options.filter(option=>(option.value===value[0]))[0].text);
      
      const { shouldShow } = this.state;
      return (
        <div className={`select-container select-multiple ${css(FieldControls.selectFilterContainer)}`}>
          <button type="button" className={`select select-multiple-value control-${name} ${css(FieldControls.select, FieldControls.selectMultiButton)}`}
          onClick={ this.handleMultiDropdown }>
            {
              displayValue
            }
          </button>
          <div className={`select-options select-multiple-options ${css(FieldControls.dropDownMenu)}`} style={ shouldShow ? { display: 'block'} : { display: 'none' }}>
            <ul className={css(FieldControls.list)}>
              {
                options.map((item, key)=> (
                  <li key={key} className={css(FieldControls.listItem)}>
                    <label htmlFor={`option-${item.value}`}>
                      <input type="checkbox" name={`option-${item.value}`} value={item.value} checked={ (item.value=="" && value.length == 0) || value.includes(item.value)}
                      onChange={
                        e=> {
                          const shouldRemove = item.value == "" ? true : !e.target.checked;
                          onChange(key, shouldRemove);
                        }
                      } />
                      { item.text }
                    </label>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      )
    }
  }
}

DropdownComponent.propType = {
  filterName: PropTypes.string.isRequired,
  filterLabel: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}

export const Dropdown = onClickOutside(DropdownComponent);