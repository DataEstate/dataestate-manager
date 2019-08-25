import React from 'react';
import PropType from 'prop-types';
import Style from '../styles';
import { css } from 'aphrodite';
import FilterTag from '../containers/FilterTag';

const { FilterStyles }  = Style;

export const ActiveFilters = ({ filters, onFilterRemoved }) => {
  return (
    <div className="active-filters">
      {
        filters.map((item, index) => (
          <FilterTag key={index} item={item} onFilterRemoved={onFilterRemoved}>
            <span className={`filter-label ${css(FilterStyles.activeFilterLabel)}`}>{ item.label }: </span>
            <span className="filter-text">{ item.text }</span>
          </FilterTag>
        ))
      }
    </div>
  );
}

ActiveFilters.propType = {
  filters: PropType.shape(
    {
      id: PropType.string.isRequired,
      name: PropType.string.isRequired,
      value: PropType.string.isRequired,
      label: PropType.string
    }
  ).isRequired
}