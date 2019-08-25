
import { ApiAction, EntityType } from '../constants';
import DeApi from '../../Common/dataestate-core';
// import 'cross-fetch';

const apiConfig = {
  apiRoot: process.env.API_URL ? process.env.API_URL : "https://api.dataestate.net",
  authMode: process.env.AUTH_MODE,
  apiKey: process.env.API_KEY ? process.env.API_KEY : "",
  accessToken: process.env.ACCESS_TOKEN ? process.env.ACCESS_TOKEN : ""
};

/** ESTATES */
const requestEstates = params => ({
  type: ApiAction.REQUEST_GET,
  entityType: EntityType.ESTATE,
  params
});

const receiveEstates = (params, list) => ({
  type: ApiAction.RECEIVED_GET,
  entityType: EntityType.ESTATE,
  params, 
  list,
  //receivedAt: Date.now()
});

const unauthorizedRequest = error => ({
  type: ApiAction.UNAUTHORIZED_REQUEST,
  error
});

const fetchEstates = params => dispatch => {
  const endpoint = "/estates/data";
  // const apiUrl = `${apiConfig.apiRoot}/v2${endpoint}`;
  dispatch(requestEstates(params));
  //return fetch(apiUrl)
  return DeApi.get(endpoint, params)
    .then(
      res=>{
        if ([401, 403].includes(res.status)) {
          return Promise.reject(res);
        }
        else {
          return res.json();
        }
      }
    )
    .then(response=>{
      return dispatch(receiveEstates(params, response));
    })
    .catch(err=>{
      
      return dispatch(unauthorizedRequest({status:err.status,messagE:statusText}))
    })
}

const shouldFetchEstates=(state) => {
  const estates = state.estates;
  if (!estates.list || estates.list.length <= 0) {
    return true;
  }
  else if (estates.isFetching) {
    return false;
  }
  else {
    return estates.didInvalidate;
  }
}

export const fetchEstatesIfNeeded = () => (dispatch, getState) => {
  const currentState = getState();
  if (shouldFetchEstates(currentState)) {
    //TODO: Review the logic here. 
    const { searchParams } = currentState.estates;
    return dispatch(fetchEstates(searchParams));
  }
  else {
    return Promise.resolve();
  }
}
/** End Estates */