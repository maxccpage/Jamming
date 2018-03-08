import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class AllTheRoutes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/" component={App} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<AllTheRoutes />, document.getElementById('root'));
registerServiceWorker();
