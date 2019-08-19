﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>Rolodex App React</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
           
            <LinkContainer to={'register'}>
              <NavItem>
            <Glyphicon glyph='plus' /> Register
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/login'}>
              <NavItem>
            <Glyphicon glyph='user' /> Login
              </NavItem>
                    </LinkContainer>
                    <LinkContainer to={'/UserList'}>
                <NavItem>
                    <Glyphicon glyph='th-list' /> User List
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
