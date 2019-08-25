
import { UserAction, ApiAction } from '../../EstatesManager/constants';

//An filter is updated.
export const filtersUpdated= (filter, allowMany=false) => (
  {
    type: UserAction.FILTER_UPDATED,
    filter, // (object), { name, value, id }
    allowMany // (bool) Whether the same filter name allows many values. 
  }
)
export const filtersRemoved = (filterId, filterName) => (
  {
    type: UserAction.FILTER_REMOVED,
    filterId, // (string) name of the filter to remove. 
    filterName
  }
)

export const paramsUpdated =(param) => (
  {
    type: ApiAction.PARAM_UPDATED,
    param // (object) { fieldName: fieldValue }
  }
)

export const paramsRemoved = param => (
  {
    type: ApiAction.PARAM_REMOVED,
    param
  }
)

export const invalidateList = () => (
  {
    type: UserAction.INVALIDATE_LIST
  }
)