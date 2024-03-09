// UserContext.js
import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  user: null,
};

const SET_USER = 'SET_USER';
const SIGN_OUT = 'SIGN_OUT';  // New action type for sign out

const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SIGN_OUT:
      return { ...state, user: null };  // Reset user state to null when signing out
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = (user) => {
    dispatch({ type: SET_USER, payload: user });
  };

  const signout = () => {
    dispatch({ type: SIGN_OUT });
    // Add any additional cleanup logic if needed
  };

  return (
    <UserContext.Provider value={{ user: state.user, setUser, signout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
