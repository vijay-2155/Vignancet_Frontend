// App.js
import Background from './Components/Background';
import AdminDashBoard from './Components/AdminDashBoard';
import Login from './Components/Login';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Instructions from './Components/Instructions';
import AddQuestion from './Components/AddQuestion';
import Paper from './Components/Paper';
import Standings from './Components/Standings';
function App() {
  return (
    <>
      <BrowserRouter>
        <Background />
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/InstructionsScreen' element={<Instructions/>}/>
          <Route path='/AdminDashboard' element={<AdminDashBoard/>}/>
          <Route path='/addQuestion' element={<AddQuestion/>}/>
          <Route path='/setPaper' element={<Paper/>}/>
          <Route path='/getStats' element={<Standings/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;