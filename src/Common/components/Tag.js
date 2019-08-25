import React from 'react';
import PropType from 'prop-types';
import Style from '../styles';
import { css } from 'aphrodite';

const { FilterStyles } = Style;

const Tag = ({ className, children, onClick}) => (
  <div className={`active-tag ${ className ? className : '' } ${css(FilterStyles.activeFilter)}`}>
    { children }
    <button type="button" onClick={
      e => {
        e.preventDefault()
        onClick()
      }}>X</button>
  </div>
);

Tag.propType = {
  onClick: PropType.func.isRequired,
  children: PropType.node.isRequired
}

export default Tag;