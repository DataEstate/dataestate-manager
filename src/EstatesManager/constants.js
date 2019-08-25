/** Sort of a library for keeping ENUM? */
export const ApiAction = {
  REQUEST_GET: "REQUEST_GET",
  RECEIVED_GET: "RECEIVE_GET",
  ERROR_GET: "ERROR_GET",
  UNAUTHORIZED_REQUEST: "UNAUTHORIZED_REQUEST",
  PARAM_UPDATED: "PARAM_UPDATED",
  PARAM_REMOVED: "PARAM_REMOVED"
}

export const UserAction = {
  FILTER_UPDATED: "FILTER_UPDATED",
  FILTER_REMOVED: "FILTER_REMOVED",
  INVALIDATE_LIST: "INVALIDATE_LIST", //Making current list invalid -> Update it!
  TOGGLE_EDIT: "TOGGLE_EDIT"
};

export const EntityType = {
  ESTATE: "ESTATE",
  ASSET: "ASSET",
  TAXONOMY: "TAXONOMY"
}

export const FieldType = {
  TEXT: "text", 
  NUMBER: "number",
  LIST: "array",
  DICTIONARY: "dictionary"
}