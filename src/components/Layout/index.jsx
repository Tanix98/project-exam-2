import { Outlet } from 'react-router-dom';
import Header from '../Header/index';
import Footer from '../Footer/index';

function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;
