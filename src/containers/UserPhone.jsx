import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserPhone } from 'components';
import { changeUserInfo } from 'redux/modules/user-info';

const UserPhoneContainer = connect(
  ({ card: { ddid }, userInfo: { phone } }) => ({ ddid, phone }),
  dispatch => bindActionCreators({ changeUserInfo }, dispatch),
)(UserPhone);

export default UserPhoneContainer;
