// Coloque aqui suas actions
const GET_USER = 'GET_USER';
const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
const GET_CURRENCIES = 'GET_CURRENCIES';
const GET_EXPENSES = 'GET_EXPENSES';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const getUser = (payload) => ({ type: GET_USER, payload });
export const requestCurrencies = () => ({ type: REQUEST_CURRENCIES });
export const getCurrencies = (data, payload) => ({ type: GET_CURRENCIES, data, payload });
export const getExpenses = (payload) => ({ type: GET_EXPENSES, payload });

export function fetchAPI() {
  return async (dispatch) => {
    try {
      dispatch(requestCurrencies());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      delete data.USDT;
      const currencyList = Object.keys(data);
      dispatch(getCurrencies(data, currencyList));
    } catch (error) {
      console.log(error);
    }
  };
}

export const removeTable = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});
