import { connect } from 'react-redux';
import Tag from '../../Common/components/Tag';
import { filtersRemoved } from '../actions/UserActions';

const mapDispatchToProps = (dispatch, {item, onFilterRemoved}) => {
  return {
    onClick: () => {
      dispatch(filtersRemoved(item.id));
      onFilterRemoved(item, true);
    }
  }
}

const FilterTag = connect(
  null,
  mapDispatchToProps
)(Tag);

export default FilterTag;
