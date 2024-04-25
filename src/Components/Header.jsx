import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  calculateExpense = () => {
    const { expenses } = this.props;
    const sum = expenses.reduce((acc, cur) => (
      cur.value * cur.exchangeRates[cur.currency].ask + acc
    ), 0);
    return sum.toFixed(2);
  }

  render() {
    const { email } = this.props;
    this.calculateExpense();
    return (
      <div>
        <p>Header</p>
        <span data-testid="email-field">{email}</span>
        <div>
          <span data-testid="total-field">{ this.calculateExpense() }</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
