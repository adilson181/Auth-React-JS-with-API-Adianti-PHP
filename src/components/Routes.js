import React from 'react'

import { Router, Switch, Route } from 'react-router'

import Login from '../pages/login'
import Register from '../pages/register'
import Home from '../pages/home'
import NotFound from './NotFound'
import PrivateRoute from './PrivateRoute'
import registerStepOneSucess from '../pages/info/registerStepOneSuccess'
import registerStepTwoSucess from '../pages/info/registerStepTwoSuccess'

import {history} from '../history'
import ConfirmRegister from '../pages/cofirmRegister'

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route component={Login} exact path="/login"/>
            <Route component={Register} exact path="/register"/>
            <Route component={registerStepOneSucess} exact path="/registredSuccess"/>
            <Route component={registerStepTwoSucess} exact path="/confirmSuccess"/>
            <Route component={ConfirmRegister} exact path="/confirmRegister/:token"/>
            <PrivateRoute component={Home} exact path="/"/>
            <PrivateRoute component={NotFound}/>
        </Switch>
    </Router>
)

export default Routes
