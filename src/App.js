/**
 * App.js
 * entry point for food-app
 */
import React, { Component } from 'react'
// stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './scss/Main.scss';
//public components
import LandingPage from './components/containers/public/LandingPage'
import Login from './components/authentication/login/index'
import Register from './components/authentication/register/index';
import RegisterVerifyPanel from './components/containers/public/RegisterVerifyPanel';
import RegisterConfirmed from './components/containers/public/RegisterConfirmed';
import PublicRecipeView from './components/containers/public/RecipeView';
// Routes
import ProtectedUserRoute from './routes/ProtectedUserRoute';
import ProtectedAdminRoute from './routes/ProtectedAdminRoute';
// User
import Home from './components/containers/User/module_Home_Page/index';
import Profile from './components/containers/User/module_Profile/index';
import CreateRecipe from './components/containers/User/module_Create/index';
import FullRecipe from './components/containers/User/module_Full_Recipe/index';
import Pantry from './components/containers/User/module_Pantry/index';
import GoPro from './components/containers/User/module_Go_Pro/index'
// Admin
import Dashboard from './components/containers/Admin/module_Admin_Page/index';
import AdminProfile from './components/containers/Admin/module_Profile/index';
import AdminFullView from './components/containers/Admin/FullRecipe/FullRecipe';
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
            <Route path="/public/recipe/view/:id" exact component={PublicRecipeView} />
            {/* User */}
            <ProtectedUserRoute path="/home" exact component={Home} />
            <ProtectedUserRoute path="/profile/:id" exact component={Profile}/>
            <ProtectedUserRoute path="/recipe/create" exact component={CreateRecipe}/>
            <ProtectedUserRoute path="/recipe/view/:id" exact component={FullRecipe}/>
            <ProtectedUserRoute path="/pantry" exact component={Pantry}/>
            <ProtectedUserRoute path="/user/pro" exact component={GoPro}/>

            {/* Admin */}
            <ProtectedAdminRoute path="/admin/home" exact component ={Dashboard} />
            <ProtectedAdminRoute path="/admin/profile/:id" exact component={AdminProfile} />
            <ProtectedAdminRoute path="/recipe/admin/view/:id" exact component={AdminFullView}/>
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
