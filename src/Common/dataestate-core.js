/**
 * Data Estate Core
 * @version 0.1.0
 * @author Rolf Chen <rolf.chen@dataestate.com.au>
 * Javascript wrapper based on the fetch API to interact
 * with the Data Estate API. 
 * Requires browsers that supports ES6. Older browsers will 
 * need polyfill to work. 
 */
import "cross-fetch";

const DE_ERRMESAGES = {
  401: "Unauthorized. Check if API Key or access token is valid. ",
  403: "Forbidden. You may not have access to the resource, or have not set the correct scope. "
};

class DataEstateCore {
  //TODO: Add native support for oauth2 authentication
  constructor(config) {
    this.configureApi(config);
  }
  configureApi(config={}) {
    this.apiRoot = config.apiRoot;
    this.apiVersion = config.apiVersion ? `v${config.apiVersion}` : 'v2'; //DEFAULT Version atm.
    this.authMode = config.authMode ? config.authMode : 'token';
    this.apiKey = config.apiKey ? config.apiKey : "";
    //TODO: Perhaps hide these and store in localStorage
    this.accessToken = config.accessToken;
    this.defaultOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
    switch (this.authMode) {
      case "token":
        this.defaultOptions.headers["Authorization"] = `Bearer ${this.accessToken}`;
        break;
      case "apiKey":
      default:
        this.defaultOptions.headers["API-KEY"] = this.apiKey;
        break;
    }
  }
  buildParamString(params) {
    return Object.keys(params).map(key => key + '=' + params[key]).join('&');
  } 

  buildUrl(path, params={}) {
    const paramString = this.buildParamString(params);
    return `${this.apiRoot}/${this.apiVersion}${path}${paramString !== "" ? `?${paramString}` : ""}`;
  }
  //Simplified method calls
  get(path, params={}) {
    const requestUrl = this.buildUrl(path,params);
    return fetch(requestUrl, { ...this.defaultOptions });
  }

  //Create request header
  createHeader() {
    const newHeader = new Headers(
      {
        'Content-Type': 'application/json',
      }
    );
    switch (this.authMode) {
      case "token":
        break;
      case "apiKey":
        newHeader.append('API-KEY', this.apiKey);
        break;
      default: 
        break;
    }
    return newHeader;
  }
}

export default new DataEstateCore;