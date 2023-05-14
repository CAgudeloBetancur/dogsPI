import {Routes, Route, useNavigate} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import Home from './components/Home';
import CreateDog from './components/CreateDog';
import Detail from './components/Detail';
import Signup from './components/Signup';
import { useEffect, useState } from 'react';

function App() {

  const navigate = useNavigate();

  const [access, setAccess] = useState(false);

  useEffect(()=>{
    console.log(access);
    !access && navigate('/');
  },[access])

  const logout = () => {
    setAccess(false);
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login setAccess={setAccess}/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home logout={logout}/>}/>
        <Route path='/create' element={<CreateDog/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;
