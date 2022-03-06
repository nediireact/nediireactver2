/* eslint-disable max-lines-per-function */
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from 'src/pages/home/home';
import About from 'src/pages/about/about';
import ActivateUser from 'src/pages/activate-user/activate-user';
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

const AppRoutes = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/mi-cuenta/vehiculos' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/inmuebles' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/platillos' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/servicios' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/productos' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/ventas' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/empresas' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/favoritos' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/ordenes' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/carrito' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/pagos' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/direcciones' element={<UserAccountPage />} />
        <Route path='/mi-cuenta/configuracion' element={<UserAccountPage />} />
        <Route path='/mi-cuenta' element={<UserAccountPage />} />
        <Route path='/empresa/:standId/inmuebles/:realEstateId' element={<StandRealEstateDetailPage />} />
        <Route path='/empresa/:standId/vehiculos/:vehicleId' element={<StandVehicleDetailPage />} />
        <Route path='/empresa/:standId/servicios/:serviceId' element={<StandServiceDetailPage />} />
        <Route path='/empresa/:standId/productos/:productId' element={<StanProductDetailPage />} />
        <Route path='/empresa/:standId/menu/:mealId' element={<StandMealDetail />} />
        <Route path='/empresa/:standId/news/:standNewsId' element={<StandNewsDetail />} />
        <Route path='/empresa/:standId/inmuebles' element={<StandRealEstate />} />
        <Route path='/empresa/:standId/vehiculos' element={<StandVehicles />} />
        <Route path='/empresa/:standId/productos' element={<StandProducts />} />
        <Route path='/empresa/:standId/servicios' element={<StandServices />} />
        <Route path='/empresa/:standId/menu' element={<StandMeals />} />
        <Route path='/empresa/:standId' element={<StandDetail />} />
        <Route path='/categorias/:groupId' element={<GroupDetail />} />
        <Route path='/categorias' element={<CategoriesGridPage />} />
        <Route path='/expos/:expoId/:groupId' element={<GroupDetail />} />
        <Route path='/expos/:expoId' element={<ExpoDetail />} />
        <Route path='/expos' element={<Expos />} />
        <Route path='/buscador' element={<SearchResultsPage />} />
        <Route path='/activate/:token' element={<ActivateUser />} />
        <Route path='/about' element={<About />} />
        <Route path='/create-account' element={<CreateAccount />} />
        <Route path='/login' element={<LoginUser />} />
        <Route path='/changelog' element={<ChangeLogPage />} />
        <Route path='/terminos-y-condiciones' element={<TermsAndConditions />} />
        <Route path='/politica-de-privacidad' element={<PrivacyPolicy />} />
        <Route path='/uso-de-datos-de-usuario' element={<UserData />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
