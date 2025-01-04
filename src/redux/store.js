import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import HomeDetail from '../redux/Home'


const persistConfig = {
    key: 'root',
    version:1,
    storage,
  }
  const reducerData= combineReducers({
    homeDetail:HomeDetail

  });

  const persist = persistReducer(persistConfig,reducerData);



const store = configureStore({
    reducer: persist,
})
export default store;
