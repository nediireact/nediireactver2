import packageJSON from 'src/assets/package.json';

const {
  REACT_APP_API_URL,
  REACT_APP_IS_MOBILE_APP,
  REACT_APP_BRANCH_NAME,
  REACT_APP_PRODUCTION
} = process.env;

class EnvironmentVariables {
  static _instance: EnvironmentVariables;
  _apiBaseUrl: string;
  _production: boolean;
  _isMobileApp: boolean;
  _branchName: string;
  _version: string;

  constructor() {
    this._apiBaseUrl = REACT_APP_API_URL ?
      REACT_APP_API_URL : 'https://api.nedii.iguzman.com.mx/v1/';
    this._isMobileApp = REACT_APP_IS_MOBILE_APP ? true : false;
    this._production = REACT_APP_PRODUCTION ? true : false;
    this._branchName = REACT_APP_BRANCH_NAME ? REACT_APP_BRANCH_NAME : 'local-branch';
    this._version = packageJSON ? packageJSON.version : '0.0.0';
  }

  static getInstance(): EnvironmentVariables {
    if ( !EnvironmentVariables._instance ) {
      EnvironmentVariables._instance = new EnvironmentVariables;
    }
    return EnvironmentVariables._instance;
  }

  get production(): boolean {
    return this._production;
  }

  get apiBaseUrl(): string {
    return this._apiBaseUrl;
  }

  get isMobileApp(): boolean {
    return this._isMobileApp;
  }

  get branchName(): string {
    return this._branchName;
  }

  get version(): string {
    return this._version;
  }
}

export default EnvironmentVariables;
