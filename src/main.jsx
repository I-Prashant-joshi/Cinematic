import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/index.jsx';
import {Provider} from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store.js';
import axios from 'axios';
import { React_Movie } from './Component/constants.js';
const persistor=persistStore(store);
axios.defaults.baseURL="https://api.themoviedb.org/3"
axios.defaults.headers.common['Authorization']=`bearer ${React_Movie}`
createRoot(document.getElementById("root")).render(
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    </PersistGate>
    </Provider>
);
