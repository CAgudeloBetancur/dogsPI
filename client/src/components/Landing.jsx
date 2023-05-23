import {NavLink} from 'react-router-dom';
import Logo from './Logo';
import {GiBalloonDog,GiJumpingDog} from 'react-icons/gi';
import video from './../assets/videos/landingVideo.mp4';

function Landing() {

  return (
    <div className='landing__container'>
      {/* <i className='landing__iconBalloon'><GiBalloonDog /></i> */}
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
     {/*  <i className='landing__iconJumping'><GiJumpingDog /></i> */}
    </div>
  )
}

export default Landing;