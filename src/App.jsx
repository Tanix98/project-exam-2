import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout/index';
import Home from './pages/Home';
import Login from './pages/Login';
import MyBookings from './pages/MyBookings';
import MyVenues from './pages/MyVenues';
import SingleVenue from './pages/SingleVenue';
import Profile from './pages/Profile';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='bookings' element={<MyBookings />} />
                <Route path='venues' element={<MyVenues />} />
                <Route path='venue' element={<SingleVenue />} />
                <Route path='profile' element={<Profile />} />
            </Route>
        </Routes>
    );
}

export default App;
