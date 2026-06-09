import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import UsersPage from './pages/Users/UsersPage';
import EditUsersPage from './pages/Users/EditUsersPage';
import Info from './pages/Info/Info';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ResPersonsPage from './pages/Admin/ResPersons/ResPersonsPage';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/admin/resPersons' element={<ResPersonsPage />}/>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/users/edit/:id" element={<EditUsersPage />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
