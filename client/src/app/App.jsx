import React from 'react';
import {ApolloProvider} from 'react-apollo';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {ThemeProvider as StyledComponentsThemeProvider} from 'styled-components';
import {Provider as StoreProvider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {history, apolloClient} from './setup';
import theme from './theme';
import Routes from './Routes';

const App = ({store}) => {
  return (
    <StyledComponentsThemeProvider theme={theme}>
      <MuiThemeProvider muiTheme={getMuiTheme(theme)} store={store}>
        <ApolloProvider store={store} client={apolloClient}>
          <StoreProvider store={store}>
            <ConnectedRouter history={history}>
              <Routes />
            </ConnectedRouter>
          </StoreProvider>
        </ApolloProvider>
      </MuiThemeProvider>
    </StyledComponentsThemeProvider>
  );
};

export default App;
