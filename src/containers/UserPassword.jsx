import { connect } from 'react-redux';
import { UserPassword } from 'components';

const UserPasswordContainer = connect(
  ({ card: { ddid }, userInfo: { phone } }) => ({ ddid, phone }),
)(UserPassword);

export default UserPasswordContainer;
