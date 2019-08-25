import { connect } from 'react-redux';
import { Dropdown } from '../components/Controls';
import { filtersUpdated, filtersRemoved, paramsUpdated, paramsRemoved } from '../actions/UserActions';

export const DropdownFilter = connect(
  //mapStateToProps
  (state, { name, entityType, multiple })=> {
    const { searchParams } = state[entityType];
    if (multiple) {
      return {
        value: searchParams[name] ? searchParams[name].split(',') : []
      }
    }
    else {
      return {
        value: searchParams[name] ? searchParams[name] : ""
      }
    }
  },
  //mapDispatchToProps
  (dispatch, { name, filterLabel, onChange, multiple, options } ) => {
    return {
      onChange: (selectedIndex, remove=false) => {
        const selectedOption = {...options[selectedIndex]};
        const itemId = (selectedOption.value =="" || (multiple && selectedOption.value.length<=0)) ? "" : `${name}-${selectedOption.value}-${selectedIndex}`;
        const selectedItem = {
          ...selectedOption,
          id: itemId,
          name,
          label: filterLabel
        }
        const allowMany = multiple ? true : false;
        if (remove) {
          dispatch(filtersRemoved(itemId, filterLabel));
        }
        //Remove One or remove many (item id == "")
        else {
          dispatch(filtersUpdated(
            selectedItem,
            allowMany
          ));
        }
        onChange(selectedItem, remove);
      }
    }
  }
)(Dropdown);