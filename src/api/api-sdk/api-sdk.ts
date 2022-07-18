/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import Login from './login';
import UpdateUser from './update-user';
import UpdateUserProfile from './update-user-profile';
import GetNediiPlans from './get-nedii-plans';
import UpgradeUserToSeller from './upgrade-user-to-seller';
import GetUserAddress from './get-user-address';
import AddUserAddress from './add-user-address';
import UpdateUserAddress from './update-user-address';
import DeleteUserAddress from './delete-user-address';
import GetUserStands from './get-user-stands';
import GetUserStandById from './get-user-stand-by-id';
import AddStand from './add-stand';
import AddStandPhone from './add-stand-phone';
import UpdateStand from './update-stand';
import AddStandPicture from './add-stand-picture';
import DeleteStandPicture from './delete-stand-picture';
import DeleteStandById from './delete-stand-by-id';
import GetUserProducts from './get-user-products';
import GetUserServices from './get-user-services';
import GetUserMeals from './get-user-meals';
import GetUserVehicles from './get-user-vehicles';
import GetUserRealEstates from './get-user-real-estates';
import AddBuyableItem from './add-buyable-item';
import GetProductClassificationsByStand from './get-product-classifications-by-stand';
import GetProductClassifications from './get-product-classifications';
import GetServiceClassifications from './get-service-classifications';
import GetMealClassifications from './get-meal-classifications';
import GetVehicleClassifications from './get-vehicle-classifications';
import GetRealEstateClassifications from './get-real-estate-classifications';
import DeleteProductById from './delete-product-by-id';

const APISDK = {
  Login: Login,
  UpdateUser: UpdateUser,
  UpdateUserProfile: UpdateUserProfile,
  GetNediiPlans: GetNediiPlans,
  UpgradeUserToSeller: UpgradeUserToSeller,
  GetUserAddress: GetUserAddress,
  AddUserAddress: AddUserAddress,
  UpdateUserAddress: UpdateUserAddress,
  DeleteUserAddress: DeleteUserAddress,
  GetUserStands: GetUserStands,
  GetUserStandById: GetUserStandById,
  AddStand: AddStand,
  UpdateStand: UpdateStand,
  DeleteStandById: DeleteStandById,
  AddStandPhone: AddStandPhone,
  AddStandPicture: AddStandPicture,
  DeleteStandPicture: DeleteStandPicture,
  GetUserProducts: GetUserProducts,
  GetUserServices: GetUserServices,
  GetUserMeals: GetUserMeals,
  GetUserVehicles: GetUserVehicles,
  GetUserRealEstates: GetUserRealEstates,
  AddBuyableItem: AddBuyableItem,
  GetProductClassificationsByStand: GetProductClassificationsByStand,
  GetProductClassifications: GetProductClassifications,
  GetServiceClassifications: GetServiceClassifications,
  GetMealClassifications: GetMealClassifications,
  GetVehicleClassifications: GetVehicleClassifications,
  GetRealEstateClassifications: GetRealEstateClassifications,
  DeleteProductById: DeleteProductById
};

export default APISDK;
