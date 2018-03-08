import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const allTheRoutes = () => {
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} />
      <Route path="/callback" component={App} />
      <Route render={() => 'Not working hoe'} />
    </Switch>
  </BrowserRouter>;
};

ReactDOM.render(<allTheRoutes />, document.getElementById('root'));
registerServiceWorker();
