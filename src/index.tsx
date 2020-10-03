import './tools/wdyr';
import 'react-hot-loader';
import 'react-toastify/dist/ReactToastify.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import {
  jssPreset,
  MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'emotion-theming';
import { create } from 'jss';
import jssTemplate from 'jss-plugin-template';
import React, { FC, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { history } from './common/helpers/history';
import { theme } from './common/helpers/theme';
import { Router } from './router';
import store from './store';

const jssInsertionPoint = document.getElementById('jss-insertion-point');

if (jssInsertionPoint === null) {
  throw Error('JSS injection point do not defined in index.html file');
}

const jss = create({
  ...jssPreset(),
  plugins: [jssTemplate(), ...jssPreset().plugins],
  insertionPoint: jssInsertionPoint,
});

const App: FC = hot(() => {
  return (
    <Fragment>
      <CssBaseline />
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <StylesProvider jss={jss}>
            <MuiThemeProvider theme={theme}>
              <ThemeProvider theme={theme}>
                <Router />
                <ToastContainer />
              </ThemeProvider>
            </MuiThemeProvider>
          </StylesProvider>
        </ConnectedRouter>
      </Provider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </Fragment>
  );
});

ReactDOM.render(<App />, document.getElementById('root'));
