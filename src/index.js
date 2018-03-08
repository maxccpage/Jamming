import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class allTheRoutes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={App} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<allTheRoutes />, document.getElementById('root'));
registerServiceWorker();
