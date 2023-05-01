import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout/index';
import Home from './pages/Home';
import Login from './pages/Login';
import SingleVenue from './pages/SingleVenue';
import Profile from './pages/Profile';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='venue' element={<SingleVenue />} />
                <Route path='profile' element={<Profile />} />
            </Route>
        </Routes>
    );
}

export default App;
