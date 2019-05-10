/**
 * @author {[Monty Khanna]}
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import Loading from "./components/Loading";
import { load } from "./redux/modules/auth";

// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './style/scss/style.scss'
// Temp fix for reactstrap
import './style/scss/core/_dropdown-menu-right.scss'

// Direct Routes
const Login = Loadable({
  loader: () => import('./containers/Login'),
  loading: Loading,
});

const Page404 = Loadable({
  loader: () => import('./views/Page404'),
  loading: Loading,
});

const Page500 = Loadable({
  loader: () => import('./views/Page500'),
  loading: Loading,
});

const Full = Loadable({
  loader: () => import('./containers/Full'),
  loading: Loading,
});

class App extends Component {

  componentDidMount = async () => {
    const { dispatch } = this.props;
    await dispatch(load());
  };

  render () {
    const { history, user } = this.props;
    console.log('App user --------- ', user);

    return (
      <ConnectedRouter history={history} >
        <BrowserRouter>
            {
              (user && Object.keys(user).length)
                ? <Switch>
                    <Route path="/" name="Full" component={Full}/>
                  </Switch>
                : <Switch>
                    <Route path="/login" name="Login" component={Login}/>
                    <Route path="/404" name="Page 404" component={Page404}/>
                    <Route path="/500" name="Page 500" component={Page500}/>
                    <Route path="*" component={Login} />
                  </Switch>
            }
        </BrowserRouter>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object
};

export default connect(state => ({
  user: state.get('auth').get('user')
}))(App);
