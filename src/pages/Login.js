import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      btnDisable: true,
    };
  }

  onSubmitForm = () => {
    const { userLogin, history } = this.props;
    const { email } = this.state;
    userLogin(email);
    history.push('/carteira');
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  validate= () => {
    const MIN_LENGHT_VALUE = 6;
    const { email, password } = this.state;
    const minLength = password.length >= MIN_LENGHT_VALUE;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailValidator = regexEmail.test(email);

    const isValid = minLength && mailValidator;
    if (isValid) {
      this.setState({ btnDisable: false });
    } else {
      this.setState({ btnDisable: true });
    }
  }

  render() {
    const { email, password, btnDisable } = this.state;
    return (
      <div>
        <fieldset>
          <input
            data-testid="email-input"
            label="Email: "
            type="text"
            onChange={ this.handleChange }
            value={ email }
            name="email"
          />
          <input
            data-testid="password-input"
            label="Senha: "
            type="password"
            onChange={ this.handleChange }
            value={ password }
            name="password"
          />
          <button
            type="button"
            label="Enviar"
            disabled={ btnDisable }
            onClick={ this.onSubmitForm }
          >
            Entrar
          </button>
        </fieldset>
      </div>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (state) => dispatch(getUser(state)),
});

export default connect(null, mapDispatchToProps)(Login);
