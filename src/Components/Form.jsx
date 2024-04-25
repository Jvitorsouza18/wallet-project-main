import propTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchAPI, getExpenses } from '../actions';

class Form extends React.Component {
  constructor() {
    super();

    this.state = ({
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      exchangeRates: '',
    });
  }

  componentDidMount() {
    const { getCurrencyList } = this.props;
    getCurrencyList();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleChangeBttnClick = () => {
    const { getMyExpenses, stateExchanges, getCurrencyList } = this.props;
    getCurrencyList();
    let { id } = this.state;
    this.setState({
      exchangeRates: stateExchanges,
    }, () => {
      getMyExpenses(this.state);
      this.setState({ id: id += 1, value: 0 });
    });
  }

  render() {
    const { description, value, currency, tag, method } = this.state;
    const { stateCurrencyList } = this.props;
    return (
      <div>
        <fieldset>
          <label
            htmlFor="value"
          >
            Valor
            <input
              data-testid="value-input"
              id="value"
              label="Valor: "
              type="text"
              onChange={ this.handleChange }
              value={ value }
              name="value"
            />
          </label>
          <label
            htmlFor="description"
          >
            Descrição
            <input
              data-testid="description-input"
              id="description"
              label="Descrição: "
              type="text"
              onChange={ this.handleChange }
              value={ description }
              name="description"
            />
          </label>
          <label
            htmlFor="currency-input"
          >
            Moeda:
            <select
              id="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              <option hidden>Moeda...</option>
              { stateCurrencyList?.map((selCurrency, i) => (
                <option key={ i } value={ selCurrency }>{ selCurrency }</option>
              ))}
            </select>
          </label>
          <label
            htmlFor="tag"
            name="method"
          >
            Método de Pagamento
            <select
              data-testid="method-input"
              id="method"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option hidden>Método...</option>
              <option value="Dinheiro"> Dinheiro </option>
              <option value="Cartão de crédito"> Cartão de crédito </option>
              <option value="Cartão de débito"> Cartão de débito </option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option hidden>Categoria...</option>
              <option value="Alimentação"> Alimentação </option>
              <option value="Lazer"> Lazer </option>
              <option value="Trabalho"> Trabalho </option>
              <option value="Transporte"> Transporte </option>
              <option value="Saúde"> Saúde </option>
            </select>
          </label>
          <button
            type="button"
            onClick={ () => this.handleChangeBttnClick(this.state) }
          >
            Adicionar despesa
          </button>
        </fieldset>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateCurrencyList: state.wallet.currencies,
  stateExchanges: state.wallet.exchanges,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencyList: () => dispatch(fetchAPI()),
  getMyExpenses: (payload) => dispatch(getExpenses(payload)),
});

Form.propTypes = {
  stateExchanges: propTypes.element.isRequired,
  getCurrencyList: propTypes.func.isRequired,
  getMyExpenses: propTypes.func.isRequired,
  stateCurrencyList: propTypes.arrayOf(
    propTypes.string.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
