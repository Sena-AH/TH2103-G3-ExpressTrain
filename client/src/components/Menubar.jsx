import React, { useState } from 'react';
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from 'react-icons/lib';
import { SidebarData } from './SidebarData';


function Menubar() {

  const [sidebar, setSidebar] = useState(false)
  const showSidebar = () => setSidebar(!sidebar)

    return (
      <header className="bg">
        <div className="header-bar">
          <div className="header-logo">
              <Link to="/">
                  <p>Logo</p>
              </Link>
          </div>
          <div className="header-icon">
            <IconContext.Provider value={{ color: '#fff' }}/>
            {/* <Link to="#" className='header-bars'> */}
                <FaIcons.FaBars className="showPointer header-bars" onClick={showSidebar} />
            {/* </Link> */}
          </div>
        </div>
                
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
              <li className="navbar-toggle">
                  {/* <Link to="#" className='menu-bars'> */}
                      <AiIcons.AiOutlineClose className="showPointer menu-bars" />
                  {/* </Link> */}
              </li>
              {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            <span>{item.title}</span>
                        </Link>
                    </li>
                  )
              })}
          </ul>
        </nav>
      </header>
    );
  };

export default Menubar;