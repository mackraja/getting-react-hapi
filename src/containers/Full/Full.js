/**
 * @author {[Monty Khanna]}
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import MainRoute from '../../routes/index';

class Full extends Component {
    componentDidMount() {
        const { user } = this.props;
        console.log('Full user ------------------- ', user);
    }

    render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
                <MainRoute {...this.props}/>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

Full.propTypes = {
    user: PropTypes.object,
};

Full.defaultProps = {
    user: {}
};

export default connect(state => ({
    user: state.get('auth').get('user'),
}))(Full);
