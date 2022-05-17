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
import AddBuyableItem from './add-buyable-item';
import GetProductClassificationsByStand from './get-product-classifications-by-stand';
import GetProductClassifications from './get-product-classifications';
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
  AddBuyableItem: AddBuyableItem,
  GetProductClassificationsByStand: GetProductClassificationsByStand,
  GetProductClassifications: GetProductClassifications,
  DeleteProductById: DeleteProductById
};

export default APISDK;
