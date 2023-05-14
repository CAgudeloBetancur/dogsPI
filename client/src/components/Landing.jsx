import {NavLink} from 'react-router-dom';

function Landing() {

  return (
    <div>
      <h1>Hola mijo</h1>
      <button>
        <NavLink to='/login'>Login</NavLink>
      </button>
    </div>
  )
}

export default Landing;