import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from '../config';
import {createAction} from '../utils/createAction';
import {sleep} from '../utils/sleep';

export function useAuth() {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            loading: false,
            user: {...action.payload},
          };
        case 'REMOVE_USER':
          return {
            ...state,
            user: undefined,
          };
        case 'SET_LOADING':
          return {
            ...state,
            loading: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
    },
  );
  const auth = React.useMemo(
    () => ({
      login: async (email, password) => {
        const {data} = await axios.post(`${BASE_URL}/login`, {
          email: email,
          password: password,
        });
        const user = {
          email: data.email,
        };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        dispatch(createAction('SET_USER', user));
      },
      logout: async () => {
        console.log(AsyncStorage.getItem("user"))
        AsyncStorage.getItem('user').then(user => {
        });
        await AsyncStorage.removeItem('user');
        dispatch(createAction('REMOVE_USER'));
      },
      register: async (firstname, lastname, phone, email, password) => {
        await sleep(2000);
        await axios.post(`${BASE_URL}/register`, {
          firstname: firstname,
          lastname,
          phone,
          email,
          password,
        });
      },
    }),
    [],
  );
  React.useEffect(() => {
    sleep(2000).then(() => {
      AsyncStorage.getItem('user').then(user => {
        if (user) {
          dispatch(createAction('SET_USER', user));
        } else {
          dispatch(createAction('SET_LOADING', false));
        }
      });
    });
  }, []);
  return {auth, state};
}
