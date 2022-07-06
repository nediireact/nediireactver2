import packageJSON from 'src/assets/version.json';
import * as c from './Constants';

export const FILE_PREFIX = {
  ANDROID: 'file:///android_asset/www'
};
export const SET_SYSTEM_CONFIGURATIONS = 'SET_SYSTEM_CONFIGURATIONS';
export const SWITCH_DARK_MODE = 'SWITCH_DARK_MODE';
export const SET_MOBILE_PLATOFORM = 'SET_MOBILE_PLATOFORM';
export const SET_GLOBAL_ALERT_DIALOG = 'SET_GLOBAL_ALERT_DIALOG';
export const USER = 'USER';
export const USER_FAVORITES_STANDS = 'USER_FAVORITES_STANDS';
export const USER_FAVORITES_ADD_STAND = 'USER_FAVORITES_ADD_STAND';
export const USER_FAVORITES_DELETE_STAND = 'USER_FAVORITES_DELETE_STAND';
export const USER_FAVORITES_ITEMS = 'USER_FAVORITES_ITEMS';
export const USER_FAVORITES_ADD_ITEM = 'USER_FAVORITES_ADD_ITEM';
export const USER_FAVORITES_DELETE_ITEM = 'USER_FAVORITES_DELETE_ITEM';
export const USER_CART = 'USER_CART';
export const USER_CART_ADD_ITEM = 'USER_CART_ADD_ITEM';
export const USER_CART_UPDATE_ITEM = 'USER_CART_UPDATE_ITEM';
export const USER_CART_DELETE_ITEM = 'USER_CART_DELETE_ITEM';
export const USER_ORDERS = 'USER_ORDERS';
export const CATEGORY_DATA = 'CATEGORY_DATA';
export const STAND_DATA = 'STAND_DATA';
export const UPDATE_STAND_AVERAGE_RATING = 'UPDATE_STAND_AVERAGE_RATING';
export const EXPO_DATA = 'EXPO_DATA';
export const GROUP_DATA = 'GROUP_DATA';
export const SYSTEM_DATA = 'SYSTEM_DATA';

const {
  REACT_APP_API_URL,
  REACT_APP_IS_MOBILE_APP,
  REACT_APP_BRANCH_NAME,
  REACT_APP_FACEBOOK_APP_ID
} = process.env;

class SystemValues {
  static _instance: SystemValues;
  _apiBaseUrl: string;
  _isMobileApp: boolean;
  _branchName: string;
  _version: string;
  _facebookAppID: string;
  private _language: string;
  private _primaryColorName: string;
  private _primaryColorValue: string;
  private _searchAvailable: boolean;
  private _appEnabled: boolean;
  private _changelogEnabled: boolean;

  constructor() {
    this._apiBaseUrl = REACT_APP_API_URL ? REACT_APP_API_URL : c.DEFAULT_API_URL;
    this._isMobileApp = REACT_APP_IS_MOBILE_APP ? true : false;
    this._branchName = REACT_APP_BRANCH_NAME ? REACT_APP_BRANCH_NAME : 'local-branch';
    this._version = packageJSON ? packageJSON.version : '0.0.0';
    this._facebookAppID = REACT_APP_FACEBOOK_APP_ID ? REACT_APP_FACEBOOK_APP_ID : '-';
    this._language = c.DEFAULT_LANGUAGE;
    this._searchAvailable = c.SEARCH_BOX_AVAILABLE;
    this._primaryColorName = c.PRIMARY_COLOR_NAME;
    this._primaryColorValue = c.PRIMARY_COLOR_VALUE;
    this._appEnabled = c.APP_ENABLED;
    this._changelogEnabled = c.CHANGELOG_ENABLED;
  }

  static getInstance(): SystemValues {
    if ( !SystemValues._instance ) {
      SystemValues._instance = new SystemValues;
    }
    return SystemValues._instance;
  }

  public get language(): string {
    return this._language;
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

  public get primaryColorName(): string {
    return this._primaryColorName;
  }

  public get primaryColorValue(): string {
    return this._primaryColorValue;
  }

  public get facebookAppID(): string {
    return this._facebookAppID;
  }

  public get searchAvailable(): boolean {
    return this._searchAvailable;
  }

  public get appEnabled(): boolean {
    return this._appEnabled;
  }

  public get changelogEnabled(): boolean {
    return this._changelogEnabled;
  }

  public get DOMData(): any {
    try {
      const data: any = JSON.parse(window.document.getElementById('data')?.innerText || '{}');
      return data;
    } catch (error) {
      return {};
    }
  }
}

export default SystemValues;
