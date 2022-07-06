/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import * as CoreAPIs from './_api-core-helpers';
import GetNediiPlans from './get-nedii-plans';
import UpgradeUserToSeller from './upgrade-user-to-seller';
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
import UpdateBuyableItem from './update-buyable-item';

const APISDK = {
  ...CoreAPIs,
  GetNediiPlans: GetNediiPlans,
  UpgradeUserToSeller: UpgradeUserToSeller,
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
  DeleteProductById: DeleteProductById,
  UpdateBuyableItem: UpdateBuyableItem
};

export default APISDK;
