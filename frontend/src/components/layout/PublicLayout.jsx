import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PublicLayout = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Navbar />
    <main style={{ flex: 1, paddingTop: '70px' }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default PublicLayout;
