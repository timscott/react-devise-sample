import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {injectGlobal, ThemeProvider as StyledComponentsThemeProvider} from 'styled-components';
import {Route, Switch} from 'react-router-dom';
import {Provider as StoreProvider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {initStore, history, apolloClient, getReactDeviseConfig} from './setup';
import theme from './theme';
import MainLayout from '../layouts/MainLayout';
import Home from '../home/Home';
import Hello from '../hello/Hello';
import NotFound from '../app/NotFound';
import {AuthRoutes, PrivateRoute} from 'react-devise';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    fontFamily: Roboto, sans-serif;
    margin: 0;
  }
`;

const WithMainLayout = ({component: Component, ...more}) => {
  return <Route {...more} render={props => {
    return (
      <MainLayout {...props}>
        <Component {...props} />
      </MainLayout>
    );
  }}/>;
};

const {clientResourceName} = getReactDeviseConfig();

const App = ({store}) => {
  return (
    <StyledComponentsThemeProvider theme={theme}>
      <MuiThemeProvider muiTheme={getMuiTheme(theme)} store={store}>
        <ApolloProvider store={store} client={apolloClient}>
          <StoreProvider store={store}>
            <ConnectedRouter history={history}>
              <Switch>
                <PrivateRoute exact path="/hello" layout={MainLayout} component={Hello} />
                <WithMainLayout exact path="/" component={Home} />
                <AuthRoutes path={`/${clientResourceName}`} wrapper={WithMainLayout} />
                <WithMainLayout component={NotFound} />
              </Switch>
            </ConnectedRouter>
          </StoreProvider>
        </ApolloProvider>
      </MuiThemeProvider>
    </StyledComponentsThemeProvider>
  );
};

// NOTE: Funny things happen if we don't wait for store rehydration before rendering.
class AppProvider extends Component {
  state = {
    rehydrated: false
  };
  componentDidMount() {
    const store = initStore({
      onRehydrationComplete: () => {
        this.setState({
          rehydrated: true
        });
      }
    });
    this.setState({
      store: store
    });
  }
  render() {
    return this.state.rehydrated && <App store={this.state.store} />;
  }
}

export default AppProvider;
