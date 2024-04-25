// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_CURRENCIES':
    return {
      ...state,
    };
  case 'GET_CURRENCIES':
    return {
      ...state,
      currencies: action.payload,
      exchanges: action.data,
    };
  case 'GET_EXPENSES':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ],
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.payload),
    };
  default:
    return state;
  }
}

export default wallet;
