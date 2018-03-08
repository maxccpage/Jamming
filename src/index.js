import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const allTheRoutes = () => {
  <BrowserRouter>
    <Switch>
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  </BrowserRouter>;
};

ReactDOM.render(<allTheRoutes />, document.getElementById('root'));
registerServiceWorker();
