import { Outlet } from 'react-router-dom';
import Header from '../Header/index';
import Footer from '../Footer/index';

function Layout() {
    return (
        <div className='bg-light'>
            <Header />
            <main className='pt-4'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
