import { useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../contexts/AuthContext';


const initialState = {
  isAuthenticated: false,
  user: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
}
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const value = useMemo(() => ({ ...state, dispatch }), [state, dispatch]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};