import packageJSON from './version.json';
// import store from 'src/redux/store';
import * as c from './Constants';

export const FILE_PREFIX = {
  ANDROID: 'file:///android_asset/www'
};
export const SET_SYSTEM_CONFIGURATIONS = 'SET_SYSTEM_CONFIGURATIONS';
export const SWITCH_DARK_MODE = 'SWITCH_DARK_MODE';
export const SET_MOBILE_PLATOFORM = 'SET_MOBILE_PLATOFORM';
export const SET_GLOBAL_ALERT_DIALOG = 'SET_GLOBAL_ALERT_DIALOG';
// export const USER = 'USER';
// export const USER_FAVORITES_STANDS = 'USER_FAVORITES_STANDS';
// export const USER_FAVORITES_ADD_STAND = 'USER_FAVORITES_ADD_STAND';
// export const USER_FAVORITES_DELETE_STAND = 'USER_FAVORITES_DELETE_STAND';
// export const USER_FAVORITES_ITEMS = 'USER_FAVORITES_ITEMS';
// export const USER_FAVORITES_ADD_ITEM = 'USER_FAVORITES_ADD_ITEM';
// export const USER_FAVORITES_DELETE_ITEM = 'USER_FAVORITES_DELETE_ITEM';
// export const USER_CART = 'USER_CART';
// export const USER_CART_ADD_ITEM = 'USER_CART_ADD_ITEM';
// export const USER_CART_UPDATE_ITEM = 'USER_CART_UPDATE_ITEM';
// export const USER_CART_DELETE_ITEM = 'USER_CART_DELETE_ITEM';
// export const USER_ORDERS = 'USER_ORDERS';
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

/* eslint-disable no-unused-vars */
export enum ReducerActions {
  add = 'add',
  update = 'update',
  read = 'read'
}
/* eslint-enable no-unused-vars */

export interface SystemInterface {
  // ========== BASE - COMMON VALUES INIT ==========
  isLoading: Array<boolean>;
  darkMode: boolean;
  platform: {
    os: string;
    prefix: string;
  }
  configurations: any;
  globalAlert: any;
  cart: Array<any>;
  orders: Array<any>;
  accessToken: string;
  refreshToken: string;
  changeLog: Array<any>;
  // ========== BASE - COMMON VALUES INIT ==========
  exposById: any;
  groupsById: any;
  standsById: any;
  expos: Array<any>;
  categories: Array<any>;
  stands: Array<any>;
  favoriteStands: Array<any>;
  favoriteItems: Array<any>;
  nediiPlans: Array<any>;
  productClassifications: Array<any>;
  productClassificationsByStand: any;
  sellerStands: Array<any>;
  sellerStandsById: any;
  sellerProducts: Array<any>;
  homeBestSeller: Array<any>;
  homeMonthDeals: Array<any>;
  homeDeals: Array<any>;
}

interface SystemReducerInterface {
  type: ReducerActions;
  data: SystemInterface;
}

const systemDefaultState: SystemInterface = {
  // ========== BASE - COMMON VALUES INIT ==========
  isLoading: [],
  darkMode: false,
  platform: {
    os: 'web',
    prefix: ''
  },
  configurations: {},
  globalAlert: {},
  cart: [],
  orders: [],
  accessToken: '',
  refreshToken: '',
  changeLog: [],
  // ========== BASE - COMMON VALUES INIT ==========
  exposById: {},
  groupsById: {},
  standsById: {},
  expos: [],
  categories: [],
  stands: [],
  favoriteStands: [],
  favoriteItems: [],
  nediiPlans: [],
  productClassifications: [],
  productClassificationsByStand: {},
  sellerStands: [],
  sellerStandsById: {},
  sellerProducts: [],
  homeBestSeller: [],
  homeMonthDeals: [],
  homeDeals: []
};

export interface UserInterface {
  type: string;
  id: number;
  attributes: {
    username: string;
    email: string;
    last_login: string;
    first_name: string;
    last_name: string;
    is_superuser: boolean;
    date_joined: string;
    is_active: boolean;
    is_staff: boolean;
    profile: {
      id: number;
      newsletter: boolean;
      promotions: boolean;
      is_seller: boolean;
      img_picture: string;
      biography: string;
      owner_position: string;
      owner_position_description: string;
      owner_phone: string;
      owner_office_phone: string;
      owner_email: string;
      owner_whatsapp: string;
      owner_address: string;
    }
  }
}

interface UserReducerInterface {
  type: ReducerActions,
  data: UserInterface
}

const userDefaultState: UserInterface = {
  type: 'User',
  id: 0,
  attributes: {
    username: '',
    email: '',
    last_login: '',
    first_name: '',
    last_name: '',
    is_superuser: false,
    date_joined: '',
    is_active: true,
    is_staff: false,
    profile: {
      id: 0,
      newsletter: false,
      promotions: false,
      is_seller: false,
      img_picture: '',
      biography: '',
      owner_position: '',
      owner_position_description: '',
      owner_phone: '',
      owner_office_phone: '',
      owner_email: '',
      owner_whatsapp: '',
      owner_address: ''
    }
  }
};

class SystemValues {
  // ========== BASE - COMMON VALUES INIT ==========
  static _instance: SystemValues;
  private _hostname: string;
  private _apiBaseUrl: string;
  private _isMobileApp: boolean;
  private _branchName: string;
  private _version: string;
  private _facebookAppID: string;
  private _language: string;
  private _primaryColorName: string;
  private _primaryColorValue: string;
  private _searchAvailable: boolean;
  private _appEnabled: boolean;
  private _changelogEnabled: boolean;
  private _system: SystemInterface;
  private _user: UserInterface;

  constructor() {
    // ========== BASE - COMMON VALUES INIT ==========
    const DOMData: any = JSON.parse(window.document.getElementById('data')?.innerText || '{}');
    this._hostname = DOMData.hostname ? DOMData.hostname : 'no-hostname';
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
    this._system = systemDefaultState;
    this._user = userDefaultState;
    // ========== BASE - COMMON VALUES ENDS ==========
  }

  // ========== BASE - COMMON VALUES INIT ==========
  static getInstance(): SystemValues {
    if ( !SystemValues._instance ) {
      SystemValues._instance = new SystemValues;
    }
    return SystemValues._instance;
  }

  public get hostname(): string {
    return this._hostname;
  }

  public get language(): string {
    return this._language;
  }

  public get apiBaseUrl(): string {
    return this._apiBaseUrl;
  }

  public get isMobileApp(): boolean {
    return this._isMobileApp;
  }

  public get branchName(): string {
    return this._branchName;
  }

  public get version(): string {
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

  public systemReducer(action: SystemReducerInterface): SystemInterface {
    if ( action.type === ReducerActions.add ) {
      this._system = { ...this._system, ...action.data };
    }
    return this._system;
  }

  public get system(): SystemInterface {
    return this._system;
  }
  // ========== BASE - COMMON VALUES ENDS ==========

  // ========== CUSTOME VALUES INIT ==========
  public userReducer(action: UserReducerInterface): UserInterface {
    if ( action.type === ReducerActions.add ) {
      this._user = { ...this._user, ...action.data };
    }
    return this._user;
  }

  public get user(): UserInterface {
    return this._user;
  }
  // ========== CUSTOME VALUES ENDS ==========
}

export default SystemValues;
