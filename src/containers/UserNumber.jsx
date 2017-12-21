import { connect } from 'react-redux';
import { UserNumber } from 'components';

const UserNumberContainer = connect(
  ({ card: { ddid } }) => ({ ddid }),
)(UserNumber);

export default UserNumberContainer;
