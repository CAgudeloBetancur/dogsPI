import {Routes, Route} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import Home from './components/Home';
import CreateDog from './components/CreateDog';
import Detail from './components/Detail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/create' element={<CreateDog/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
      </Routes>
    </div>
  );
}

export default App;
