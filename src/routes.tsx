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
import StandVehicles from 'src/pages/stand-vehicles/stand-vehicles';
import StandRealEstate from 'src/pages/stand-real-estate/stand-real-estate';
import StanProductDetailPage from 'src/pages/stand-product-detail/stand-product-detail';
import StandServiceDetailPage from 'src/pages/stand-service-detail/stand-service-detail';
import StandVehicleDetailPage from 'src/pages/stand-vehicle-detail/stand-vehicle-detail';
import StandRealEstateDetailPage from 'src/pages/stand-real-estate-detail/stand-real-estate-detail';
import CategoriesGridPage from 'src/pages/categories-grid/categories-grid';
import SearchResultsPage from 'src/pages/search-results/search-results';
import {
  TermsAndConditions,
  PrivacyPolicy,
  UserData
} from 'src/pages/terms-and-conditions/terms-and-conditions';
import UserAccountPage from 'src/pages/user-account/user-account';

const env = EnvironmentVariables.getInstance();
const isMobileApp = env.isMobileApp;

const Routes = (): React.ReactElement => {
  return (
    <Router forceRefresh={isMobileApp}>
      <Switch>
        <Route path='/mi-cuenta/favoritos'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><UserAccountPage /></PersistGate>
          </Provider>
        </Route>
        <Route path='/mi-cuenta'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><UserAccountPage /></PersistGate>
          </Provider>
        </Route>
        <Route path='/empresa/:standId/inmuebles/:realEstateId'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandRealEstateDetailPage /></PersistGate>
          </Provider>
        </Route>
        <Route path='/empresa/:standId/vehiculos/:vehicleId'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandVehicleDetailPage /></PersistGate>
          </Provider>
        </Route>
        <Route path='/empresa/:standId/servicios/:serviceId'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandServiceDetailPage /></PersistGate>
          </Provider>
        </Route>
        <Route path='/empresa/:standId/productos/:productId'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StanProductDetailPage /></PersistGate>
          </Provider>
        </Route>
        <Route path='/empresa/:standId/menu/:mealId'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandMealDetail /></PersistGate>
          </Provider>
        </Route>
        <Route path='/empresa/:standId/news/:standNewsId'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandNewsDetail /></PersistGate>
          </Provider>
        </Route>
        <Route path='/empresa/:standId/inmuebles'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandRealEstate /></PersistGate>
          </Provider>
        </Route>
        <Route path='/empresa/:standId/vehiculos'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandVehicles /></PersistGate>
          </Provider>
        </Route>
        <Route path='/empresa/:standId/productos'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandProducts /></PersistGate>
          </Provider>
        </Route>
        <Route path='/empresa/:standId/servicios'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandServices /></PersistGate>
          </Provider>
        </Route>
        <Route path='/empresa/:standId/menu'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandMeals /></PersistGate>
          </Provider>
        </Route>
        <Route path='/empresa/:standId'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><StandDetail /></PersistGate>
          </Provider>
        </Route>
        <Route path='/categorias/:groupId'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><GroupDetail /></PersistGate>
          </Provider>
        </Route>
        <Route path='/categorias'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><CategoriesGridPage /></PersistGate>
          </Provider>
        </Route>
        <Route path='/expos/:expoId/:groupId'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><GroupDetail /></PersistGate>
          </Provider>
        </Route>
        <Route path='/expos/:expoId'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><ExpoDetail /></PersistGate>
          </Provider>
        </Route>
        <Route path='/expos'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><Expos /></PersistGate>
          </Provider>
        </Route>
        <Route path='/buscador'>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}><SearchResultsPage /></PersistGate>
          </Provider>
        </Route>
        <Route path='/activate/:token'>
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
