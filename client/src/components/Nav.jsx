import {ImMenu} from 'react-icons/im';
import {IoClose} from 'react-icons/io5';
import {RiLogoutCircleRLine} from 'react-icons/ri';
import {FaUserCircle} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink, useLocation} from 'react-router-dom';
import { setShowFilter,setShowMenu } from '../redux/actions';
import Logo from './Logo';

const ButtonsNav = ({logout}) => {

  const {userName} = useSelector(state => state);

  return (
    <>
      <NavLink className='nav__button nav__buttonHome' to="/home">Home</NavLink>
      <div className='nav__userInfo'>
        <div>
          <i><FaUserCircle /></i>
          <span>{userName}</span>
        </div>
        <button className='nav__logoutButton' onClick={logout}>
          <RiLogoutCircleRLine />
        </button>
      </div>
    </>
  )
}

function Nav({logout}) {

  const dispatch = useDispatch();

  const location = useLocation().pathname;

  const {showFilter} = useSelector(state => state);
  const {showMenu} = useSelector(state => state);

  const handleLogout = () => {
    logout();
  }

  const handleShowFilter = () => {
    dispatch(setShowFilter(!showFilter));
    dispatch(setShowMenu(false));
  }

  const handleShowMenu = () => {
    dispatch(setShowMenu(!showMenu));
    dispatch(setShowFilter(false));
  }

  return (
    <nav className='nav'>
      <div className='nav__mainContainer'>
        <div className='logo'>
          <Logo/>
        </div>
        <div className={`nav__container`}>
          <ButtonsNav logout={handleLogout}/>
        </div>
        <div className='nav__filtersMenuButtonContainer'>
          {
            location === '/home' && 
              <button 
                className='nav__showFilterBtn' 
                onClick={handleShowFilter}
              >
                Filters
              </button>
          }
          <button 
            className='nav__showMenu'
            onClick={handleShowMenu}
          >
            {!showMenu ? <ImMenu /> : <IoClose /> }
          </button>
        </div>
      </div>
      <div className={`nav__mobileContainer${showMenu ? ' showMenu' : ''}`}>
        <ButtonsNav logout={handleLogout}/>
      </div>
    </nav>
  )
}

export default Nav;