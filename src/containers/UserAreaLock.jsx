import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserAreaLock } from 'components';
import { changeUserAddr } from 'redux/modules/user-addr';

const UserAreaLockContainer = connect(
  ({ userAddr }) => ({ userAddr }),
  dispatch => bindActionCreators({ changeUserAddr }, dispatch),
)(UserAreaLock);

export default UserAreaLockContainer;
