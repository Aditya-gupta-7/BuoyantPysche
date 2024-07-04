import React from 'react'
import './topbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Topbar() {
  return (
    <div className='top'>
      <div className="topLeft">
        <FontAwesomeIcon icon={faInstagram} className="instagramIcon" /> 
      </div>
      <div className="topCenter">
        <ul className="topList">
            <li className="topListItem">Home</li>
            <li className="topListItem">About</li>
            <li className="topListItem">Contact</li>
            <li className="topListItem">Write</li>
            <li className="topListItem">Logout</li>
        </ul>
      </div>
      <div className="topRight">
        <FontAwesomeIcon icon={faUser} className="userIcon" /> {/* Add class name here */}
        <FontAwesomeIcon icon={faSearch} className="searchIcon" /> {/* Add class name here */}
      </div>
    </div>
  )
}