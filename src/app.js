import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Manager from './EstatesManager/containers/Manager';
import DeApi from './Common/dataestate-core';

const defaultParams = {
  size: 10,
  sort: "name", 
  fields: "id,name,category,state_code,hero_image"
}

const apiConfig = {
  apiRoot: process.env.API_URL ? process.env.API_URL : "https://api.dataestate.net",
  authMode: process.env.AUTH_MODE,
  apiKey: process.env.API_KEY ? process.env.API_KEY : "",
  accessToken: process.env.ACCESS_TOKEN ? process.env.ACCESS_TOKEN : ""
};
//Setup API
DeApi.configureApi(apiConfig);
const store = configureStore({
  estates: {
    searchParams: { ...defaultParams}
  }
});

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <Manager />
      </Provider>
    );
  }
}