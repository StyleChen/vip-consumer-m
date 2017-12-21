import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserAddrDetail } from 'components';
import { changeUserAddr } from 'redux/modules/user-addr';

const UserAddrDetailContainer = connect(
  ({ userAddr }) => ({ userAddr }),
  dispatch => bindActionCreators({ changeUserAddr }, dispatch),
)(UserAddrDetail);

export default UserAddrDetailContainer;
