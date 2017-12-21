import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import JsBarcode from 'jsbarcode';
import { HeaderWithMenu } from 'components';
import style from './scan.css';

class Scan extends PureComponent {
  static propTypes = {
    number: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }

  generateBarcode = (svg) => {
    if (svg) {
      JsBarcode(svg).init();
    }
  }

  render() {
    const { number, company, logo } = this.props;

    return (
      <div>
        <HeaderWithMenu title={company} />

        <section className={style.wrapper}>
          <img className={style.logo} src={logo} alt={company} />
          <div className={style.number}>{number}</div>
          <svg
            ref={this.generateBarcode}
            className={style.barcode}
            data-height="80"
            data-format="CODE128"
            data-value={number}
            data-displayvalue="false"
            data-margin="0"
          />
          <br />
          {/* <img className={style.QRcode} src="#" alt="支付二维码" /> */}
        </section>
      </div>
    );
  }
}

export default Scan;
