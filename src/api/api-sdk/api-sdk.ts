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
import AddStand from './add-stand';
import AddStandPhone from './add-stand-phone';
import UpdateStand from './update-stand';

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
  AddStand: AddStand,
  UpdateStand: UpdateStand,
  AddStandPhone: AddStandPhone
};

export default APISDK;
