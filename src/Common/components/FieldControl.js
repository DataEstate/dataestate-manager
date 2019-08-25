import React from 'react';
import PropTypes from 'prop-types';
import { FieldType } from '../../EstatesManager/constants';

const FieldControl = ({fieldType, interactive, children, onClick }) => {
  switch (fieldType) {
    case FieldType.TEXT:
      if (interactive) {
        return (
          <input 
          type="text" 
          className="field-control" 
          value={children} 
          onClick={onClick} />
        )
      }
    default:
      return (
        <div className="field-control" onClick={onClick}>
          {children}
        </div>
      );
  }
}

FieldControl.propType = {
  fieldType: PropTypes.string,
  interactive: PropTypes.boolean, 
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default FieldControl;