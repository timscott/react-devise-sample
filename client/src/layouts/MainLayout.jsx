import React, {Component} from 'react';
import {AppBar, Toolbar, ToolbarGroup, Menu, MenuItem, Popover} from 'material-ui';
import {connect} from 'react-redux';
import {logout} from 'react-devise/lib/actions';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';
import LogoIcon from 'material-ui/svg-icons/action/lightbulb-outline';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {Notice} from '../shared';

const MainAppBar = styled(AppBar)`
  &:hover {
    cursor: pointer;
  }
`;

const MainToolbar = styled(Toolbar)`
  background-color: transparent !important;
  margin-top: 4px;
`;

const MainContainer = styled.div`
  padding: 20px;
`;

const Logo = styled(LogoIcon)`
  height: 32px !important;
  width: 32px !important;
  color: ${({theme}) => theme.palette.alternateTextColor} !important;
  padding: 6px !important;
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
    const {currentUser, logout, textColor} = this.props;
    if (currentUser && currentUser.isLoggedIn) {
      return (
        <div>
          <MenuItem
            primaryText={currentUser.displayName || currentUser.email}
            onTouchTap={this.handleTouchTap}
            leftIcon={<DropDownArrow color={textColor}/>}
            style={{color: textColor}}
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem primaryText="Log Out" onTouchTap={logout} />
            </Menu>
          </Popover>
        </div>
      );
    }
    return (
      <MenuItem
        containerElement={<Link to="/users/login"/>}
        primaryText="Log In"
        style={{color: textColor}}
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
          titleStyle={{fontSize: 28, fontWeight: 500}}
          iconElementLeft={<Logo />}
          onTitleTouchTap={this.goHome}
          onLeftIconButtonTouchTap={this.openDrawer}
        >
          <MainToolbar>
            <ToolbarGroup>
              <MenuItem
                containerElement={<Link to="/hello"/>}
                primaryText="Hello"
                style={{color: palette.alternateTextColor}}
              />
              <UserMenuItem
                logout={doLogout}
                currentUser={currentUser}
                textColor={palette.alternateTextColor}
              />
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
