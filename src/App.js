import React, { Component } from 'react'
import './App.css'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LandingPage from 'pages/Landing'
import NotFoundPage from 'pages/404'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/:id" component={LandingPage} />
          <Route path="/" component={NotFoundPage} />
        </Switch>
      </Router>
    )
  }
}
