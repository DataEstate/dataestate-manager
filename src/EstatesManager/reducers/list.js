import { UserAction, ApiAction } from '../constants';

export const list=(state = [], action)=>{
  switch (action.type) {
    case ApiAction.RECEIVED_GET:
      return action.list.map(listItem => listItem.id);
    default: 
      return state;
  }
}
export const listData = (state = {}, action)=>{
  switch (action.type) {
    case ApiAction.RECEIVED_GET:
      return action.list.reduce((listDataObj, listItem)=>{
        listDataObj[listItem.id] = listItem;
        return listDataObj;
      }, {});
    default:
      return state;
  }
}
export const listMeta = (state = {}, action)=> {
  switch (action.type) {
    case ApiAction.RECEIVED_GET:
      return action.list.reduce((listDataObj, listItem)=>{
        listDataObj[listItem.id] = {
          interactive: false
        }
        return listDataObj;
      }, {});
    case UserAction.TOGGLE_EDIT:
      let newState = {...state}
      if (newState.hasOwnProperty(action.id)) {
        newState[action.id].interactive = !newState[action.id].interactive;
        return newState;
      }
      else {
        return state;
      }
    default: 
      return state;
  }
}
export default list;