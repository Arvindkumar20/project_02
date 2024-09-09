import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './Mainheader';
import Navink from './Navink';
import SideDrawer from './SideDrawer';
import Backdrop from '../UiEement/Backdrop';

import './mainNavigation.css';


const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <Navink />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <Navink />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
