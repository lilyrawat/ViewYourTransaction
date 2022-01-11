import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import "bootstrap/dist/css/bootstrap.min.css"
import authenticate_reducer from './store/reducer/authenticate'
import user_reducer from './store/reducer/user'

//redux things
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";

//initialization of redux for middleware :)
const rootReducer = combineReducers({
  authenticate:authenticate_reducer, //doesnt have to be same name
  user: user_reducer 
})

const store  = createStore(rootReducer,applyMiddleware(ReduxThunk)) 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
