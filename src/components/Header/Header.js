/**
 * @author {[Monty Khanna]}
 */
import React, {Component} from 'react';
import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';
import HeaderDropdown from './HeaderDropdown';

class Header extends Component {

  // constructor(props) {
  //   super(props);
  // }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <NavbarBrand href="#"></NavbarBrand>
        <NavbarToggler className="d-md-down-none h-100 b-r-1 px-3" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Nav className="ml-auto" navbar>
          <HeaderDropdown notif/>
          <HeaderDropdown tasks/>
          <HeaderDropdown mssgs/>
          <NavItem className="d-md-down-none">
            <NavLink className="nav-pill" href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          <HeaderDropdown accnt/>
        </Nav>
        <NavbarToggler className="d-md-down-none" onClick={this.asideToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
      </header>
    );
  }
}

export default Header;
