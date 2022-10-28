import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import eventReducer from './store/reducers/eventReducer';
import eventItemReducer from './store/reducers/eventItemReducer';
import { BrowserRouter } from 'react-router-dom'
import { createHttpLink } from 'apollo-link-http';
// import { ApolloProvider, createNetworkInterface } from 'react-apollo'
// import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider, ApolloClient, gql, InMemoryCache } from '@apollo/client';

// const client = ...


const rootReducer = combineReducers({
  event: eventReducer,
  eventItem: eventItemReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger = store => {
  return next => {
    return action => {
      console.log("[MIDDLEWARE] Dispatching", action);
      const result = next(action);
      console.log("[MIDDLEWARE] next state", store.getState());
      return result;
    };
  };
};

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));
const client = new ApolloClient({
  link: createHttpLink({uri: 'http://localhost:5000//graphql'}),
  cache: new InMemoryCache()
})


const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </Provider>
  );
ReactDOM.render(app, document.getElementById('app'));
