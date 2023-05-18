import {NavLink} from 'react-router-dom';

function Landing() {

  return (
    <div>
      <h1 className='landing__title'>Hola mijo</h1>
      <button className='landing__button'>
        <NavLink className='landing__button-link' to='/login'>Login</NavLink>
      </button>
    </div>
  )
}

export default Landing;