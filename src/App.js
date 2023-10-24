import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Traversing from './pages/Traversing/Traversing';
import { useState } from 'react';
import Levelling from './pages/Levelling/Levelling';


function App() {
  const[showDistanceModal, setShowDistanceModal] = useState(false);
  const[distanceSum, setDistanceSum]=useState('')
  let lengths=[];

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/traversing' element={<Traversing showDistanceModal={showDistanceModal} setShowDistanceModal={setShowDistanceModal}
          lengths={lengths}
        distanceSum={distanceSum}
        setDistanceSum={setDistanceSum}
        />}/>
        <Route path='/levelling' element={<Levelling/>}/>
      </Routes>
    </div>
  );
}

export default App;
