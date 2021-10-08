// External imports
import React from 'react';
import ReactDOM from 'react-dom';

// Internal imports
import './index.css'
import reportWebVitals from './reportWebVitals';
import AlbumList from "./features/albums/AlbumList";
import {Provider} from "react-redux";
import store from "./store/store"

ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <AlbumList />
      </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
