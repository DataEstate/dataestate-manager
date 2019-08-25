import { StyleSheet } from 'aphrodite';
import { brandColors, spacings } from './brand';

export const FieldControls = StyleSheet.create({
  selectFilterContainer: {
    display: 'inline-block'
  },
  select: {
    ':focus': {
      outline: 'none'
    },
    ':hover': {
      cursor: 'pointer'
    },
    padding: '5px',
    fontSize: '1em',
    WebkitAppearance: 'none',
    border: `1px solid`,
    background: 'white'
  },
  selectMultiButton: {
    borderRadius: spacings.borderRadius,
    minWidth: '100px',
    textAlign: 'left'
  },
  dropDownMenu: {
    position: 'absolute',
    background: 'white',
    boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.4)',
    marginTop: '5px',
    borderRadius: spacings.borderRadius,
    padding: '5px'
  },
  list: {
    padding: '0px',
    margin: '0px'
  },
  listItem: {
    listStyle: 'none'
  }
});

export const FilterStyles = StyleSheet.create({
  activeFilter: {
    background: brandColors.skyBlue,
    color: 'white',
    padding: '2px 5px',
    borderRadius: '5px',
    fontSize: '10px',
    display: 'inline-block', 
  },
  activeFilterLabel: {
    fontWeight: '400'
  }, 
  activeFilterCloseButton: {
    
  }
})