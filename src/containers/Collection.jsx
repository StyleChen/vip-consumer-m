import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Collection } from 'components';
import { fetchCollection } from 'redux/modules/collection';


const CollectionContainer = connect(
  ({
    global: { fetching },
    collection: { data },
  }) => ({ fetching, data }),
  dispatch => bindActionCreators({ fetchCollection }, dispatch),
)(Collection);

export default CollectionContainer;
