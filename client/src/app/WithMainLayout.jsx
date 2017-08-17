import React from 'react';
import {Route} from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const WithMainLayout = ({component: Component, ...more}) => {
  return <Route {...more} render={props => {
    return (
      <MainLayout {...props}>
        <Component {...props} />
      </MainLayout>
    );
  }}/>;
};

export default WithMainLayout;
