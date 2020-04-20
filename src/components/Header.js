import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import SlideBox from '../services/SlideBox/SlideBox';

const Header = () => {

  const [show, set] = useState(false)  

  const toggleSlideBox = () => {
    set(!show)
  }

  return (
    <header>
      <div className="main-wrapper">
        <Link to="/" className="home">
          <img src="https://dmvie1.s3.us-east-2.amazonaws.com/profilepic.jpg" alt="DmVie"/>
        </Link>
        <h1>Vie</h1>
        <i className="fas fa-bars" onClick={toggleSlideBox}>X</i>    
 
          <SlideBox  show={show} toggleSlideBox={toggleSlideBox}>
            <nav className="mob-nav">
              <li><NavLink to="/" onClick={toggleSlideBox} activeClassName="is-active-link" exact={true}>Home</NavLink></li>
              <li><NavLink to="/projects" onClick={toggleSlideBox} activeClassName="is-active-link">Projects</NavLink></li>
              <li><NavLink to="/articles" onClick={toggleSlideBox} activeClassName="is-active-link">Articles</NavLink></li>
              <li><NavLink to="/learnings" onClick={toggleSlideBox} activeClassName="is-active-link">Learning</NavLink></li>
              <li><NavLink to="/contact" onClick={toggleSlideBox} activeClassName="is-active-link">Contact</NavLink></li>
            </nav>
          </SlideBox>
           
        
        <nav className="noMob">
          <li><NavLink to="/" activeClassName="is-active-link" exact={true}>Home</NavLink></li>
          <li><NavLink to="/projects" activeClassName="is-active-link">Projects</NavLink></li>
          <li><NavLink to="/articles" activeClassName="is-active-link">Articles</NavLink></li>
          <li><NavLink to="/learnings"  activeClassName="is-active-link">Learning</NavLink></li>
          <li><NavLink to="/contact"  activeClassName="is-active-link">Contact</NavLink></li>
        </nav>
      </div>
    </header>
  )
}
export default Header
