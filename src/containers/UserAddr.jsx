import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserAddr } from 'components';
import * as actions from 'redux/modules/user-addrs';
import { changeUserAddr, resetUserAddr } from 'redux/modules/user-addr';

const UserAddrContainer = connect(
  ({ userAddrs }) => ({ userAddrs }),
    dispatch => bindActionCreators({ ...actions, changeUserAddr, resetUserAddr }, dispatch),
)(UserAddr);

export default UserAddrContainer;
