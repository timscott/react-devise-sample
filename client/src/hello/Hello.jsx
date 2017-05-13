import React from 'react';
import {ViewHeading} from '../shared';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import muiThemeable from 'material-ui/styles/muiThemeable';

const HelloQuery = gql`{hello}`;

const Hello = ({data: {loading, hello}}) => {
  return (
    <div>
      <div>
        <ViewHeading>Hello</ViewHeading>
        <p>{hello}</p>
      </div>
    </div>
  );
};

export default graphql(HelloQuery)(muiThemeable()(Hello));

