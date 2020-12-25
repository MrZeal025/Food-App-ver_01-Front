/**
 * App.js
 * entry point for food-app
 */
import React, { Component } from 'react'
//stylesheets
import './scss/Main.scss';
//public components
import LandingPage from './components/containers/public/LandingPage'
import Login from './components/authentication/login/index'
import Register from './components/authentication/register/index';
import RegisterVerifyPanel from './components/containers/public/RegisterVerifyPanel';
import RegisterConfirmed from './components/containers/public/RegisterConfirmed';
// Routes
import ProtectedUserRoute from './routes/ProtectedUserRoute';
// User
import Home from './components/containers/User/module_Home_Page/index';
import Profile from './components/containers/User/module_Profile/index';
//router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// redux
import store from "./redux/Store/store";
import { Provider } from "react-redux";
// utilities
import dotenv from 'dotenv';
dotenv.config();

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            {/* Public */}
            <Route path="/" exact component={LandingPage}/>
            <Route path="/sign-in" exact component={Login}/>
            <Route path="/sign-up" exact component={Register}/> 
            <Route path="/verify/u/:id/e/action" exact component={RegisterVerifyPanel}/>
            <Route path="/register/:id/s/confirmed" exact component={RegisterConfirmed}/>

            {/* User */}
            <ProtectedUserRoute path="/home" exact component={Home} />
            <ProtectedUserRoute path="/profile/:id" exact component={Profile}/>
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
