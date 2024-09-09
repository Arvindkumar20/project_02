import { Link } from 'react-router-dom';
import MainHeader from './Mainheader';
import './mainNavigation.css';
import Navink from './Navink';
import SideDrawer from './SideDrawer';
import { useState } from 'react';
import Backdrop from '../UiEement/Backdrop';
const MainNavigation =() => {
  const [openSideDrawer,closeSideDrawer]=useState(false);
  const openDrawer=()=>{
    closeSideDrawer(true);
  }
  const closeDrawer=()=>{
    closeSideDrawer(false);
  }
  return (
    <>
    {openDrawer && <Backdrop onClick={closeDrawer}></Backdrop>}
   {openSideDrawer && <SideDrawer onClick={closeDrawer}>
      <nav className="main-navigation__drawer-nav">
      <Navink/>
      </nav>
    </SideDrawer>
    }
    <MainHeader>
      <button className="main-navigation__menu-btn"
      onClick={openDrawer}
      >
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title">
        <Link to="/">YourPlaces</Link>
      </h1>
      <nav className='main-navigation__header-nav '>
        <Navink/>
      </nav>
    </MainHeader>
    </> 
  );
};
export default MainNavigation;