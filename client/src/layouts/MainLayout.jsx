import React, {Component} from 'react';
import {AppBar, Toolbar, ToolbarGroup, Menu, MenuItem, Popover, IconButton} from 'material-ui';
import {connect} from 'react-redux';
import {logout} from 'react-devise/lib/actions';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';
import HamburgerMenu from 'material-ui/svg-icons/navigation/menu';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {Notice} from '../shared';

const MainAppBar = styled(AppBar)`
  background-color: #fff !important;
  &:hover {
    cursor: pointer;
  }
`;

const MainToolbar = styled(Toolbar)`
  background-color: transparent !important;
`;

const MainContainer = styled.div`
  padding: 20px;
`;

class UserMenuItem extends Component {
  state = {
    open: false
  }
  handleTouchTap = event => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }
  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };
  render() {
    const {currentUser, logout} = this.props;
    if (currentUser && currentUser.isLoggedIn) {
      return (
        <div>
          <MenuItem
            primaryText={currentUser.displayName || currentUser.email}
            onTouchTap={this.handleTouchTap}
            leftIcon={<DropDownArrow />}
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem primaryText="Log Out" onTouchTap={logout}/>
            </Menu>
          </Popover>
        </div>
      );
    }
    return (
      <MenuItem
        containerElement={<Link to="/users/login"/>}
        primaryText="Log In"
      />
    );
  }
}

class MainLayout extends Component {
  state = {
    drawerOpen: false
  }
  setDrawer = open => {
    this.setState({
      drawerOpen: open
    });
  }
  goHome = () => {
    this.props.history.push('/');
  };
  render() {
    const {currentUser, doLogout, children, location: {state: {notice} = {}}, muiTheme: {palette}} = this.props;
    return (
      <div>
        <MainAppBar
          title="React Devise Sample"
          titleStyle={{color: palette.textColor, fontSize: 28, fontWeight: 600}}
          iconElementLeft={<IconButton><HamburgerMenu color={palette.textColor} /></IconButton>}
          onTitleTouchTap={this.goHome}
          onLeftIconButtonTouchTap={this.openDrawer}
        >
          <MainToolbar>
            <ToolbarGroup>
              <MenuItem
                containerElement={<Link to="/hello"/>}
                primaryText="Hello"
              />
              <UserMenuItem logout={doLogout} currentUser={currentUser} />
            </ToolbarGroup>
          </MainToolbar>
        </MainAppBar>
        <MainContainer>
          {notice && <Notice>{notice}</Notice>}
          {children}
        </MainContainer>
      </div>
    );
  }
}

MainLayout = muiThemeable()(MainLayout);

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doLogout: () => logout(dispatch)
  };
};

const MainLayoutContainer = connect(mapStateToProps, mapDispatchToProps)(MainLayout);

export default MainLayoutContainer;
