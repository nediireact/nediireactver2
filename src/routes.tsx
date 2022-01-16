import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'src/redux/store';
import Home from 'src/pages/home/home';
import About from 'src/pages/about/about';
import ActivateUser from 'src/pages/activate-user/activate-user';
import EnvironmentVariables from 'src/constants/EnvironmentVariables';
import ChangeLogPage from 'src/pages/changelog/changelog';
import CreateAccount from 'src/pages/create-account/create-account';
import LoginUser from 'src/pages/login/login';
import Expos from 'src/pages/expos/expos';
import ExpoDetail from 'src/pages/expo-detail/expo-detail';
import GroupDetail from 'src/pages/group-detail/group-detail';
import StandDetail from 'src/pages/stand-detail/stand-detail';
import StandMeals from 'src/pages/stand-meals/stand-meals';
import StandProducts from 'src/pages/stand-products/stand-products';
import StandNewsDetail from 'src/pages/stand-news-detail/stand-news-detail';
import StandMealDetail from 'src/pages/stand-meal-detail/stand-meal-detail';
import StandServices from 'src/pages/stand-services/stand-services';
import {
  TermsAndConditions,
  PrivacyPolicy,
  UserData
} from 'src/pages/terms-and-conditions/terms-and-conditions';

const env = EnvironmentVariables.getInstance();
const isMobileApp = env.isMobileApp;

const Routes = (): React.ReactElement => {
  return (
    <Router forceRefresh={isMobileApp}>
      <Switch>
        <Route path="/empresa/:standId/producto/:mealId">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandMealDetail /></PersistGate>
          </Provider>
        </Route>
        <Route path="/empresa/:standId/menu/:mealId">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandMealDetail /></PersistGate>
          </Provider>
        </Route>
        <Route path="/empresa/:standId/news/:standNewsId">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandNewsDetail /></PersistGate>
          </Provider>
        </Route>
        <Route path="/empresa/:standId/productos">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandProducts /></PersistGate>
          </Provider>
        </Route>
        <Route path="/empresa/:standId/servicios">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandServices /></PersistGate>
          </Provider>
        </Route>
        <Route path="/empresa/:standId/menu">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandMeals /></PersistGate>
          </Provider>
        </Route>
        <Route path="/empresa/:standId">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandDetail /></PersistGate>
          </Provider>
        </Route>
        <Route path="/expos/:expoId/:groupId">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><GroupDetail /></PersistGate>
          </Provider>
        </Route>
        <Route path="/expos/:expoId">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><ExpoDetail /></PersistGate>
          </Provider>
        </Route>
        <Route path='/expos'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><Expos /></PersistGate>
          </Provider>
        </Route>
        <Route path="/activate/:token">
          <Provider store={store}>
            <ActivateUser />
          </Provider>
        </Route>
        <Route path='/about'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><About /></PersistGate>
          </Provider>
        </Route>
        <Route path='/create-account'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><CreateAccount /></PersistGate>
          </Provider>
        </Route>
        <Route path='/login'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><LoginUser /></PersistGate>
          </Provider>
        </Route>
        <Route path='/changelog'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><ChangeLogPage /></PersistGate>
          </Provider>
        </Route>
        <Route path='/terminos-y-condiciones'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><TermsAndConditions /></PersistGate>
          </Provider>
        </Route>
        <Route path='/politica-de-privacidad'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><PrivacyPolicy /></PersistGate>
          </Provider>
        </Route>
        <Route path='/uso-de-datos-de-usuario'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><UserData /></PersistGate>
          </Provider>
        </Route>
        <Route path='/'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><Home /></PersistGate>
          </Provider>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
