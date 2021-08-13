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

const env = EnvironmentVariables.getInstance();
const isMobileApp = env.isMobileApp;

const Routes = (): React.ReactElement => {
  return (
    <Router forceRefresh={!isMobileApp}>
      <Switch>
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
