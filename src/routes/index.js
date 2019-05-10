/**
 * @author {[Monty Khanna]}
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../components/Loading';

// Admin Tools Routes
const Dashboard = Loadable({
    loader: () => import('../views/Dashboard'),
    loading: Loading,
});

const UserPermission = Loadable({
    loader: () => import('../views/AdminTools/UserPermission'),
    loading: Loading,
});

const Users = Loadable({
    loader: () => import('../views/AdminTools/Users'),
    loading: Loading,
});

// Clients Routes
const Client = Loadable({
    loader: () => import('../views/Clients/Client'),
    loading: Loading,
});

const ListClients = Loadable({
    loader: () => import('../views/Clients/ListClients'),
    loading: Loading,
});

class MainRoute extends Component {
    render() {
        const { user } = this.props;
        console.log('Routes user ------ ', user);
        return (
          <Switch>
              <Route path="/dashboard" name="Dashboard" component={Dashboard} />

              <Route path="/adminTools/userPermission" name="CmsModules" component={UserPermission}/>
              <Route path="/adminTools/users" name="Users" component={Users}/>

              <Route path="/clients/client" name="Client" component={Client}/>
              <Route path="/clients/listClients" name="ListClients" component={ListClients}/>

              <Redirect from='/' to='/dashboard' />
          </Switch>
        );
    }
}

export default MainRoute;

MainRoute.propTypes = {
    user: PropTypes.object
};
