import {NavLink} from 'react-router-dom';
import Logo from './Logo';
import video from './../assets/videos/landingVideo.mp4';

function Landing() {

  return (
    <div className='landing__container'>
      <div className='landing__info'>
        <Logo/>
        <button className='landing__button'>
          <NavLink className='landing__button-link' to='/login'>
            Login
          </NavLink>
        </button>
      </div>
      <video className="landing__video" autoPlay loop muted>
        <source src={video} type='video/mp4'/>
      </video>
    </div>
  )
}

export default Landing;