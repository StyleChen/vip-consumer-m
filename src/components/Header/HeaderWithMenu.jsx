import React, { PureComponent } from 'react';
import Header, { headerPropTypes } from './Header';
// import Menu from './Menu';

class HeaderWithMenu extends PureComponent {
  static propTypes = {
    ...headerPropTypes,
  }

  static defaultProps = {
    to: '',
  }

  render() {
    return (
      <Header
        to={this.props.to}
        title={this.props.title}
      >
        {/* <Menu /> */}
      </Header>
    );
  }
}

export default HeaderWithMenu;
