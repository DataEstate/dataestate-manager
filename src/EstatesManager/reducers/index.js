import { combineReducers } from 'redux';
import { list, listData, listMeta } from './list';
import { ApiAction, UserAction } from '../constants';
//Single Fields components
const searchParams = (state={}, action) => {
  switch (action.type) {
    case ApiAction.PARAM_UPDATED:
      return action.param ? {...state, ...action.param } : state;
    case ApiAction.PARAM_REMOVED:
      const paramKey = Object.keys(action.param)[0];
      const { [paramKey]:valueToRemove, ...newState } = state;
      return newState;
    default:
      return state;
  }
}

const activeFilters = (state=[], action) => {
  switch (action.type) {
    case UserAction.FILTER_UPDATED:
      if (action.allowMany) {
        const filteredState = state.filter(
          (filter) => (filter.id !== action.filter.id)
        );
        return [...filteredState, action.filter];
      }
      else {
        const filteredState = state.filter(
          (filter)=>( filter.name !== action.filter.name && filter.id !== action.filter.id )
        );
        return [...filteredState, action.filter];
      }
    case UserAction.FILTER_REMOVED:
      if (action.filterId) {
        return state.filter(filter => (filter.id !== action.filterId));
      }
      else {
        //If no ID specified, clear everything with the filter name. 
        if (action.filterName) {
          return state.filter(filter=>(filter.label !== action.filterName));
        }
        //Clear all, if both are empty. 
        else {
          return [];
        }
      }

    default: 
      return state;
  }
}

const isFetching = (state=false, action)=> {
  switch (action.type) {
    case ApiAction.REQUEST_GET:
      return true;
    case ApiAction.RECEIVED_GET:
      return false;
    default:
      return state;
  }
}

const didInvalidate = (state=false, action) => {
  switch (action.type) {
    case UserAction.INVALIDATE_LIST:
    case ApiAction.PARAM_UPDATED:
    case ApiAction.PARAM_REMOVED:
      return true;
    case ApiAction.REQUEST_GET:
      return false;
    case ApiAction.RECEIVED_GET:
      return false;
    default: 
      return false;
  }
}

const error = (state={}, action) => {
  switch (action.type) {
    case ApiAction.UNAUTHORIZED_REQUEST:
      return action.error;
    default:
      return state;
  }
}

export default combineReducers({
  searchParams,
  activeFilters,
  isFetching,
  didInvalidate,
  error,
  list,
  listData,
  listMeta
});