import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserInfo } from 'components';
import { fetchUserInfo, changeUserInfo } from 'redux/modules/user-info';

const UserInfoContainer = connect(
  ({ card: { ddid, vipstate }, userInfo }) => ({ ddid, userInfo, vipstate }),
  dispatch => bindActionCreators({ fetchUserInfo, changeUserInfo }, dispatch),
)(UserInfo);

export default UserInfoContainer;
