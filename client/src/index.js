import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from "react-router-dom";

// Styles
import './styles/index.css';

// Routes
import Landing from './pages/Landing';
import Home from './pages/Home';
import NewBreed from './pages/NewBreed';
import BreedDetail from './pages/BreedDetail';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/breeds" component={Home} />
          <Route exact path="/breeds/new" component={NewBreed} />
          <Route exact path="/breeds/:id" component={BreedDetail} />
        </Switch>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
