import { connect } from 'react-redux';
import { Scan } from 'components';

const ScanContainer = connect(
  ({ card: { number, company, logo } }) => ({ number, company, logo }),
)(Scan);

export default ScanContainer;
