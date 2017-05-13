import React from 'react';
import {connect} from 'react-redux';
import {withAuth} from 'react-devise';
import {ViewHeading} from '../shared';

const Home = ({currentUser, auth: {AuthLinks}}) => {
  return (
    <div>
      <ViewHeading>Welcome to React Devise Sample!</ViewHeading>
      <AuthLinks />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(withAuth(Home));
