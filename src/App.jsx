// App.js
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Background from './Components/Background';
import AdminDashBoard from './Components/AdminDashBoard';
import Login from './Components/Login';
import Instructions from './Components/Instructions';
import AddQuestion from './Components/AddQuestion';
import Paper from './Components/Paper';
import Standings from './Components/Standings';
function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background /> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/adminDashboard" element={<AdminDashBoard />} />
          <Route path="/Instructions" element={<Instructions />} />
          <Route path='/addQuestion' element={<AddQuestion />} />
          <Route path='/setPaper' element={<Paper />} />
          <Route path='/getStats' element={<Standings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;