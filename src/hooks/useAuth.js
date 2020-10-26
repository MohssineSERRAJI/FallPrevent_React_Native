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
            loadingNotis: false,
            user: {...action.payload},
          };
        case 'SET_NOTIFICATIONS':
        return {
          ...state,
          loadingNotis: true,
          notifications: {...action.payload},
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
          name : data.name,
        };
        const notifications = {
          list : data.notifications
        }
        dispatch(createAction('SET_NOTIFICATIONS', notifications));
        await AsyncStorage.setItem('user', JSON.stringify(user));
        dispatch(createAction('SET_USER', user));
      },
      logout: async () => {
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
      notifications: async (email) => {
         // on considere que email est le token
        const {data} = await axios.post(`${BASE_URL}/notifications`, {
          email,
        });
        const ndata = {
          list: data.notifications,
        };
        console.log(email);
        dispatch(createAction('SET_NOTIFICATIONS', ndata));
      },
    }),
    [],
  );
  React.useEffect(() => {
    sleep(100).then(() => {
      try {
        AsyncStorage.getItem('user').then((user) => {
            let resUser = JSON.parse(user)
            if (resUser) {
              dispatch(createAction('SET_USER', resUser));
            } else {
              dispatch(createAction('SET_LOADING', false)); 
            }
            console.log("done") 
        });
        
    } catch (error) {
    }
    });
  }, []);
  return {auth, state};
}
