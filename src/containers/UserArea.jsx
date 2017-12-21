import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserArea } from 'components';
import { changeUserInfo } from 'redux/modules/user-info';

const UserAreaContainer = connect(
  ({
    card: { ddid },
    userInfo: { address, area },
  }) => ({
    ddid,
    currentArea: `${address} ${area}`,
  }),
  dispatch => bindActionCreators({ changeUserInfo }, dispatch),
)(UserArea);

export default UserAreaContainer;
