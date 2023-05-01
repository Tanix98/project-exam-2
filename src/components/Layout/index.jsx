import { Outlet } from 'react-router-dom';
import Header from '../Header/index';
import Footer from '../Footer/index';

function Layout() {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
