import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './redux/reducers/reducers';
import { Redirect, Route } from 'react-router-dom';

import GlobalNavbar from './components/GlobalComponents/global-navbar';
import MainView from './components/LandingPages/main-view/main-view';
import Container from 'react-bootstrap/Container';
import Footer from './components/GlobalComponents/footer';

import './App.css';

const store = createStore(moviesApp);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <GlobalNavbar />
          <Route exact path="/" render={() => <Redirect to="/myFlixApp" />} />
          <MainView />
          <Footer />
        </Container>
      </Provider>
    );
  }
}

export default App;
