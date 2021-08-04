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
import CreateAccount from 'src/pages/create-account/create-account';
import ExpoDetail from 'src/pages/expo-detail/expo-detail';

const env = EnvironmentVariables.getInstance();
const isMobileApp = env.isMobileApp;

const Routes = (): React.ReactElement => {
  return (
    <Router forceRefresh={!isMobileApp}>
      <Switch>
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
        <Route path="/expos/:expoId">
          <Provider store={store}>
            <ExpoDetail />
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
