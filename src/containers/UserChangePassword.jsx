import { connect } from 'react-redux';
import { UserChangePassword } from 'components';


const UserChangePasswordContainer = connect(
  ({ card: { ddid } }) => ({ ddid }),
)(UserChangePassword);

export default UserChangePasswordContainer;
