import {NavLink} from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <button>
        <NavLink to="/home">Home</NavLink>
      </button>
    </nav>
  )
}

export default Nav;