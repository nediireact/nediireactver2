import Login from 'src/api/api-sdk/login';
import UpdateUser from 'src/api/api-sdk/update-user';
import UpdateUserProfile from 'src/api/api-sdk/update-user-profile';
import GetNediiPlans from 'src/api/api-sdk/get-nedii-plans';
import UpgradeUserToSeller from 'src/api/api-sdk/upgrade-user-to-seller';
import GetUserAddress from 'src/api/api-sdk/get-user-address';
import AddUserAddress from 'src/api/api-sdk/add-user-address';
import UpdateUserAddress from 'src/api/api-sdk/update-user-address';
import DeleteUserAddress from 'src/api/api-sdk/delete-user-address';
import GetUserStands from 'src/api/api-sdk/get-user-stands';

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
  GetUserStands: GetUserStands
};

export default APISDK;
