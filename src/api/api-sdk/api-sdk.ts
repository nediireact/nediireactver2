/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import * as CoreAPIs from './_api-core-helpers';
import GetNediiPlans from './get-nedii-plans';
import UpgradeUserToSeller from './upgrade-user-to-seller';
import GetSellerStands from './get-seller-stands';
import GetSellerStandsById from './get-seller-stand-by-id';
import AddStand from './add-stand';
import AddStandPhone from './add-stand-phone';
import UpdateStand from './update-stand';
import AddStandPicture from './add-stand-picture';
import DeleteStandPicture from './delete-stand-picture';
import DeleteStandById from './delete-stand-by-id';
import GetSellerProducts from './get-seller-products';
import AddBuyableItem from './add-buyable-item';
import GetProductClassificationsByStand from './get-product-classifications-by-stand';
import GetProductClassifications from './get-product-classifications';
import DeleteProductById from './delete-product-by-id';
import UpdateBuyableItem from './update-buyable-item';
import GetCategories from './get-categories';
import GetExpoById from './get-expo-by-id';
import GetExpos from './get-expos';
import {
  getBestSellers,
  getMonthDeals,
  getDeals
} from './get-home-products-and-services-grid';
import GetGroupById from './get-group-by-id';

const APISDK = {
  ...CoreAPIs,
  GetNediiPlans: GetNediiPlans,
  UpgradeUserToSeller: UpgradeUserToSeller,
  GetSellerStands: GetSellerStands,
  GetSellerStandsById: GetSellerStandsById,
  GetSellerProducts: GetSellerProducts,
  AddStand: AddStand,
  UpdateStand: UpdateStand,
  DeleteStandById: DeleteStandById,
  AddStandPhone: AddStandPhone,
  AddStandPicture: AddStandPicture,
  DeleteStandPicture: DeleteStandPicture,
  AddBuyableItem: AddBuyableItem,
  GetProductClassificationsByStand: GetProductClassificationsByStand,
  GetProductClassifications: GetProductClassifications,
  DeleteProductById: DeleteProductById,
  UpdateBuyableItem: UpdateBuyableItem,
  GetCategories: GetCategories,
  GetExpos: GetExpos,
  GetExpoById: GetExpoById,
  getBestSellers: getBestSellers,
  getMonthDeals: getMonthDeals,
  getDeals: getDeals,
  GetGroupById: GetGroupById
};

export default APISDK;
