import './rightbar.css'
import pic from './pic.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'


export default function Rightbar() {
  return (
    <div className='rightbar'>
      <div className="rightbar">
        <div className="rightbarItem">
          <span className="rightbarTitle">About Me</span>
          <img src={pic} alt="pic" className='profilePic'/>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste ducimus fuga dolores, rerum quo corporis officiis eius, ipsum voluptate maxime cum tenetur praesentium incidunt nisi repellendus commodi ea amet magni!</p>
        </div>
        <div className="rightbarItem">
          <span className="righbarTitle">topBlogs</span>
          <ul className="rightbarList">
            <li className="rightbarListItem">Blog1</li>
            <li className="rightbarListItem">Blog2</li>
          </ul>
        </div>
        <FontAwesomeIcon icon={faInstagram} className="instagramIcon" />
      </div>
    </div>
  )
}
