import React from 'react';
import {connect} from 'react-redux';
import {withAuth} from 'react-devise';

const Home = ({currentUser, auth: {AuthLinks}}) => {
  return (
    <div>
      <div>
        <h2>Welcome to React Devise Sample!</h2>
        <AuthLinks />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(withAuth(Home));
