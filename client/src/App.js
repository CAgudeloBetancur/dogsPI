import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import Home from './components/Home';
import CreateDog from './components/CreateDog';
import Detail from './components/Detail';
import Signup from './components/Signup';
import Nav from './components/Nav';
import UpdateDog from './components/UpdateDog';
import { useEffect, useState } from 'react';
import { setUserId } from './redux/actions';

function App() {

  const location = useLocation();

  const navigate = useNavigate();

  const [access, setAccess] = useState(false);

  useEffect(()=>{
    !access && navigate('/');
  },[access])

  const logout = () => {
    setAccess(false);
    setUserId('');
  }

  return (
    <div className="App">
      <div>
        {
          (location.pathname !== '/' && 
          location.pathname !== '/login' && 
          location.pathname !== '/signup') 
              &&
            <Nav logout={logout}/>}
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/login' element={<Login setAccess={setAccess}/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/create' element={<CreateDog/>}/>                
          <Route path='/update/:id' element={<UpdateDog/>}/>                
          <Route path='/detail/:id' element={<Detail/>}/>
        </Routes>
      </div>
      <footer className='footer'>
        <p>Desarrollado por Camilo Agudelo Beteancur - 2023</p>
      </footer>
    </div>
  );
}

export default App;
