import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserAddrArea } from 'components';
import { changeUserAddr } from 'redux/modules/user-addr';

const UserAddrAreaContainer = connect(
  ({ userAddr: { id } }) => ({ id }),
  dispatch => bindActionCreators({ changeUserAddr }, dispatch),
)(UserAddrArea);

export default UserAddrAreaContainer;
