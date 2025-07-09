const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET':
      return action.initialState;
    default:
      return state;
  }
};

export default formReducer;