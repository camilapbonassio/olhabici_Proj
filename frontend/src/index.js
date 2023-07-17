import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import perfilReducer from "./slices/perfilSlice";
import ocorrenciaReducer from "./slices/ocorrenciaSlice";
import OccReducer, {allOccFetch /*allCatOccFetch*/} from "./slices/coordSlice"


export const store = configureStore({
    reducer:{
        user: userReducer,
        occ: OccReducer,
        perfilInfo: perfilReducer,
        ocorrenciaInfo: ocorrenciaReducer
    }
})

//when it loads
store.dispatch(allOccFetch())
//store.dispatch(loadUser(null))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <App />
  </Provider>
);

